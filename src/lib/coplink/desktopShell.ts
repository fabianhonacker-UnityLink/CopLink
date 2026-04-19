export type AppId =
  | "akten"
  | "ermittlungen"
  | "kfz"
  | "officer"
  | "leitstelle"
  | "stempeluhr"
  | "einstellungen"
  | "ausbildungen"
  | "taschenrechner"
  | "gefaengnis"
  | "strafen"
  | "urlaub"
  | "strafanzeigen"
  | "vorlagen"
  | "funk"
  | "einsatzberichte"
  | "kalender"
  | "notizen"
  | "waffenregister"
  | "asservatenkammer"
  | "units"
  | "wissensdatenbank"
  | "meinpc";

export type AppConfig = {
  id: AppId;
  label: string;
  desktopLabel?: string;
  short: string;
  accent: string;
  desktop?: boolean;
  pinned?: boolean;
  defaultSize?: { width: number; height: number };
};

export type WindowState = {
  id: AppId;
  appId: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  prevX: number;
  prevY: number;
  prevWidth: number;
  prevHeight: number;
  isMinimized: boolean;
  isMaximized: boolean;
  z: number;
};

export type DragState = {
  id: AppId;
  pointerOffsetX: number;
  pointerOffsetY: number;
};

export type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

export type ResizeState = {
  id: AppId;
  direction: ResizeDirection;
  startMouseX: number;
  startMouseY: number;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
};

export type IconPosition = {
  x: number;
  y: number;
};

export type IconDragState = {
  id: AppId;
  pointerOffsetX: number;
  pointerOffsetY: number;
  startMouseX: number;
  startMouseY: number;
  moved: boolean;
};

export const APPS: AppConfig[] = [
  { id: "akten", label: "Akten", short: "AK", accent: "from-rose-500 to-red-500", desktop: true, pinned: true, defaultSize: { width: 760, height: 520 } },
  { id: "ermittlungen", label: "Ermittlungen", short: "ER", accent: "from-red-500 to-orange-500", desktop: true, defaultSize: { width: 860, height: 560 } },
  { id: "kfz", label: "KFZ-Register", short: "KFZ", accent: "from-zinc-300 to-slate-500", desktop: true, pinned: true, defaultSize: { width: 820, height: 480 } },
  { id: "officer", label: "Officer", short: "OF", accent: "from-orange-400 to-amber-500", desktop: true, defaultSize: { width: 920, height: 560 } },
  { id: "leitstelle", label: "Leitstelle", short: "LT", accent: "from-sky-300 to-blue-400", desktop: true, defaultSize: { width: 980, height: 560 } },
  { id: "stempeluhr", label: "Stempeluhr", short: "ST", accent: "from-emerald-400 to-green-500", desktop: true, pinned: true, defaultSize: { width: 760, height: 420 } },
  { id: "einstellungen", label: "Einstellungen", short: "EI", accent: "from-violet-500 to-fuchsia-500", desktop: true, defaultSize: { width: 980, height: 600 } },
  { id: "ausbildungen", label: "Ausbildungen", short: "AU", accent: "from-cyan-500 to-sky-500", desktop: true, defaultSize: { width: 760, height: 460 } },
  { id: "taschenrechner", label: "Taschenrechner", short: "TR", accent: "from-indigo-400 to-violet-500", desktop: true, pinned: true, defaultSize: { width: 360, height: 470 } },
  { id: "gefaengnis", label: "Gefängnis", short: "GE", accent: "from-slate-500 to-zinc-600", desktop: true, defaultSize: { width: 900, height: 520 } },
  { id: "strafen", label: "Strafen", short: "SF", accent: "from-red-600 to-rose-500", desktop: true, defaultSize: { width: 1120, height: 640 } },
  { id: "urlaub", label: "Urlaub", short: "UR", accent: "from-teal-500 to-emerald-500", desktop: true, defaultSize: { width: 760, height: 430 } },
  { id: "strafanzeigen", label: "Strafanzeigen", short: "SA", accent: "from-orange-500 to-amber-500", desktop: true, defaultSize: { width: 1020, height: 560 } },
  { id: "vorlagen", label: "Vorlagen", short: "VO", accent: "from-slate-400 to-slate-500", desktop: true, defaultSize: { width: 840, height: 500 } },
  { id: "funk", label: "Funk", short: "FU", accent: "from-cyan-400 to-blue-500", desktop: true, defaultSize: { width: 860, height: 520 } },
  { id: "einsatzberichte", label: "Einsatzberichte", short: "EB", accent: "from-red-500 to-pink-500", desktop: true, defaultSize: { width: 1120, height: 560 } },
  { id: "kalender", label: "Kalender", short: "KA", accent: "from-blue-500 to-indigo-500", desktop: true, pinned: true, defaultSize: { width: 760, height: 500 } },
  { id: "notizen", label: "Notizen", short: "NO", accent: "from-yellow-500 to-amber-500", desktop: true, defaultSize: { width: 520, height: 420 } },
  { id: "waffenregister", label: "Waffenregister", short: "WR", accent: "from-neutral-500 to-zinc-600", desktop: true, defaultSize: { width: 820, height: 500 } },
  { id: "asservatenkammer", label: "Asservatenkammer", desktopLabel: "Asservaten", short: "AS", accent: "from-red-600 to-orange-500", desktop: true, defaultSize: { width: 980, height: 620 } },
  { id: "units", label: "Units", short: "UN", accent: "from-cyan-400 to-indigo-500", desktop: true, defaultSize: { width: 780, height: 460 } },
  { id: "wissensdatenbank", label: "Wissensdatenbank", desktopLabel: "Wissen", short: "WD", accent: "from-slate-500 to-blue-500", desktop: true, defaultSize: { width: 900, height: 520 } },
  { id: "meinpc", label: "Mein PC", short: "PC", accent: "from-sky-500 to-cyan-500", desktop: true, defaultSize: { width: 760, height: 500 } },
];

