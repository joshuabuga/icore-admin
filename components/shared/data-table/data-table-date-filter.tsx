"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getDatePreset, DateRange as TableDateRange } from "@/lib/utils/table-utils";

interface DataTableDateFilterProps {
  value: TableDateRange;
  onChange: (value: TableDateRange) => void;
  placeholder?: string;
  className?: string;
}

export function DataTableDateFilter({
  value,
  onChange,
  placeholder = "Filter by date",
  className,
}: DataTableDateFilterProps) {
  const [open, setOpen] = React.useState(false);

  const dateRange: DateRange | undefined =
    value.from || value.to
      ? { from: value.from, to: value.to }
      : undefined;

  const handleSelect = (range: DateRange | undefined) => {
    onChange({
      from: range?.from,
      to: range?.to,
    });
  };

  const handlePreset = (preset: "today" | "7days" | "30days" | "thisMonth") => {
    onChange(getDatePreset(preset));
    setOpen(false);
  };

  const handleClear = () => {
    onChange({ from: undefined, to: undefined });
  };

  const hasValue = value.from || value.to;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date-filter"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal sm:w-[260px]",
              !hasValue && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {hasValue ? (
              <>
                {value.from ? format(value.from, "MMM d, yyyy") : "Start"} -{" "}
                {value.to ? format(value.to, "MMM d, yyyy") : "End"}
              </>
            ) : (
              placeholder
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex flex-col gap-2 p-3 border-b">
            <div className="text-sm font-medium">Quick select</div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePreset("today")}
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePreset("7days")}
              >
                Last 7 days
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePreset("30days")}
              >
                Last 30 days
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePreset("thisMonth")}
              >
                This month
              </Button>
            </div>
          </div>
          <Calendar
            mode="range"
            defaultMonth={value.from}
            selected={dateRange}
            onSelect={handleSelect}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
      {hasValue && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="h-9 w-9 p-0"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear date filter</span>
        </Button>
      )}
    </div>
  );
}
