"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  Map,
  MapControls,
  type MapViewport,
  type MapRef,
} from "@/components/ui/map";
import { Card } from "@/components/ui/card";
import { MapViewportInfo } from "./map-viewport-info";
import { MapStyleSelector } from "./map-style-selector";
import { MAP_STYLES, type MapStyleKey } from "@/lib/constants/map";
import type { ZoneData } from "@/types/api/map";
import { MapToolbar } from "./map-toolbar";
import { MapDrawingLayer } from "./map-drawing-layer";
import { ZonePropertiesPanel } from "./zone-properties-panel";
import type { ZoneFormData } from "@/lib/validations/forms/map";
import { useGetAllZones } from "@/lib/hooks/queries/use-zones-queries";
import {
  useMutateZone,
  useDeleteZone,
  transformZoneApiResponseToZoneData,
} from "@/lib/hooks/mutations/use-zones-mutations";

export function MapZones() {
  const mapRef = useRef<MapRef>(null);

  const initialViewport: MapViewport = {
    center: [-1.755722, 4.909667],
    zoom: 17.5,
    bearing: 0,
    pitch: 0,
  };

  const [viewport, setViewport] = useState<MapViewport>(initialViewport);
  const [style, setStyle] = useState<MapStyleKey>("osm_bright");
  const selectedStyle = MAP_STYLES[style];
  const is3D = style === "osm_liberty";

  // API hooks
  const { data: zonesData } = useGetAllZones();
  const mutateZone = useMutateZone();
  const deleteZone = useDeleteZone();

  // Transform API zones to ZoneData format
  const zones: ZoneData[] = useMemo(() => {
    if (!zonesData) return [];
    return zonesData.map(transformZoneApiResponseToZoneData);
  }, [zonesData]);

  const [isDrawActive, setIsDrawActive] = useState(false);
  const [showBoundaries, setShowBoundaries] = useState(true);

  // Dialog/Panel state
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingZone, setEditingZone] = useState<ZoneData | null>(null);
  const [pendingCoordinates, setPendingCoordinates] = useState<
    [number, number][] | null
  >(null);
  const [previewZoneParams, setPreviewZoneParams] =
    useState<ZoneFormData | null>(null);

  // Memoize the initialData passed to ZonePropertiesPanel.
  // Without this, a new object is created inline on every render, causing
  // ZonePropertiesPanel's useEffect([initialData]) to fire → form.reset()
  // → watch callback → setPreviewZoneParams → re-render → new object → loop.
  const panelInitialData = useMemo(() => {
    if (editingZone) {
      return {
        id: editingZone.id,
        name: editingZone.name,
        color: editingZone.color,
        transparency: editingZone.transparency,
        borderWidth: editingZone.borderWidth,
        description: editingZone.description,
        coordinates: editingZone.coordinates,
      };
    }
    if (pendingCoordinates) {
      return {
        name: "",
        color: "#60a5fa",
        transparency: 0.5,
        borderWidth: 2,
        description: "",
        coordinates: pendingCoordinates,
      };
    }
    return undefined;
  }, [editingZone, pendingCoordinates]);

  // Memoized zones list including preview/editing state
  const zonesWithPreview = useMemo(() => {
    // If editing, merge the preview params into the existing zone
    if (editingZone && previewZoneParams) {
      return zones.map((z) =>
        z.id === editingZone.id
          ? {
              ...z,
              name: previewZoneParams.name,
              color: previewZoneParams.color,
              transparency: previewZoneParams.transparency,
              borderWidth: previewZoneParams.borderWidth,
              description: previewZoneParams.description,
              coordinates: editingZone.coordinates,
            }
          : z
      );
    }

    // If creating, add a temporary zone
    if (pendingCoordinates) {
      const newZone: ZoneData = {
        id: "temp-new-zone",
        name: previewZoneParams?.name || "",
        color: previewZoneParams?.color || "#60a5fa",
        transparency: previewZoneParams?.transparency ?? 0.5,
        borderWidth: previewZoneParams?.borderWidth ?? 2,
        description: previewZoneParams?.description,
        coordinates: pendingCoordinates,
      };
      return [...zones, newZone];
    }

    return zones;
  }, [zones, editingZone, pendingCoordinates, previewZoneParams]);

  // Fly map to a set of polygon coordinates
  const flyToCoordinates = useCallback((coordinates: [number, number][]) => {
    if (!mapRef.current || coordinates.length === 0) return;
    const lngs = coordinates.map(([lng]) => lng);
    const lats = coordinates.map(([, lat]) => lat);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    mapRef.current.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 80, duration: 800, maxZoom: 20 }
    );
  }, []);

  // Handle polygon completion from drawing
  const handlePolygonComplete = useCallback(
    (coordinates: [number, number][]) => {
      setPendingCoordinates(coordinates);
      setEditingZone(null);
      setPreviewZoneParams({
        name: "",
        color: "#60a5fa",
        transparency: 0.5,
        borderWidth: 2,
        description: "",
        coordinates,
      });
      setPanelOpen(true);
      setIsDrawActive(false);
      flyToCoordinates(coordinates);
    },
    [flyToCoordinates]
  );

  // Handle zone creation/update from panel
  const handlePanelSubmit = useCallback(
    (data: ZoneFormData) => {
      if (!pendingCoordinates && !editingZone) return;

      const coordinates = editingZone
        ? editingZone.coordinates
        : pendingCoordinates!;

      mutateZone.mutate(
        {
          id: editingZone?.id,
          data,
          coordinates,
        },
        {
          onSuccess: () => {
            setPanelOpen(false);
            setPendingCoordinates(null);
            setEditingZone(null);
            setPreviewZoneParams(null);
            flyToCoordinates(coordinates);
          },
        }
      );
    },
    [editingZone, pendingCoordinates, mutateZone, flyToCoordinates]
  );

  // Handle coordinate updates from vertex editing
  const handleUpdateZoneCoordinates = useCallback(
    (zoneId: string, newCoords: [number, number][]) => {
      // If updating the temp new zone, update pendingCoordinates
      if (zoneId === "temp-new-zone") {
        setPendingCoordinates(newCoords);
        return;
      }

      // Update editingZone state if it's the one being edited
      setEditingZone((prev) => {
        if (prev && prev.id === zoneId) {
          return { ...prev, coordinates: newCoords };
        }
        return prev;
      });
    },
    []
  );

  // Handle edit zone
  const handleEditZone = useCallback(
    (zone: ZoneData) => {
      setEditingZone(zone);
      setPendingCoordinates(null);
      setPreviewZoneParams({
        name: zone.name,
        color: zone.color,
        transparency: zone.transparency,
        borderWidth: zone.borderWidth,
        description: zone.description,
        coordinates: zone.coordinates,
      });
      setPanelOpen(true);
      flyToCoordinates(zone.coordinates);
    },
    [flyToCoordinates]
  );

  // Handle delete zone (from map popup)
  const handleDeleteZone = useCallback(
    (zoneId: string) => {
      deleteZone.mutate(zoneId);
    },
    [deleteZone]
  );

  // Handle delete from panel
  const handleDeleteFromPanel = useCallback(() => {
    if (editingZone) {
      deleteZone.mutate(editingZone.id, {
        onSuccess: () => {
          setPanelOpen(false);
          setEditingZone(null);
          setPreviewZoneParams(null);
        },
      });
    }
  }, [editingZone, deleteZone]);

  // Handle panel close
  const handlePanelClose = useCallback(() => {
    setPanelOpen(false);
    setPendingCoordinates(null);
    setEditingZone(null);
    setPreviewZoneParams(null);
  }, []);

  // Transition to 3D pitch when 3D style is selected
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.easeTo({
        pitch: is3D ? 60 : 0,
        duration: 800,
      });
    }
  }, [is3D]);

  return (
    <Card className="h-full rounded-lg p-0 overflow-hidden relative border border-gray-300 shadow-none">
      <Map
        ref={mapRef}
        viewport={viewport}
        onViewportChange={setViewport}
        theme="light"
        styles={selectedStyle}
      >
        <MapControls
          showFullscreen
          showZoom
          show3D
          showHome
          homeViewport={initialViewport}
        />
        <MapToolbar
          isDrawActive={isDrawActive}
          onDrawActiveChange={setIsDrawActive}
          showBoundaries={showBoundaries}
          onShowBoundariesChange={setShowBoundaries}
          zones={zonesWithPreview}
          onZoneSelect={(zone) => flyToCoordinates(zone.coordinates)}
        />
        <MapStyleSelector value={style} onChange={setStyle} />
        <MapViewportInfo viewport={viewport} />

        {/* Drawing layer */}
        <MapDrawingLayer
          isDrawActive={isDrawActive}
          onPolygonComplete={handlePolygonComplete}
          zones={zonesWithPreview}
          showBoundaries={showBoundaries}
          onEditZone={handleEditZone}
          onDeleteZone={handleDeleteZone}
          editingZoneId={
            editingZone?.id ??
            (pendingCoordinates ? "temp-new-zone" : undefined)
          }
          onUpdateZoneCoordinates={handleUpdateZoneCoordinates}
          isDeleting={deleteZone.isPending}
          isDeleteSuccess={deleteZone.isSuccess}
        />

        {panelOpen && (
          <ZonePropertiesPanel
            onClose={handlePanelClose}
            onSubmit={handlePanelSubmit}
            onDelete={editingZone ? handleDeleteFromPanel : undefined}
            onValuesChange={setPreviewZoneParams}
            isEditing={!!editingZone}
            initialData={panelInitialData}
            isSubmitting={mutateZone.isPending}
            isDeleting={deleteZone.isPending}
            isDeleteSuccess={deleteZone.isSuccess}
          />
        )}
      </Map>
    </Card>
  );
}