export const QUICK_APPS: AppId[] = ["leitstelle", "akten", "kfz", "waffenregister", "asservatenkammer", "officer", "kalender", "ermittlungen", "einstellungen"];
export const TASKBAR_PINNED: AppId[] = ["leitstelle", "akten", "kfz", "waffenregister"];
export const desktopApps = APPS.filter((app) => app.desktop);
export const pinnedApps = TASKBAR_PINNED.map((id) => APPS.find((app) => app.id === id)).filter(Boolean) as AppConfig[];

export function getApp(appId: AppId) {
  return APPS.find((app) => app.id === appId)!;
}

export function getInitialIconPositions() {
  const layout = [16, 146, 276, 406];
  const startY = 118;
  const rowGap = 128;
  const positions: Record<AppId, IconPosition> = {} as Record<AppId, IconPosition>;

  desktopApps.forEach((app, index) => {
    const column = index % layout.length;
    const row = Math.floor(index / layout.length);
    positions[app.id] = {
      x: layout[column],
      y: startY + row * rowGap,
    };
  });

  return positions;
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

export function getWindowPlacement(app: AppConfig, openCount: number, desktop: DOMRect | null) {
  const fallbackWidth = app.defaultSize?.width ?? 820;
  const fallbackHeight = app.defaultSize?.height ?? 520;

  if (!desktop) {
    return {
      width: Math.max(fallbackWidth, 1280),
      height: Math.max(fallbackHeight, 700),
      x: 420,
      y: 42,
    };
  }

  const preferredWidth = Math.max(fallbackWidth, Math.round(desktop.width * 0.58), 1020);
  const preferredHeight = Math.max(fallbackHeight, Math.round(desktop.height * 0.62), 620);
  const maxWidth = Math.max(960, desktop.width - 28);
  const maxHeight = Math.max(600, desktop.height - 72);
  const width = clamp(preferredWidth, 960, maxWidth);
  const height = clamp(preferredHeight, 600, maxHeight);
  const offsetX = (openCount % 4) * 18;
  const offsetY = (openCount % 4) * 16;
  const rightAnchoredX = desktop.width - width - 24 - offsetX;
  const topAnchoredY = 28 + offsetY;

  return {
    width,
    height,
    x: clamp(rightAnchoredX, 40, Math.max(40, desktop.width - width - 20)),
    y: clamp(topAnchoredY, 24, Math.max(24, desktop.height - height - 70)),
  };
}
