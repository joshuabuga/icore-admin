import { Row, FilterFn } from "@tanstack/react-table";
import { format, isWithinInterval, parseISO, startOfDay, endOfDay } from "date-fns";

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

/**
 * Global filter function that searches across all string values in a row
 */
export const globalFilterFn: FilterFn<unknown> = (
  row: Row<unknown>,
  _columnId: string,
  filterValue: string
): boolean => {
  if (!filterValue || filterValue.trim() === "") return true;

  const search = filterValue.toLowerCase().trim();

  // Search all cell values as strings
  return row.getAllCells().some((cell) => {
    const value = cell.getValue();
    if (value === null || value === undefined) return false;
    return String(value).toLowerCase().includes(search);
  });
};

/**
 * Filter rows by date range
 */
export function filterByDateRange<T>(
  data: T[],
  dateColumn: keyof T,
  dateRange: DateRange
): T[] {
  if (!dateRange.from && !dateRange.to) return data;

  return data.filter((item) => {
    const dateValue = item[dateColumn];
    if (!dateValue || typeof dateValue !== "string") return true;

    try {
      const itemDate = parseISO(dateValue);

      // If only "from" date is set
      if (dateRange.from && !dateRange.to) {
        return itemDate >= startOfDay(dateRange.from);
      }

      // If only "to" date is set
      if (!dateRange.from && dateRange.to) {
        return itemDate <= endOfDay(dateRange.to);
      }

      // If both dates are set
      if (dateRange.from && dateRange.to) {
        return isWithinInterval(itemDate, {
          start: startOfDay(dateRange.from),
          end: endOfDay(dateRange.to),
        });
      }

      return true;
    } catch {
      return true;
    }
  });
}

/**
 * Format date for display
 */
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "-";
  try {
    return format(parseISO(dateString), "MMM d, yyyy");
  } catch {
    return dateString;
  }
}

/**
 * Format date with time for display
 */
export function formatDateTime(dateString: string | null | undefined): string {
  if (!dateString) return "-";
  try {
    return format(parseISO(dateString), "MMM d, yyyy h:mm a");
  } catch {
    return dateString;
  }
}

/**
 * Format currency for display
 */
export function formatCurrency(
  value: string | number | null | undefined,
  currency = "KES"
): string {
  if (value === null || value === undefined) return "-";
  const numValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(numValue)) return String(value);
  return `${currency} ${numValue.toLocaleString("en-KE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Format phone number for display
 */
export function formatPhone(phone: string | null | undefined): string {
  if (!phone) return "-";
  // Format Kenyan phone numbers: 254XXXXXXXXX -> +254 XXX XXX XXX
  if (phone.startsWith("254") && phone.length === 12) {
    return `+${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6, 9)} ${phone.slice(9)}`;
  }
  return phone;
}

/**
 * Date range presets
 */
export function getDatePreset(preset: "today" | "7days" | "30days" | "thisMonth"): DateRange {
  const today = new Date();

  switch (preset) {
    case "today":
      return { from: today, to: today };
    case "7days":
      return {
        from: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
        to: today,
      };
    case "30days":
      return {
        from: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
        to: today,
      };
    case "thisMonth":
      return {
        from: new Date(today.getFullYear(), today.getMonth(), 1),
        to: today,
      };
    default:
      return { from: undefined, to: undefined };
  }
}
