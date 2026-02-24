"use client";

import { useState, useMemo, Fragment } from "react";
import { Search, Pentagon, Map as MapIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { ZoneData } from "@/types/api/map";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MapToolbarProps {
  isDrawActive: boolean;
  onDrawActiveChange: (active: boolean) => void;
  showBoundaries: boolean;
  onShowBoundariesChange: (show: boolean) => void;
  zones: ZoneData[];
  onZoneSelect: (zone: ZoneData) => void;
}

export function MapToolbar({
  isDrawActive,
  onDrawActiveChange,
  showBoundaries,
  onShowBoundariesChange,
  zones,
  onZoneSelect,
}: Readonly<MapToolbarProps>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredZones = useMemo(() => {
    if (!searchQuery.trim()) return zones;
    return zones.filter((zone) =>
      zone.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [zones, searchQuery]);

  const handleSelectZone = (zone: ZoneData) => {
    onZoneSelect(zone);
    setSearchQuery("");
    setIsOpen(false);
  };

  return (
    <div className="absolute top-3 left-2 z-10 flex items-center bg-white rounded-lg px-2 h-12 min-w-125 border border-gray-400 shadow-card">
      {/* Search Section */}
      <div className="flex items-center gap-1 px-2 flex-1 relative">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-2 w-full cursor-pointer group">
              <Search className="size-4 text-gray-500 group-hover:text-primary transition-colors" />
              <div className="text-sm text-gray-400 select-none">
                {searchQuery || "Search zones..."}
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="p-0 w-80 overflow-hidden border-gray-300 shadow-card rounded-lg bg-white!"
            align="start"
            sideOffset={12}
          >
            <div className="flex flex-col">
              <div className="p-3 border-b flex items-center gap-2 bg-gray-50/50">
                <Search className="size-4 text-primary shrink-0" />
                <Input
                  autoFocus
                  placeholder="Type zone name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none shadow-none text-sm w-full h-8 focus-visible:ring-0 p-0"
                />
              </div>

              <div className="max-h-64 overflow-y-auto p-1.5">
                {filteredZones.length === 0 ? (
                  <div className="p-4 text-center bg-gray-50/30 rounded-lg">
                    <div className="inline-flex size-10 items-center justify-center rounded-full bg-gray-100 mb-3">
                      <Search className="size-5 text-gray-400" />
                    </div>
                    <p className="text-xs font-medium text-gray-500">
                      No zones found for &quot;{searchQuery}&quot;
                    </p>
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    {filteredZones.map((zone) => (
                      <Fragment key={zone.id}>
                        <button
                          onClick={() => handleSelectZone(zone)}
                          className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-primary/5 hover:text-primary transition-all group cursor-pointer flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className="size-2.5 rounded-full shrink-0 shadow-sm"
                              style={{ backgroundColor: zone.color }}
                            />
                            <span className="text-sm font-medium truncate">
                              {zone.name}
                            </span>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="text-[10px] bg-primary/10 px-1.5 py-0.5 rounded text-primary font-bold">
                              FLY TO
                            </div>
                          </div>
                        </button>
                        <Separator
                          orientation="horizontal"
                          className="last:hidden"
                        />
                      </Fragment>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Separator orientation="vertical" className="h-6 bg-white/10 mx-1" />

      {/* Actions */}
      <div className="flex items-center gap-1 px-1 h-full">
        {/* Draw Zone Button */}
        <Button
          variant={isDrawActive ? "default" : "ghost"}
          size="sm"
          onClick={() => onDrawActiveChange(!isDrawActive)}
          className={cn(
            "flex items-center gap-2 h-9 px-4 rounded-lg transition-all text-xs",
            isDrawActive
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "",
          )}
        >
          <Pentagon className="size-4" />
          <span>Draw Zone</span>
        </Button>

        <Separator orientation="vertical" className="h-6 bg-white/10 mx-1" />

        {/* Zone Boundaries Toggle */}
        <div className="flex items-center gap-4 px-4 py-1.5 h-9 text-xs whitespace-nowrap">
          <div className="flex items-center gap-2">
            <MapIcon className="size-4" />
            <span>Boundaries</span>
          </div>
          <Switch
            checked={showBoundaries}
            onCheckedChange={onShowBoundariesChange}
            className="scale-75 data-[state=checked]:bg-primary"
          />
        </div>
      </div>
    </div>
  );
}
