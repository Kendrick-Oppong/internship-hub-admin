import { ZoneFormData } from "@/lib/validations/forms/map";

// --- Zone Types ---
export type ZoneData = {
  id: string;
  name: string;
  color: string;
  coordinates: [number, number][];
  transparency: number;
  borderWidth: number;
  description?: string;
};

// API Response Types
export type ZoneApiResponse = {
  id: string;
  name: string;
  description?: string;
  color: string;
  polygonTransparency: number;
  borderWidth: number;
  boundary: {
    type: "Polygon";
    coordinates: [[number, number][]];
  };
  createdAt: string;
};

export type ZonesResponse = ZoneApiResponse[];

// Request Types
export type CreateZoneRequest = {
  name: string;
  color: string;
  coordinates: [number, number][];
  description?: string;
  polygonTransparency: number;
  borderWidth: number;
};

export type UpdateZoneRequest = CreateZoneRequest;

export interface MapDrawingLayerProps {
  /** Whether drawing mode is active */
  isDrawActive: boolean;
  /** Called when a polygon is completed */
  onPolygonComplete: (coordinates: [number, number][]) => void;
  /** Completed zones to render */
  zones: ZoneData[];
  /** Whether zone boundaries are visible */
  showBoundaries: boolean;
  /** Called when user wants to edit a zone */
  onEditZone: (zone: ZoneData) => void;
  /** Called when user wants to delete a zone */
  onDeleteZone: (zoneId: string) => void;
  /** ID of the zone currently being edited (for vertex editing) */
  editingZoneId?: string | null;
  /** Called when a zone's coordinates are updated via vertex dragging */
  onUpdateZoneCoordinates?: (
    zoneId: string,
    coordinates: [number, number][]
  ) => void;
  /** Whether a deletion is currently in progress */
  isDeleting?: boolean;
  /** Whether the last deletion was successful */
  isDeleteSuccess?: boolean;
}

export interface ZonePropertiesPanelProps {
  onSubmit: (data: ZoneFormData) => void;
  onDelete?: () => void;
  onClose: () => void;
  /** Called when form values change, for live preview */
  onValuesChange?: (data: ZoneFormData) => void;
  initialData?: Partial<ZoneFormData & { id: string }>;
  isEditing?: boolean;
  /** Whether a creation or update is currently in progress */
  isSubmitting?: boolean;
  /** Whether a deletion is currently in progress */
  isDeleting?: boolean;
  /** Whether the last deletion was successful */
  isDeleteSuccess?: boolean;
}
