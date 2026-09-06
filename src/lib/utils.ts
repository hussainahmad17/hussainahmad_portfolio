type ClassValue = string | false | null | undefined;

/** Minimal class joiner. No runtime dependency for something this small. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
