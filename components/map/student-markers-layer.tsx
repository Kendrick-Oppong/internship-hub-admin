"use client";

import { useMemo } from "react";
import {
  MapMarker,
  MarkerContent,
  MarkerPopup,
} from "@/components/ui/map";
import type { MapMarker as MapMarkerData } from "@/types/api/supervision";
import { Building2, MapPin, User } from "lucide-react";

interface StudentMarkersLayerProps {
  markers: MapMarkerData[];
}

export function StudentMarkersLayer({ markers }: StudentMarkersLayerProps) {
  const markerElements = useMemo(
    () =>
      markers.map((marker) => (
        <MapMarker
          key={marker.id}
          longitude={marker.longitude}
          latitude={marker.latitude}
        >
          <MarkerContent className="flex items-center justify-center">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-linear-to-br from-blue-500 to-blue-600 shadow-lg hover:shadow-xl transition-shadow">
              <User className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
          </MarkerContent>
          <MarkerPopup>
            <div className="space-y-3 p-3 min-w-64">
              {/* Student Name Header */}
              <div className="border-b pb-2">
                <h3 className="font-semibold text-sm text-gray-900">
                  {marker.studentName}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {marker.indexNumber}
                </p>
              </div>

              {/* Company Information */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Building2 className="h-4 w-4 mt-0.5 text-blue-600 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-gray-600">Company</p>
                    <p className="text-sm text-gray-900">{marker.companyName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-red-600 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-gray-600">Location</p>
                    <p className="text-sm text-gray-900">{marker.companyCity}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {marker.companyAddress}
                    </p>
                  </div>
                </div>
              </div>

              {/* Coordinates */}
              <div className="border-t pt-2">
                <p className="text-xs text-gray-500">
                  {marker.latitude.toFixed(4)}, {marker.longitude.toFixed(4)}
                </p>
              </div>
            </div>
          </MarkerPopup>
        </MapMarker>
      )),
    [markers]
  );

  return <>{markerElements}</>;
}
