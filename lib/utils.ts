import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBrandName(): string {
  return process.env.NEXT_PUBLIC_BRAND_NAME || "Ushindi Box";
}
