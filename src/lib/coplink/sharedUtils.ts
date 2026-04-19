import { formatStrafMeta, type StrafkatalogEintrag } from "../../data/strafkatalog";

export function formatDate(date: Date | null) {
  if (!date) return "--.--.----";
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatTime(date: Date | null) {
  if (!date) return "--:--";
  return date.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDateTimeStamp(date: Date) {
  return `${date.toLocaleDateString("de-DE")} ${date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}`;
}

export function normalizeSearchValue(value: string) {
  return value.trim().toLowerCase();
}

export function createStrafanzeigenId(existingCount: number) {
  return `SA-2026-${String(existingCount + 1).padStart(4, "0")}`;
}

export function formatOffenseMeta(entry: StrafkatalogEintrag) {
  return formatStrafMeta(entry);
}
