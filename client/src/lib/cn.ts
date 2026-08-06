import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names and resolves Tailwind class conflicts
 * (e.g. cn("p-2", "p-4") -> "p-4" instead of both being applied).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}