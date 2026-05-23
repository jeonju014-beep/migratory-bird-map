import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function stripHtml(text: string) {
  return text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export function truncate(text: string, max = 120) {
  if (text.length <= max) return text;
  return `${text.slice(0, max)}...`;
}

export function ensureArray<T>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}
