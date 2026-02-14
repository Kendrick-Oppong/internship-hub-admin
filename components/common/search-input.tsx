"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/lib/providers/toaster-provider";
import { Loader, MoveRight, Search } from "lucide-react";
import { useEffect, useCallback, memo, useRef } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  minLength?: number;
  defaultValue?: string;
}

export const SearchInput = memo(function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder = "Search...",
  disabled = false,
  isLoading = false,
  minLength = 3,
  defaultValue = "",
  className,
}: Readonly<SearchInputProps>) {
  const hasInitialized = useRef(false);

  // Initialize with defaultValue when it becomes available
  useEffect(() => {
    if (defaultValue && !hasInitialized.current && value !== defaultValue) {
      onChange(defaultValue);
      hasInitialized.current = true;
    }
  }, [defaultValue, onChange, value]);

  const handleSearch = useCallback(() => {
    const trimmedValue = value.trim();

    // Allow empty search to clear filters
    if (trimmedValue.length === 0) {
      onSearch();
      return;
    }

    if (trimmedValue.length < minLength) {
      toast.error(`Search term is too short`);
      return;
    }

    onSearch();
  }, [value, minLength, onSearch]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    },
    [handleSearch]
  );

  const handleBlur = useCallback(() => {
    const trimmedValue = value.trim();

    // Trigger search if value meets minLength OR if it's empty (to clear search)
    if (trimmedValue.length >= minLength || trimmedValue.length === 0) {
      onSearch();
    }
  }, [value, minLength, onSearch]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <div className="relative w-full">
      <Input
        type="search"
        disabled={disabled}
        placeholder={placeholder}
        className={`pl-10 pr-12 border border-gray-400 shadow-none w-full ${className}`}
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        spellCheck="false"
      />
      <Search
        size={20}
        className="absolute top-[11px] left-2.5 text-muted-foreground pointer-events-none"
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute top-1 right-1 h-8 w-8 p-0 hover:bg-primary/10"
        onClick={handleSearch}
        disabled={disabled || isLoading}
        aria-label="Search"
      >
        {isLoading ? (
          <Loader className="animate-spin text-primary" />
        ) : (
          <MoveRight size={16} />
        )}
      </Button>
    </div>
  );
});
