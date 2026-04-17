"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import DesktopIcon from "../components/DesktopIcon";
import WindowFrame from "../components/WindowFrame";

type AppId =
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
  | "units"
  | "wissensdatenbank"
  | "meinpc";

type AppConfig = {
  id: AppId;
  label: string;
  desktopLabel?: string;
  short: string;
  accent: string;
  desktop?: boolean;
  pinned?: boolean;
  defaultSize?: { width: number; height: number };
};

type WindowState = {
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

type DragState = {
  id: AppId;
  pointerOffsetX: number;
  pointerOffsetY: number;
};

type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

type ResizeState = {
  id: AppId;
  direction: ResizeDirection;
  startMouseX: number;
  startMouseY: number;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
};

type IconPosition = {
  x: number;
  y: number;
};

type IconDragState = {
  id: AppId;
  pointerOffsetX: number;
  pointerOffsetY: number;
  startMouseX: number;
  startMouseY: number;
  moved: boolean;
};

const APPS: AppConfig[] = [
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
  { id: "units", label: "Units", short: "UN", accent: "from-cyan-400 to-indigo-500", desktop: true, defaultSize: { width: 780, height: 460 } },
  { id: "wissensdatenbank", label: "Wissensdatenbank", desktopLabel: "Wissen", short: "WD", accent: "from-slate-500 to-blue-500", desktop: true, defaultSize: { width: 900, height: 520 } },
  { id: "meinpc", label: "Mein PC", short: "PC", accent: "from-sky-500 to-cyan-500", desktop: true, defaultSize: { width: 760, height: 500 } },
];

const QUICK_APPS: AppId[] = ["leitstelle", "akten", "kfz", "waffenregister", "officer", "kalender", "ermittlungen", "einstellungen"];
const TASKBAR_PINNED: AppId[] = ["leitstelle", "akten", "kfz", "waffenregister"];
const desktopApps = APPS.filter((app) => app.desktop);
const pinnedApps = TASKBAR_PINNED.map((id) => APPS.find((app) => app.id === id)).filter(Boolean) as AppConfig[];

function getApp(appId: AppId) {
  return APPS.find((app) => app.id === appId)!;
}


const QuickOpenContext = createContext<(appId: AppId) => void>(() => {});

function getInitialIconPositions() {
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

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

function getWindowPlacement(app: AppConfig, openCount: number, desktop: DOMRect | null) {
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

function formatDate(date: Date | null) {
  if (!date) return "--.--.----";
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatTime(date: Date | null) {
  if (!date) return "--:--";
  return date.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function AppSidebar() {
  const openQuickApp = useContext(QuickOpenContext);

  return (
    <div className="flex h-full w-[210px] flex-col border-r border-white/8 bg-white/[0.03] px-4 py-5">
      <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-white/35">Oft genutzte Apps</p>

      <div className="space-y-2">
        {QUICK_APPS.map((quickAppId) => {
          const app = getApp(quickAppId);
          return (
            <button
              key={app.id}
              type="button"
              onClick={() => openQuickApp(app.id)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-white/85 transition hover:bg-white/8"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/20 text-[11px] font-bold text-red-200">
                {app.short.slice(0, 1)}
              </span>
              <span>{app.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto rounded-2xl border border-white/8 bg-black/20 p-4">
        <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">Status</p>
        <p className="mt-2 text-sm font-semibold text-emerald-400">System verbunden</p>
        <p className="mt-1 text-xs text-white/45">Bitterhafen CopLink aktiv</p>
      </div>
    </div>
  );
}

function AppShell({
  breadcrumb,
  title,
  actions,
  children,
}: {
  breadcrumb: string;
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full bg-[#090b11] text-white">
      <AppSidebar />
      <div className="window-scrollbar flex-1 overflow-auto px-5 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-red-200/60">{breadcrumb}</p>
            <h1 className="mt-2 text-2xl font-bold text-white">{title}</h1>
          </div>
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}

function SearchInput({ placeholder }: { placeholder: string }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-red-400/40"
    />
  );
}


type AktenRecordType = "personenakte" | "sammelakte";
type AktenEntryType = "Straftaten" | "Gangstraftaten" | "Bußgelder und Normales";

type AktenLicense = {
  id: string;
  name: string;
  aussteller: string;
  nummer: string;
};

type AktenWeapon = {
  id: string;
  weapon: string;
  serial: string;
  status: string;
};

type VehicleModelOption = {
  id: string;
  modell: string;
  fahrzeugtyp: string;
};

type AktenCharge = {
  id: string;
  from: string;
  taeter: string;
  officer: string;
  status: string;
};

type AktenVehicle = {
  id: string;
  kennzeichen: string;
  fahrzeugtyp: string;
  modell: string;
  hu: string;
  versicherung: string;
  status: string;
};

type AktenEntry = {
  id: string;
  type: AktenEntryType;
  title: string;
  creator: string;
  sentence: string;
  date: string;
  notes: string;
};

type PersonenAkteData = {
  sharedBy?: string;
  aktennummer: string;
  imageLabel: string;
  vorNachname: string;
  geburtsdatum: string;
  alias: string;
  telefon: string;
  groesse: string;
  augenfarbe: string;
  haarfarbe: string;
  geschlecht: string;
  tags: string[];
  lizenzen: AktenLicense[];
  waffen: AktenWeapon[];
  verkehrspunkte: number;
  strafanzeigen: AktenCharge[];
  fahrzeuge: AktenVehicle[];
  eintraege: AktenEntry[];
};

type SammelAkteData = {
  sharedBy?: string;
  aktennummer: string;
  zeitraum: string;
  ort: string;
  federfuehrung: string;
  beschreibung: string;
  beteiligte: string[];
  tags: string[];
  verknuepfungen: string[];
  letzteMassnahme: string;
};

type AktenRecord = {
  id: string;
  kind: AktenRecordType;
  title: string;
  status: string;
  lastUpdated: string;
  searchable: string[];
  person?: PersonenAkteData;
  collection?: SammelAkteData;
};

const INITIAL_AKTEN_RECORDS: AktenRecord[] = [
  {
    id: "18079433-31484-CPN",
    kind: "personenakte",
    title: "Vale Hutch",
    status: "geteilt",
    lastUpdated: "17.04.2026 03:42",
    searchable: ["vale hutch", "18079433-31484-cpn", "vale", "hutch"],
    person: {
      sharedBy: "FIB",
      aktennummer: "18079433-31484-CPN",
      imageLabel: "VH",
      vorNachname: "Vale Hutch",
      geburtsdatum: "07.12.1998",
      alias: "-",
      telefon: "-",
      groesse: "186",
      augenfarbe: "-",
      haarfarbe: "Schwarz",
      geschlecht: "M",
      tags: ["geteilt", "beobachtung"],
      lizenzen: [],
      waffen: [],
      verkehrspunkte: 0,
      strafanzeigen: [],
      fahrzeuge: [],
      eintraege: [
        {
          id: "752106-18079433-CPN",
          type: "Straftaten",
          title: "Strafanzeige mit Haftstrafe",
          creator: "Unbekannt",
          sentence: "80000 Dollar und 60 Monate",
          date: "16.04.2026 23:53",
          notes: "Straftat",
        },
      ],
    },
  },
  {
    id: "91488310-32039-CPA",
    kind: "personenakte",
    title: "Erwin Eisenhauer",
    status: "gesucht",
    lastUpdated: "17.04.2026 02:10",
    searchable: ["erwin eisenhauer", "gesucht", "68", "eisenhauer"],
    person: {
      aktennummer: "91488310-32039-CPA",
      imageLabel: "EE",
      vorNachname: "Erwin Eisenhauer",
      geburtsdatum: "21.03.1994",
      alias: "-",
      telefon: "555-0183",
      groesse: "181",
      augenfarbe: "Braun",
      haarfarbe: "Dunkelblond",
      geschlecht: "M",
      tags: ["gesucht", "fahrzeugbezug"],
      lizenzen: [
        { id: "liz-1", name: "Führerschein Klasse B", aussteller: "Landespolizei Bitterhafen", nummer: "FS-B-18322" },
      ],
      waffen: [],
      verkehrspunkte: 6,
      strafanzeigen: [
        { id: "sa-1", from: "Staatsanwaltschaft", taeter: "Erwin Eisenhauer", officer: "Agent Bane", status: "laufend" },
      ],
      fahrzeuge: [
        { id: "veh-1", kennzeichen: "68", fahrzeugtyp: "Sedan", modell: "Jugular S-State", hu: "Abgelaufen am 14.04.2026", versicherung: "Teilkasko", status: "Gesucht" },
      ],
      eintraege: [
        {
          id: "310822-32039-CPA",
          type: "Bußgelder und Normales",
          title: "Verkehrsdelikt",
          creator: "Officer Jax",
          sentence: "6 Verkehrspunkte",
          date: "12.04.2026 18:20",
          notes: "HU abgelaufen / Fahrzeug gesucht",
        },
      ],
    },
  },
  {
    id: "SM-2026-011",
    kind: "sammelakte",
    title: "Sammelakte Hafenring",
    status: "aktiv",
    lastUpdated: "16.04.2026 20:08",
    searchable: ["sammelakte hafenring", "hafenring", "sm-2026-011"],
    collection: {
      sharedBy: "IAA",
      aktennummer: "SM-2026-011",
      zeitraum: "14.04.2026 - 17.04.2026",
      ort: "Hafenring / Industriegebiet",
      federfuehrung: "Officer Heller",
      beschreibung:
        "Sammelakte zu mehreren verbundenen Vorfällen im Hafengebiet. Erfasst Beobachtungen, Fahrzeugbezüge, Hinweise aus Strafanzeigen und offene Verknüpfungen zu weiteren Ermittlungen.",
      beteiligte: ["Vale Hutch", "Erwin Eisenhauer", "Unbekannte Dritte"],
      tags: ["sammelakte", "priorität", "intern"],
      verknuepfungen: ["Ermittlungen: Waffenhandel Ziki Peres", "KFZ-Register: Kennzeichen 68"],
      letzteMassnahme: "Abgleich mit Strafanzeigen-Datenbank ausstehend",
    },
  },
];

const LICENSE_OPTIONS: AktenLicense[] = [
  { id: "liz-b", name: "Führerschein Klasse B", aussteller: "Landespolizei Bitterhafen", nummer: "FS-B-99120" },
  { id: "liz-c", name: "Führerschein Klasse C", aussteller: "Landespolizei Bitterhafen", nummer: "FS-C-77102" },
  { id: "liz-boat", name: "Bootsführerschein", aussteller: "Landespolizei Bitterhafen", nummer: "BOOT-22018" },
  { id: "liz-pilot", name: "Pilotenschein", aussteller: "Landespolizei Bitterhafen", nummer: "PIL-78110" },
  { id: "liz-weapon", name: "Waffenlizenz", aussteller: "Landespolizei Bitterhafen", nummer: "WAF-48177" },
];

const VEHICLE_MODEL_OPTIONS: VehicleModelOption[] = [
  { id: "veh-model-1", fahrzeugtyp: "Sedan", modell: "Jugular S-State" },
  { id: "veh-model-2", fahrzeugtyp: "SUV", modell: "Granger 3600LX" },
  { id: "veh-model-3", fahrzeugtyp: "Sportwagen", modell: "Comet S2" },
  { id: "veh-model-4", fahrzeugtyp: "Motorrad", modell: "Shinobi" },
  { id: "veh-model-5", fahrzeugtyp: "Kombi", modell: "Astron" },
];

const WEAPON_TYPE_OPTIONS = [
  { id: "wep-type-1", weapon: "Pistol .50" },
  { id: "wep-type-2", weapon: "Carbine Rifle" },
  { id: "wep-type-3", weapon: "Pump Shotgun" },
  { id: "wep-type-4", weapon: "SMG" },
  { id: "wep-type-5", weapon: "Heavy Pistol" },
];

const CHARGE_OPTIONS: AktenCharge[] = [
  { id: "ch-1", from: "Staatsanwaltschaft", taeter: "Erwin Eisenhauer", officer: "Agent Bane", status: "laufend" },
  { id: "ch-2", from: "Leitstelle", taeter: "Vale Hutch", officer: "Officer Jax", status: "offen" },
  { id: "ch-3", from: "Ermittlungen", taeter: "John Heller", officer: "Agent Hawk", status: "in Bearbeitung" },
];

type KfzRecord = {
  id: string;
  kennzeichen: string;
  fahrzeugtyp: string;
  modell: string;
  halter: string;
  assignedPersonAkteId: string | null;
  huStatus: "Gültig" | "Abgelaufen" | "Unbekannt";
  huAblauf: string;
  versicherung: "Nicht versichert" | "Teilkasko" | "Vollkasko" | "Keine Angabe";
  status: "Unauffällig" | "Gesucht" | "Beobachtung" | "Sichergestellt";
  notiz: string;
};

type KfzFormState = {
  kennzeichen: string;
  modellId: string;
  halter: string;
  huStatus: KfzRecord["huStatus"];
  huAblauf: string;
  versicherung: KfzRecord["versicherung"];
  status: KfzRecord["status"];
  notiz: string;
};

const KFZ_STATUS_OPTIONS: KfzRecord["status"][] = ["Unauffällig", "Gesucht", "Beobachtung", "Sichergestellt"];
const KFZ_HU_STATUS_OPTIONS: KfzRecord["huStatus"][] = ["Gültig", "Abgelaufen", "Unbekannt"];
const KFZ_VERSICHERUNG_OPTIONS: KfzRecord["versicherung"][] = ["Nicht versichert", "Teilkasko", "Vollkasko", "Keine Angabe"];

const INITIAL_KFZ_RECORDS: KfzRecord[] = [
  {
    id: "kfz-1",
    kennzeichen: "68",
    fahrzeugtyp: "Sedan",
    modell: "Jugular S-State",
    halter: "Erwin Eisenhauer",
    assignedPersonAkteId: "91488310-32039-CPA",
    huStatus: "Abgelaufen",
    huAblauf: "2026-04-14",
    versicherung: "Teilkasko",
    status: "Gesucht",
    notiz: "Bezug zu Personenakte Erwin Eisenhauer. Fahrzeug in mehreren Vorfällen genannt.",
  },
  {
    id: "kfz-2",
    kennzeichen: "RC30377",
    fahrzeugtyp: "Sportwagen",
    modell: "Sultan RS",
    halter: "Elliot Hackermann",
    assignedPersonAkteId: null,
    huStatus: "Gültig",
    huAblauf: "2026-11-20",
    versicherung: "Vollkasko",
    status: "Unauffällig",
    notiz: "Im Register vorhanden, aktuell kein Fahndungsbezug.",
  },
  {
    id: "kfz-3",
    kennzeichen: "E-GHGT",
    fahrzeugtyp: "SUV",
    modell: "Granger 3600LX",
    halter: "John Heller",
    assignedPersonAkteId: null,
    huStatus: "Gültig",
    huAblauf: "2026-12-05",
    versicherung: "Vollkasko",
    status: "Unauffällig",
    notiz: "Privatfahrzeug. Wird in der Personenakte als verknüpftes Fahrzeug geführt.",
  },
  {
    id: "kfz-4",
    kennzeichen: "VH-0721",
    fahrzeugtyp: "SUV",
    modell: "Granger 3600LX",
    halter: "Vale Hutch",
    assignedPersonAkteId: "18079433-31484-CPN",
    huStatus: "Unbekannt",
    huAblauf: "",
    versicherung: "Keine Angabe",
    status: "Beobachtung",
    notiz: "Möglicher Fahrzeugbezug. Abgleich mit Leitstelle noch offen.",
  },
];

const RecordsContext = createContext<{
  aktenRecords: AktenRecord[];
  setAktenRecords: (value: AktenRecord[] | ((prev: AktenRecord[]) => AktenRecord[])) => void;
  kfzRecords: KfzRecord[];
  setKfzRecords: (value: KfzRecord[] | ((prev: KfzRecord[]) => KfzRecord[])) => void;
}>({
  aktenRecords: INITIAL_AKTEN_RECORDS,
  setAktenRecords: () => {},
  kfzRecords: INITIAL_KFZ_RECORDS,
  setKfzRecords: () => {},
});


function getInitialKfzForm(): KfzFormState {
  return {
    kennzeichen: "",
    modellId: VEHICLE_MODEL_OPTIONS[0]?.id ?? "",
    halter: "Unbekannt",
    huStatus: "Gültig",
    huAblauf: "",
    versicherung: "Nicht versichert",
    status: "Unauffällig",
    notiz: "",
  };
}

function formatHuDisplay(record: KfzRecord) {
  if (record.huStatus === "Unbekannt") return "Unbekannt";
  if (!record.huAblauf) return record.huStatus;
  return record.huStatus === "Gültig" ? `Gültig bis ${record.huAblauf}` : `Abgelaufen seit ${record.huAblauf}`;
}

function getHuTone(record: KfzRecord) {
  if (record.huStatus === "Gültig") return "bg-emerald-500/20 text-emerald-200 border-emerald-400/30";
  if (record.huStatus === "Abgelaufen") return "bg-rose-500/20 text-rose-200 border-rose-400/30";
  return "bg-rose-500/20 text-rose-200 border-rose-400/30";
}

function getInsuranceTone(versicherung: KfzRecord["versicherung"]) {
  if (versicherung === "Vollkasko") return "bg-emerald-500/20 text-emerald-200 border-emerald-400/30";
  if (versicherung === "Teilkasko") return "bg-amber-500/20 text-amber-200 border-amber-400/30";
  if (versicherung === "Nicht versichert" || versicherung === "Keine Angabe") return "bg-rose-500/20 text-rose-200 border-rose-400/30";
  return "bg-white/10 text-white/75 border-white/10";
}

function KfzToneBadge({ text, tone }: { text: string; tone: string }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${tone}`}>
      {text}
    </span>
  );
}

function getOwnerRegistrationLabel(record: KfzRecord) {
  return record.halter && record.halter !== "Unbekannt" ? "Angemeldet" : "Abgemeldet";
}

function getOwnerRegistrationTone(record: KfzRecord) {
  return record.halter && record.halter !== "Unbekannt"
    ? "bg-emerald-500/18 text-emerald-200 border-emerald-400/35"
    : "bg-rose-500/18 text-rose-200 border-rose-400/35";
}


function SectionTitle({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-[28px] font-bold text-white">{title}</h2>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
      <p className="text-xs uppercase tracking-[0.22em] text-white/38">{label}</p>
      <p className="mt-3 text-base font-semibold text-white">{value || "-"}</p>
    </div>
  );
}

function StatusBadge({ text }: { text: string }) {
  const normalized = text.toLowerCase();
  const tone = normalized.includes("gesucht")
    ? "bg-rose-500/20 text-rose-200 border-rose-400/30"
    : normalized.includes("unauffällig")
    ? "bg-emerald-500/20 text-emerald-200 border-emerald-400/30"
    : normalized.includes("beobachtung") || normalized.includes("intern")
    ? "bg-amber-500/20 text-amber-200 border-amber-400/30"
    : normalized.includes("aktiv") || normalized.includes("geteilt")
    ? "bg-cyan-500/20 text-cyan-200 border-cyan-400/30"
    : "bg-white/10 text-white/80 border-white/10";

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${tone}`}>
      {text}
    </span>
  );
}

function FancySelect({
  value,
  options,
  onChange,
  placeholder,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    window.addEventListener("mousedown", handlePointerDown);
    return () => window.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const selected = options.find((option) => option.value === value);

  return (
    <div ref={ref} className="ui-select-root">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`ui-select-trigger ${open ? "is-open" : ""}`}
      >
        <span>{selected?.label ?? placeholder ?? "Auswählen"}</span>
        <span className={`ui-select-caret ${open ? "is-open" : ""}`}>▾</span>
      </button>

      {open ? (
        <div className="ui-select-menu window-scrollbar">
          {options.map((option) => {
            const active = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`ui-select-option ${active ? "is-active" : ""}`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function AktenApp() {
  const { aktenRecords: records, setAktenRecords: setRecords, kfzRecords, setKfzRecords } = useContext(RecordsContext);
  const [search, setSearch] = useState("");
  const [scope, setScope] = useState<"alle" | AktenRecordType>("alle");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [createMode, setCreateMode] = useState<null | "personenakte" | "personenakte-bearbeiten" | "sammelakte">(null);
  const [entryFilter, setEntryFilter] = useState<"Alle" | AktenEntryType>("Alle");
  const [personForm, setPersonForm] = useState({
    vorNachname: "",
    geburtsdatum: "",
    alias: "",
    telefon: "",
    groesse: "",
    augenfarbe: "",
    haarfarbe: "",
    geschlecht: "M",
  });
  const [collectionForm, setCollectionForm] = useState({
    title: "",
    zeitraum: "",
    ort: "",
    federfuehrung: "",
    beschreibung: "",
  });

  const [sectionMode, setSectionMode] = useState<null | "license" | "license-remove" | "vehicle" | "vehicle-remove" | "weapon" | "weapon-remove" | "charge" | "charge-remove" | "entry">(null);
  const [selectedLicenseId, setSelectedLicenseId] = useState(LICENSE_OPTIONS[0]?.id ?? "");
  const [selectedWeaponTypeId, setSelectedWeaponTypeId] = useState(WEAPON_TYPE_OPTIONS[0]?.id ?? "");
  const [weaponSerialInput, setWeaponSerialInput] = useState("");
  const [selectedChargeId, setSelectedChargeId] = useState(CHARGE_OPTIONS[0]?.id ?? "");
  const [selectedRegisterVehicleId, setSelectedRegisterVehicleId] = useState("");
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [entryForm, setEntryForm] = useState({
    type: "Straftaten" as AktenEntryType,
    title: "",
    creator: "",
    sentence: "",
    notes: "",
  });
  const [selectedAttachedLicenseId, setSelectedAttachedLicenseId] = useState("");
  const [selectedAttachedWeaponId, setSelectedAttachedWeaponId] = useState("");
  const [selectedAttachedChargeId, setSelectedAttachedChargeId] = useState("");
  const [selectedAttachedVehicleId, setSelectedAttachedVehicleId] = useState("");

  const selectedRecord = useMemo(
    () => records.find((record) => record.id === selectedId) ?? null,
    [records, selectedId]
  );

  const selectedEntry = useMemo(() => {
    if (!selectedRecord || selectedRecord.kind !== "personenakte" || !selectedRecord.person || !selectedEntryId) {
      return null;
    }
    return selectedRecord.person.eintraege.find((entry) => entry.id === selectedEntryId) ?? null;
  }, [selectedRecord, selectedEntryId]);

  const personVehicles = useMemo(() => {
    if (!selectedRecord || selectedRecord.kind !== "personenakte") return [] as KfzRecord[];
    return kfzRecords.filter((record) => record.assignedPersonAkteId === selectedRecord.id);
  }, [kfzRecords, selectedRecord]);

  const availableRegisterVehicles = useMemo(() => {
    if (!selectedRecord || selectedRecord.kind !== "personenakte") return [] as KfzRecord[];
    return kfzRecords.filter((record) => !record.assignedPersonAkteId);
  }, [kfzRecords, selectedRecord]);


function openCreatePersonRecord() {
  setPersonForm({
    vorNachname: "",
    geburtsdatum: "",
    alias: "",
    telefon: "",
    groesse: "",
    augenfarbe: "",
    haarfarbe: "",
    geschlecht: "M",
  });
  setCreateMode("personenakte");
}

function openEditPersonRecord() {
  if (!selectedRecord || selectedRecord.kind !== "personenakte" || !selectedRecord.person) return;

  setPersonForm({
    vorNachname: selectedRecord.person.vorNachname,
    geburtsdatum: selectedRecord.person.geburtsdatum === "-" ? "" : selectedRecord.person.geburtsdatum,
    alias: selectedRecord.person.alias === "-" ? "" : selectedRecord.person.alias,
    telefon: selectedRecord.person.telefon === "-" ? "" : selectedRecord.person.telefon,
    groesse: selectedRecord.person.groesse === "-" ? "" : selectedRecord.person.groesse,
    augenfarbe: selectedRecord.person.augenfarbe === "-" ? "" : selectedRecord.person.augenfarbe,
    haarfarbe: selectedRecord.person.haarfarbe === "-" ? "" : selectedRecord.person.haarfarbe,
    geschlecht: selectedRecord.person.geschlecht || "M",
  });
  setCreateMode("personenakte-bearbeiten");
}


  const visibleRecords = useMemo(() => {
    const term = search.trim().toLowerCase();
    return records.filter((record) => {
      const scopeMatch = scope === "alle" ? true : record.kind === scope;
      const searchMatch = !term
        ? true
        : record.searchable.some((value) => value.includes(term)) ||
          record.title.toLowerCase().includes(term) ||
          record.status.toLowerCase().includes(term);
      return scopeMatch && searchMatch;
    });
  }, [records, scope, search]);

  useEffect(() => {
    setSelectedEntryId(null);
    setSectionMode(null);
  }, [selectedId]);

  useEffect(() => {
    if (!selectedRecord || selectedRecord.kind !== "personenakte" || !selectedRecord.person) return;
    setSelectedAttachedLicenseId(selectedRecord.person.lizenzen[0]?.id ?? "");
    setSelectedAttachedWeaponId(selectedRecord.person.waffen[0]?.id ?? "");
    setSelectedAttachedChargeId(selectedRecord.person.strafanzeigen[0]?.id ?? "");
    setSelectedAttachedVehicleId(personVehicles[0]?.id ?? "");
  }, [selectedRecord, personVehicles]);

  function updatePersonRecord(updater: (current: PersonenAkteData) => PersonenAkteData) {
    if (!selectedRecord || selectedRecord.kind !== "personenakte" || !selectedRecord.person) return;

    setRecords((prev) =>
      prev.map((record) => {
        if (record.id !== selectedRecord.id || !record.person) return record;
        const updatedPerson = updater(record.person);
        return {
          ...record,
          person: updatedPerson,
          searchable: [
            updatedPerson.vorNachname.toLowerCase(),
            record.id.toLowerCase(),
            updatedPerson.alias.toLowerCase(),
            ...updatedPerson.tags.map((tag) => tag.toLowerCase()),
          ].filter(Boolean),
          lastUpdated: "Heute",
        };
      })
    );
  }

  function openSection(mode: "license" | "license-remove" | "vehicle" | "vehicle-remove" | "weapon" | "weapon-remove" | "charge" | "charge-remove" | "entry") {
    setSectionMode((current) => (current === mode ? null : mode));
  }

  function addSelectedLicense() {
    const template = LICENSE_OPTIONS.find((item) => item.id === selectedLicenseId);
    if (!template) return;
    updatePersonRecord((current) => {
      if (current.lizenzen.some((item) => item.id === template.id)) return current;
      return { ...current, lizenzen: [...current.lizenzen, { ...template }] };
    });
    setSectionMode(null);
  }

  function removeSelectedLicense() {
    if (!selectedAttachedLicenseId) return;
    updatePersonRecord((current) => ({
      ...current,
      lizenzen: current.lizenzen.filter((item) => item.id !== selectedAttachedLicenseId),
    }));
    setSectionMode(null);
  }

  function addSelectedVehicle() {
    if (!selectedRecord || selectedRecord.kind !== "personenakte" || !selectedRegisterVehicleId) return;

    setKfzRecords((prev) =>
      prev.map((record) =>
        record.id === selectedRegisterVehicleId
          ? {
              ...record,
              assignedPersonAkteId: selectedRecord.id,
              halter: selectedRecord.person?.vorNachname ?? record.halter,
            }
          : record
      )
    );

    setSelectedRegisterVehicleId("");
    setSectionMode(null);
  }

  function removeSelectedVehicle() {
    if (!selectedAttachedVehicleId) return;
    setKfzRecords((prev) =>
      prev.map((record) =>
        record.id === selectedAttachedVehicleId
          ? {
              ...record,
              assignedPersonAkteId: null,
              halter: "Unbekannt",
            }
          : record
      )
    );
    setSelectedAttachedVehicleId("");
    setSectionMode(null);
  }

  function addSelectedWeapon() {
    const selectedWeapon = WEAPON_TYPE_OPTIONS.find((item) => item.id === selectedWeaponTypeId);
    if (!selectedWeapon || !weaponSerialInput.trim()) return;

    const normalizedSerial = weaponSerialInput.trim().toUpperCase();

    updatePersonRecord((current) => {
      if (current.waffen.some((item) => item.serial.toUpperCase() === normalizedSerial)) return current;
      return {
        ...current,
        waffen: [
          ...current.waffen,
          {
            id: `wep-${Date.now()}`,
            weapon: selectedWeapon.weapon,
            serial: normalizedSerial,
            status: "Registriert",
          },
        ],
      };
    });

    setWeaponSerialInput("");
    setSelectedWeaponTypeId(WEAPON_TYPE_OPTIONS[0]?.id ?? "");
    setSectionMode(null);
  }

  function removeSelectedWeapon() {
    if (!selectedAttachedWeaponId) return;
    updatePersonRecord((current) => ({
      ...current,
      waffen: current.waffen.filter((item) => item.id !== selectedAttachedWeaponId),
    }));
    setSectionMode(null);
  }

  function addSelectedCharge() {
    const template = CHARGE_OPTIONS.find((item) => item.id === selectedChargeId);
    if (!template) return;
    updatePersonRecord((current) => {
      if (current.strafanzeigen.some((item) => item.id === template.id)) return current;
      return { ...current, strafanzeigen: [...current.strafanzeigen, { ...template }] };
    });
    setSectionMode(null);
  }

  function removeSelectedCharge() {
    if (!selectedAttachedChargeId) return;
    updatePersonRecord((current) => ({
      ...current,
      strafanzeigen: current.strafanzeigen.filter((item) => item.id !== selectedAttachedChargeId),
    }));
    setSectionMode(null);
  }

  function addEntryRecord() {
    if (!entryForm.title.trim()) return;
    const newEntry: AktenEntry = {
      id: `AE-${Date.now()}`,
      type: entryForm.type,
      title: entryForm.title.trim(),
      creator: entryForm.creator.trim() || "Unbekannt",
      sentence: entryForm.sentence.trim() || "—",
      date: new Date().toLocaleString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      notes: entryForm.notes.trim() || "—",
    };
    updatePersonRecord((current) => ({ ...current, eintraege: [newEntry, ...current.eintraege] }));
    setEntryForm({ type: "Straftaten", title: "", creator: "", sentence: "", notes: "" });
    setSectionMode(null);
  }

function savePersonRecord() {
  if (!personForm.vorNachname.trim()) return;

  if (createMode === "personenakte-bearbeiten" && selectedRecord?.kind === "personenakte" && selectedRecord.person) {
    const normalizedName = personForm.vorNachname.trim();

    const previousName = selectedRecord.person.vorNachname;

    setRecords((prev) =>
      prev.map((record) => {
        if (record.id !== selectedRecord.id || !record.person) return record;

        return {
          ...record,
          title: normalizedName,
          status: record.status,
          lastUpdated: "Gerade bearbeitet",
          searchable: [
            normalizedName.toLowerCase(),
            record.id.toLowerCase(),
            personForm.alias.trim().toLowerCase(),
          ].filter(Boolean),
          person: {
            ...record.person,
            imageLabel: normalizedName.slice(0, 2).toUpperCase(),
            vorNachname: normalizedName,
            geburtsdatum: personForm.geburtsdatum.trim() || "-",
            alias: personForm.alias.trim() || "-",
            telefon: personForm.telefon.trim() || "-",
            groesse: personForm.groesse.trim() || "-",
            augenfarbe: personForm.augenfarbe.trim() || "-",
            haarfarbe: personForm.haarfarbe.trim() || "-",
            geschlecht: personForm.geschlecht,
          },
        };
      })
    );

    setKfzRecords((prev) =>
      prev.map((record) => {
        if (record.assignedPersonAkteId === selectedRecord.id) {
          return { ...record, halter: normalizedName };
        }
        if (!record.assignedPersonAkteId && (record.halter.toLowerCase() === normalizedName.toLowerCase() || record.halter.toLowerCase() === previousName.toLowerCase())) {
          return { ...record, assignedPersonAkteId: selectedRecord.id, halter: normalizedName };
        }
        return record;
      })
    );

    setCreateMode(null);
    return;
  }

  const id = `CPN-${Date.now()}`;
  const normalizedName = personForm.vorNachname.trim();

  const newRecord: AktenRecord = {
    id,
    kind: "personenakte",
    title: normalizedName,
    status: "offen",
    lastUpdated: "Gerade eben",
    searchable: [
      normalizedName.toLowerCase(),
      id.toLowerCase(),
      personForm.alias.trim().toLowerCase(),
    ].filter(Boolean),
    person: {
      aktennummer: id,
      imageLabel: normalizedName.slice(0, 2).toUpperCase(),
      vorNachname: normalizedName,
      geburtsdatum: personForm.geburtsdatum.trim() || "-",
      alias: personForm.alias.trim() || "-",
      telefon: personForm.telefon.trim() || "-",
      groesse: personForm.groesse.trim() || "-",
      augenfarbe: personForm.augenfarbe.trim() || "-",
      haarfarbe: personForm.haarfarbe.trim() || "-",
      geschlecht: personForm.geschlecht,
      tags: ["offen"],
      lizenzen: [],
      waffen: [],
      verkehrspunkte: 0,
      strafanzeigen: [],
      fahrzeuge: [],
      eintraege: [],
    },
  };

  setRecords((prev) => [newRecord, ...prev]);
  setKfzRecords((prev) =>
    prev.map((record) =>
      !record.assignedPersonAkteId && record.halter.toLowerCase() === normalizedName.toLowerCase()
        ? { ...record, assignedPersonAkteId: id, halter: normalizedName }
        : record
    )
  );
  setSelectedId(id);
  setCreateMode(null);
  setPersonForm({
    vorNachname: "",
    geburtsdatum: "",
    alias: "",
    telefon: "",
    groesse: "",
    augenfarbe: "",
    haarfarbe: "",
    geschlecht: "M",
  });
}

function saveCollectionRecord() {
    if (!collectionForm.title.trim()) return;
    const id = `SAM-${Date.now()}`;
    const newRecord: AktenRecord = {
      id,
      kind: "sammelakte",
      title: collectionForm.title.trim(),
      status: "aktiv",
      lastUpdated: "Gerade eben",
      searchable: [collectionForm.title.trim().toLowerCase(), id.toLowerCase(), collectionForm.ort.trim().toLowerCase()].filter(Boolean),
      collection: {
        aktennummer: id,
        zeitraum: collectionForm.zeitraum.trim() || "-",
        ort: collectionForm.ort.trim() || "-",
        federfuehrung: collectionForm.federfuehrung.trim() || "-",
        beschreibung: collectionForm.beschreibung.trim() || "Noch keine Beschreibung hinterlegt.",
        beteiligte: [],
        tags: ["sammelakte"],
        verknuepfungen: [],
        letzteMassnahme: "Noch keine Maßnahmen hinterlegt",
      },
    };

    setRecords((prev) => [newRecord, ...prev]);
    setSelectedId(id);
    setCreateMode(null);
    setCollectionForm({ title: "", zeitraum: "", ort: "", federfuehrung: "", beschreibung: "" });
  }

  if (createMode === "personenakte" || createMode === "personenakte-bearbeiten") {
    return (
      <AppShell breadcrumb={createMode === "personenakte-bearbeiten" ? "Bitterhafen CopLink / Akten / Personenakte bearbeiten" : "Bitterhafen CopLink / Akten / Neue Akte"} title={createMode === "personenakte-bearbeiten" ? "Personenakte bearbeiten" : "Neue Personenakte"}>
        <div className="rounded-2xl border border-white/8 bg-black/20 p-5">
          <p className="max-w-3xl text-sm text-white/60">
{createMode === "personenakte-bearbeiten" ? "Hier bearbeitest du die Grunddaten der bestehenden Personenakte. Spätere Register-Verknüpfungen bleiben dabei erhalten." : "V1-Prototyp: Dieses Formular legt eine neue Personenakte lokal im Frontend an. Die echte Datenbankanbindung folgt später."}
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Vor- und Nachname", "vorNachname"],
              ["Geburtsdatum", "geburtsdatum"],
              ["Alias", "alias"],
              ["Telefonnummer", "telefon"],
              ["Größe", "groesse"],
              ["Augenfarbe", "augenfarbe"],
              ["Haarfarbe", "haarfarbe"],
            ].map(([label, key]) => (
              <label key={key} className="block">
                <span className="mb-2 block text-sm font-medium text-white/70">{label}</span>
                <input
                  type="text"
                  value={personForm[key as keyof typeof personForm] as string}
                  onChange={(event) =>
                    setPersonForm((prev) => ({ ...prev, [key]: event.target.value }))
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none focus:border-red-400/40"
                />
              </label>
            ))}

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/70">Geschlecht</span>
              <select
                value={personForm.geschlecht}
                onChange={(event) => setPersonForm((prev) => ({ ...prev, geschlecht: event.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none focus:border-red-400/40"
              >
                <option value="M">M</option>
                <option value="W">W</option>
                <option value="D">D</option>
              </select>
            </label>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => setCreateMode(null)} className="ui-btn ui-btn-ghost">Abbrechen</button>
            <button onClick={savePersonRecord} className="ui-btn ui-btn-red">{createMode === "personenakte-bearbeiten" ? "Änderungen speichern" : "Akte speichern"}</button>
          </div>
        </div>
      </AppShell>
    );
  }

  if (createMode === "sammelakte") {
    return (
      <AppShell breadcrumb="Bitterhafen CopLink / Akten / Neue Sammelakte" title="Neue Sammelakte">
        <div className="rounded-2xl border border-white/8 bg-black/20 p-5">
          <p className="max-w-3xl text-sm text-white/60">
            Sammelakten bündeln mehrere Personen, Hinweise und Vorfälle in einer übergeordneten Akte.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Titel", "title"],
              ["Zeitraum", "zeitraum"],
              ["Ort / Bereich", "ort"],
              ["Federführender Officer", "federfuehrung"],
            ].map(([label, key]) => (
              <label key={key} className="block">
                <span className="mb-2 block text-sm font-medium text-white/70">{label}</span>
                <input
                  type="text"
                  value={collectionForm[key as keyof typeof collectionForm] as string}
                  onChange={(event) =>
                    setCollectionForm((prev) => ({ ...prev, [key]: event.target.value }))
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none focus:border-red-400/40"
                />
              </label>
            ))}
            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-white/70">Sachverhalt / Beschreibung</span>
              <textarea
                value={collectionForm.beschreibung}
                onChange={(event) => setCollectionForm((prev) => ({ ...prev, beschreibung: event.target.value }))}
                className="min-h-[140px] w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none focus:border-red-400/40"
              />
            </label>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => setCreateMode(null)} className="ui-btn ui-btn-ghost">Abbrechen</button>
            <button onClick={saveCollectionRecord} className="ui-btn ui-btn-red-alt">Sammelakte speichern</button>
          </div>
        </div>
      </AppShell>
    );
  }

  if (selectedEntry && selectedRecord?.kind === "personenakte" && selectedRecord.person) {
    return (
      <AppShell
        breadcrumb="Bitterhafen CopLink / Akten / Personenakte / Eintrag"
        title={selectedEntry.id}
        actions={
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setSelectedEntryId(null)} className="ui-btn ui-btn-ghost">Zurück zur Akte</button>
          </div>
        }
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <InfoCard label="Eintragsnummer" value={selectedEntry.id} />
          <InfoCard label="Kategorie" value={selectedEntry.type} />
          <InfoCard label="Titel" value={selectedEntry.title || "---"} />
          <InfoCard label="Ersteller" value={selectedEntry.creator} />
          <InfoCard label="Strafe" value={selectedEntry.sentence} />
          <InfoCard label="Datum" value={selectedEntry.date} />
        </div>
        <div className="mt-5 rounded-2xl border border-white/8 bg-white/[0.03] p-5">
          <SectionTitle title="Sonstiges / Vermerk" />
          <p className="text-white/75">{selectedEntry.notes || "—"}</p>
        </div>
      </AppShell>
    );
  }

  if (selectedRecord?.kind === "personenakte" && selectedRecord.person) {
    const person = selectedRecord.person;
    const visibleEntries = entryFilter === "Alle" ? person.eintraege : person.eintraege.filter((entry) => entry.type === entryFilter);

    return (
      <AppShell
        breadcrumb="Bitterhafen CopLink / Akten / Personenakte"
        title={person.vorNachname}
        actions={
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setSelectedId(null)} className="ui-btn ui-btn-ghost">Zurück</button>
            <button onClick={openEditPersonRecord} className="ui-btn ui-btn-red">Akte bearbeiten</button>
          </div>
        }
      >
        {person.sharedBy ? (
          <div className="mb-5 flex items-center gap-3 text-sm text-white/65">
            <span>Diese Akte wird geteilt von:</span>
            <StatusBadge text={person.sharedBy} />
          </div>
        ) : null}

        <div className="grid gap-5 xl:grid-cols-[280px_1fr]">
          <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-6">
            <div className="flex aspect-[3/4] items-center justify-center rounded-[24px] border border-dashed border-white/10 bg-black/25">
              <div className="text-center">
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-red-500/18 text-4xl font-black text-red-100">
                  {person.imageLabel}
                </div>
                <p className="mt-4 text-sm text-white/40">Platzhalterbild</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/38">Aktennummer</p>
                <p className="mt-2 font-semibold text-white">{person.aktennummer}</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/38">Tags und wichtige Infos</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {person.tags.map((tag) => (
                    <StatusBadge key={tag} text={tag} />
                  ))}
                  <button className="rounded-full border border-dashed border-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 hover:bg-white/5">+ Tag</button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <InfoCard label="Vor- und Nachname" value={person.vorNachname} />
              <InfoCard label="Geburtsdatum" value={person.geburtsdatum} />
              <InfoCard label="Alias" value={person.alias} />
              <InfoCard label="Telefonnummer" value={person.telefon} />
              <InfoCard label="Größe" value={person.groesse} />
              <InfoCard label="Augenfarbe" value={person.augenfarbe} />
              <InfoCard label="Haarfarbe" value={person.haarfarbe} />
              <InfoCard label="Geschlecht" value={person.geschlecht} />
            </div>

            <div className="grid gap-5 xl:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                <SectionTitle
                  title="Lizenzen"
                  action={
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => openSection("license")} className="ui-btn ui-btn-red">Lizenz hinzufügen</button>
                      <button onClick={() => openSection("license-remove")} className="ui-btn ui-btn-ghost">Lizenz entfernen</button>
                    </div>
                  }
                />
                {sectionMode === "license" ? (
                  <div className="mb-4 rounded-2xl border border-white/8 bg-black/20 p-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="min-w-[280px] flex-1">
                        <FancySelect
                          value={selectedLicenseId}
                          onChange={setSelectedLicenseId}
                          options={LICENSE_OPTIONS.map((license) => ({ value: license.id, label: `${license.name} · ${license.aussteller}` }))}
                        />
                      </div>
                      <button onClick={addSelectedLicense} className="ui-btn ui-btn-red">Auswahl übernehmen</button>
                    </div>
                  </div>
                ) : null}
                {sectionMode === "license-remove" ? (
                  <div className="mb-4 rounded-2xl border border-white/8 bg-black/20 p-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="min-w-[280px] flex-1">
                        <FancySelect
                          value={selectedAttachedLicenseId}
                          onChange={setSelectedAttachedLicenseId}
                          options={person.lizenzen.map((license) => ({ value: license.id, label: `${license.name} · ${license.nummer}` }))}
                          placeholder={person.lizenzen.length ? 'Lizenz auswählen' : 'Keine Lizenz hinterlegt'}
                        />
                      </div>
                      <button onClick={removeSelectedLicense} className="ui-btn ui-btn-ghost">Auswahl entfernen</button>
                    </div>
                  </div>
                ) : null}
                <div className="overflow-hidden rounded-2xl border border-white/8">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/[0.05] text-white/55">
                      <tr>
                        <th className="px-4 py-3 font-medium">Name</th>
                        <th className="px-4 py-3 font-medium">Aussteller</th>
                        <th className="px-4 py-3 font-medium">Nummer</th>
                      </tr>
                    </thead>
                    <tbody className="bg-black/10 text-white/90">
                      {person.lizenzen.length ? person.lizenzen.map((license) => (
                        <tr key={license.id} className="border-t border-white/6">
                          <td className="px-4 py-3">{license.name}</td>
                          <td className="px-4 py-3">{license.aussteller}</td>
                          <td className="px-4 py-3">{license.nummer}</td>
                        </tr>
                      )) : (
                        <tr className="border-t border-white/6"><td className="px-4 py-4 text-white/45" colSpan={3}>Keine Lizenzen hinterlegt</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                <SectionTitle
                  title="Waffen"
                  action={
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => openSection("weapon")} className="ui-btn ui-btn-red">Waffe registrieren</button>
                      <button onClick={() => openSection("weapon-remove")} className="ui-btn ui-btn-ghost">Waffe abmelden</button>
                    </div>
                  }
                />
                {sectionMode === "weapon" ? (
                  <div className="mb-4 rounded-2xl border border-white/8 bg-black/20 p-4">
                    <div className="grid gap-3 xl:grid-cols-[minmax(260px,1fr)_240px_auto]">
                      <FancySelect
                        value={selectedWeaponTypeId}
                        onChange={setSelectedWeaponTypeId}
                        options={WEAPON_TYPE_OPTIONS.map((weapon) => ({ value: weapon.id, label: weapon.weapon }))}
                      />
                      <input
                        value={weaponSerialInput}
                        onChange={(event) => setWeaponSerialInput(event.target.value)}
                        placeholder="Seriennummer eingeben"
                        className="ui-input"
                      />
                      <button onClick={addSelectedWeapon} className="ui-btn ui-btn-red">Auswahl übernehmen</button>
                    </div>
                  </div>
                ) : null}
                {sectionMode === "weapon-remove" ? (
                  <div className="mb-4 rounded-2xl border border-white/8 bg-black/20 p-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="min-w-[280px] flex-1">
                        <FancySelect
                          value={selectedAttachedWeaponId}
                          onChange={setSelectedAttachedWeaponId}
                          options={person.waffen.map((weapon) => ({ value: weapon.id, label: `${weapon.weapon} · ${weapon.serial}` }))}
                          placeholder={person.waffen.length ? 'Waffe auswählen' : 'Keine Waffe registriert'}
                        />
                      </div>
                      <button onClick={removeSelectedWeapon} className="ui-btn ui-btn-ghost">Auswahl entfernen</button>
                    </div>
                  </div>
                ) : null}
                <div className="overflow-hidden rounded-2xl border border-white/8">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/[0.05] text-white/55">
                      <tr>
                        <th className="px-4 py-3 font-medium">Waffe</th>
                        <th className="px-4 py-3 font-medium">Seriennummer</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-black/10 text-white/90">
                      {person.waffen.length ? person.waffen.map((weapon) => (
                        <tr key={weapon.id} className="border-t border-white/6">
                          <td className="px-4 py-3">{weapon.weapon}</td>
                          <td className="px-4 py-3">{weapon.serial}</td>
                          <td className="px-4 py-3">{weapon.status}</td>
                        </tr>
                      )) : (
                        <tr className="border-t border-white/6"><td className="px-4 py-4 text-white/45" colSpan={3}>Noch keine Waffen verknüpft</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="grid gap-5 xl:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                <SectionTitle
                  title="Verkehrspunkte"
                  action={
                    <div className="flex gap-2">
                      <button onClick={() => updatePersonRecord((current) => ({ ...current, verkehrspunkte: Math.max(0, current.verkehrspunkte - 1) }))} className="ui-btn ui-btn-ghost px-3">−</button>
                      <button onClick={() => updatePersonRecord((current) => ({ ...current, verkehrspunkte: current.verkehrspunkte + 1 }))} className="ui-btn ui-btn-red px-3">+</button>
                    </div>
                  }
                />
                <div className="rounded-2xl border border-white/8 bg-black/18 p-5">
                  <p className="text-5xl font-black text-white">{person.verkehrspunkte}</p>
                  <p className="mt-2 text-sm text-white/55">Aktueller Punktestand der Person</p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                <SectionTitle
                  title="Laufende Strafanzeigen"
                  action={
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => openSection("charge")} className="ui-btn ui-btn-red">Strafanzeige verknüpfen</button>
                      <button onClick={() => openSection("charge-remove")} className="ui-btn ui-btn-ghost">Strafanzeige entknüpfen</button>
                    </div>
                  }
                />
                {sectionMode === "charge" ? (
                  <div className="mb-4 rounded-2xl border border-white/8 bg-black/20 p-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="min-w-[280px] flex-1">
                        <FancySelect
                          value={selectedChargeId}
                          onChange={setSelectedChargeId}
                          options={CHARGE_OPTIONS.map((charge) => ({ value: charge.id, label: `${charge.taeter} · ${charge.status}` }))}
                        />
                      </div>
                      <button onClick={addSelectedCharge} className="ui-btn ui-btn-red">Auswahl übernehmen</button>
                    </div>
                  </div>
                ) : null}
                {sectionMode === "charge-remove" ? (
                  <div className="mb-4 rounded-2xl border border-white/8 bg-black/20 p-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="min-w-[280px] flex-1">
                        <FancySelect
                          value={selectedAttachedChargeId}
                          onChange={setSelectedAttachedChargeId}
                          options={person.strafanzeigen.map((charge) => ({ value: charge.id, label: `${charge.taeter} · ${charge.status}` }))}
                          placeholder={person.strafanzeigen.length ? 'Strafanzeige auswählen' : 'Keine Strafanzeige verknüpft'}
                        />
                      </div>
                      <button onClick={removeSelectedCharge} className="ui-btn ui-btn-ghost">Auswahl entfernen</button>
                    </div>
                  </div>
                ) : null}
                <div className="overflow-hidden rounded-2xl border border-white/8">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/[0.05] text-white/55">
                      <tr>
                        <th className="px-4 py-3 font-medium">Von</th>
                        <th className="px-4 py-3 font-medium">Täter</th>
                        <th className="px-4 py-3 font-medium">Officer</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-black/10 text-white/90">
                      {person.strafanzeigen.length ? person.strafanzeigen.map((charge) => (
                        <tr key={charge.id} className="border-t border-white/6">
                          <td className="px-4 py-3">{charge.from}</td>
                          <td className="px-4 py-3">{charge.taeter}</td>
                          <td className="px-4 py-3">{charge.officer}</td>
                          <td className="px-4 py-3"><StatusBadge text={charge.status} /></td>
                        </tr>
                      )) : (
                        <tr className="border-t border-white/6"><td className="px-4 py-4 text-white/45" colSpan={4}>Keine laufenden Strafanzeigen</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
              <SectionTitle
                title="Fahrzeuge"
                action={
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => openSection("vehicle")} className="ui-btn ui-btn-red">Fahrzeug anmelden</button>
                    <button onClick={() => openSection("vehicle-remove")} className="ui-btn ui-btn-ghost">Fahrzeug abmelden</button>
                  </div>
                }
              />
              {sectionMode === "vehicle" ? (
                <div className="mb-4 rounded-2xl border border-white/8 bg-black/20 p-4">
                  <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                    <div className="min-w-[280px]">
                      <FancySelect
                        value={selectedRegisterVehicleId}
                        onChange={setSelectedRegisterVehicleId}
                        options={availableRegisterVehicles.map((vehicle) => ({ value: vehicle.id, label: `${vehicle.kennzeichen} · ${vehicle.modell} · ${vehicle.halter}` }))}
                        placeholder={availableRegisterVehicles.length ? 'Fahrzeug aus KFZ-Register auswählen' : 'Kein freies Fahrzeug im KFZ-Register'}
                      />
                    </div>
                    <button onClick={addSelectedVehicle} className="ui-btn ui-btn-red">Auswahl übernehmen</button>
                  </div>
                  <div className="mt-3 rounded-xl border border-white/8 bg-black/20 px-4 py-3 text-sm text-white/65">
                    Es werden nur Fahrzeuge angezeigt, die im KFZ-Register vorhanden und noch keiner Personenakte fest zugewiesen sind.
                  </div>
                </div>
              ) : null}
              {sectionMode === "vehicle-remove" ? (
                <div className="mb-4 rounded-2xl border border-white/8 bg-black/20 p-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="min-w-[280px] flex-1">
                      <FancySelect
                        value={selectedAttachedVehicleId}
                        onChange={setSelectedAttachedVehicleId}
                        options={personVehicles.map((vehicle) => ({ value: vehicle.id, label: `${vehicle.kennzeichen} · ${vehicle.modell}` }))}
                        placeholder={personVehicles.length ? 'Fahrzeug auswählen' : 'Kein Fahrzeug zugeordnet'}
                      />
                    </div>
                    <button onClick={removeSelectedVehicle} className="ui-btn ui-btn-ghost">Auswahl entfernen</button>
                  </div>
                </div>
              ) : null}
              <div className="overflow-hidden rounded-2xl border border-white/8">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/[0.05] text-white/55">
                    <tr>
                      <th className="px-4 py-3 font-medium">Kennzeichen</th>
                      <th className="px-4 py-3 font-medium">Fahrzeugtyp</th>
                      <th className="px-4 py-3 font-medium">Modell</th>
                      <th className="px-4 py-3 font-medium">HU</th>
                      <th className="px-4 py-3 font-medium">Versicherung</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-black/10 text-white/90">
                    {personVehicles.length ? personVehicles.map((vehicle) => (
                      <tr key={vehicle.id} className="border-t border-white/6">
                        <td className="px-4 py-3">{vehicle.kennzeichen}</td>
                        <td className="px-4 py-3">{vehicle.fahrzeugtyp}</td>
                        <td className="px-4 py-3">{vehicle.modell}</td>
                        <td className="px-4 py-3">{formatHuDisplay(vehicle)}</td>
                        <td className="px-4 py-3">{vehicle.versicherung}</td>
                        <td className="px-4 py-3"><StatusBadge text={vehicle.status} /></td>
                      </tr>
                    )) : (
                      <tr className="border-t border-white/6"><td className="px-4 py-4 text-white/45" colSpan={6}>Keine Fahrzeuge zugeordnet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-[28px] font-bold text-white">Akteneinträge anzeigen</h2>
                <button onClick={() => openSection("entry")} className="ui-btn ui-btn-red">Eintrag hinzufügen</button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {(["Alle", "Straftaten", "Gangstraftaten", "Bußgelder und Normales"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setEntryFilter(filter)}
                    className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${entryFilter === filter ? "border-red-400/30 bg-red-500/12 text-red-100" : "border-white/10 text-white/65 hover:bg-white/8"}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              {sectionMode === "entry" ? (
                <div className="mt-4 rounded-2xl border border-white/8 bg-black/20 p-4">
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    <FancySelect
                      value={entryForm.type}
                      onChange={(value) => setEntryForm((prev) => ({ ...prev, type: value as AktenEntryType }))}
                      options={[
                        { value: "Straftaten", label: "Straftaten" },
                        { value: "Gangstraftaten", label: "Gangstraftaten" },
                        { value: "Bußgelder und Normales", label: "Bußgelder und Normales" },
                      ]}
                    />
                    <input value={entryForm.title} onChange={(event) => setEntryForm((prev) => ({ ...prev, title: event.target.value }))} placeholder="Titel" className="rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25" />
                    <input value={entryForm.creator} onChange={(event) => setEntryForm((prev) => ({ ...prev, creator: event.target.value }))} placeholder="Ersteller" className="rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25" />
                    <input value={entryForm.sentence} onChange={(event) => setEntryForm((prev) => ({ ...prev, sentence: event.target.value }))} placeholder="Strafe" className="rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 md:col-span-2 xl:col-span-1" />
                    <input value={entryForm.notes} onChange={(event) => setEntryForm((prev) => ({ ...prev, notes: event.target.value }))} placeholder="Sonstiges" className="rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 md:col-span-2" />
                  </div>
                  <div className="mt-3 flex gap-3">
                    <button onClick={() => setSectionMode(null)} className="ui-btn ui-btn-ghost">Abbrechen</button>
                    <button onClick={addEntryRecord} className="ui-btn ui-btn-red">Eintrag speichern</button>
                  </div>
                </div>
              ) : null}
              <div className="mt-5 overflow-hidden rounded-2xl border border-white/8">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/[0.05] text-white/55">
                    <tr>
                      <th className="px-4 py-3 font-medium">Eintragsnummer</th>
                      <th className="px-4 py-3 font-medium">Titel</th>
                      <th className="px-4 py-3 font-medium">Ersteller</th>
                      <th className="px-4 py-3 font-medium">Strafe</th>
                      <th className="px-4 py-3 font-medium">Datum</th>
                      <th className="px-4 py-3 font-medium">Sonstiges</th>
                    </tr>
                  </thead>
                  <tbody className="bg-black/10 text-white/90">
                    {visibleEntries.length ? visibleEntries.map((entry) => (
                      <tr key={entry.id} className="border-t border-white/6">
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <button type="button" onClick={() => setSelectedEntryId(entry.id)} className="record-link">{entry.id}</button>
                            <StatusBadge text={entry.type === "Straftaten" ? "Straftat" : entry.type} />
                          </div>
                        </td>
                        <td className="px-4 py-3">{entry.title || "---"}</td>
                        <td className="px-4 py-3">{entry.creator}</td>
                        <td className="px-4 py-3">{entry.sentence}</td>
                        <td className="px-4 py-3">{entry.date}</td>
                        <td className="px-4 py-3">{entry.notes}</td>
                      </tr>
                    )) : (
                      <tr className="border-t border-white/6"><td className="px-4 py-4 text-white/45" colSpan={6}>Keine Einträge für diesen Filter vorhanden</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  if (selectedRecord?.kind === "sammelakte" && selectedRecord.collection) {
    const collection = selectedRecord.collection;
    return (
      <AppShell
        breadcrumb="Bitterhafen CopLink / Akten / Sammelakte"
        title={selectedRecord.title}
        actions={
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setSelectedId(null)} className="ui-btn ui-btn-ghost">Zurück</button>
            <button className="ui-btn ui-btn-red">Sammelakte bearbeiten</button>
          </div>
        }
      >
        {collection.sharedBy ? (
          <div className="mb-5 flex items-center gap-3 text-sm text-white/65">
            <span>Diese Sammelakte wird geteilt von:</span>
            <StatusBadge text={collection.sharedBy} />
          </div>
        ) : null}
        <div className="grid gap-5 lg:grid-cols-3">
          <InfoCard label="Aktennummer" value={collection.aktennummer} />
          <InfoCard label="Zeitraum" value={collection.zeitraum} />
          <InfoCard label="Ort / Bereich" value={collection.ort} />
          <InfoCard label="Federführung" value={collection.federfuehrung} />
          <InfoCard label="Letzte Maßnahme" value={collection.letzteMassnahme} />
        </div>
        <div className="mt-5 rounded-2xl border border-white/8 bg-white/[0.03] p-5">
          <SectionTitle title="Sachverhalt" />
          <p className="max-w-4xl leading-7 text-white/75">{collection.beschreibung}</p>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
            <SectionTitle title="Beteiligte Personen" />
            <div className="space-y-3">
              {collection.beteiligte.length ? collection.beteiligte.map((item) => (
                <div key={item} className="rounded-xl border border-white/8 bg-black/18 px-4 py-3 text-sm text-white">{item}</div>
              )) : <div className="rounded-xl border border-white/8 bg-black/18 px-4 py-3 text-sm text-white/45">Noch keine beteiligten Personen hinterlegt</div>}
            </div>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
            <SectionTitle title="Verknüpfungen" />
            <div className="space-y-3">
              {collection.verknuepfungen.length ? collection.verknuepfungen.map((item) => (
                <div key={item} className="rounded-xl border border-white/8 bg-black/18 px-4 py-3 text-sm text-white">{item}</div>
              )) : <div className="rounded-xl border border-white/8 bg-black/18 px-4 py-3 text-sm text-white/45">Noch keine Verknüpfungen vorhanden</div>}
            </div>
          </div>
        </div>
        <div className="mt-5 rounded-2xl border border-white/8 bg-white/[0.03] p-5">
          <SectionTitle title="Tags" />
          <div className="flex flex-wrap gap-2">
            {collection.tags.map((tag) => <StatusBadge key={tag} text={tag} />)}
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell
      breadcrumb="Bitterhafen CopLink / Akten"
      title="Akten"
      actions={
        <button className="ui-btn ui-btn-red">
          Aktenübersicht
        </button>
      }
    >
      <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-white/60">
        Akten V7 bereitet echte Verknüpfungen vor. Lizenzen, Fahrzeuge, Waffen, Strafanzeigen und Akteneinträge lassen sich bereits lokal auswählen und zur Personenakte hinzufügen. Die echte Datenbank folgt später.
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button onClick={openCreatePersonRecord} className="ui-btn ui-btn-red">Akte hinzufügen</button>
        <button onClick={() => setCreateMode("sammelakte")} className="ui-btn ui-btn-red-alt">Sammelakte</button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {[
          ["alle", "Alle"],
          ["personenakte", "Personenakten"],
          ["sammelakte", "Sammelakten"],
        ].map(([value, label]) => (
          <button
            key={value}
            onClick={() => setScope(value as "alle" | AktenRecordType)}
            className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${scope === value ? "border-red-400/30 bg-red-500/12 text-red-100" : "border-white/10 text-white/65 hover:bg-white/8"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-[180px_1fr]">
        <div className="flex items-center gap-3 text-sm text-white/60">
          <span>Show</span>
          <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-white">{visibleRecords.length}</div>
          <span>Einträge</span>
        </div>
        <div className="md:justify-self-end md:w-[320px]">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Akte, Name oder Aktennummer suchen..."
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-red-400/40"
          />
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-white/8">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.05] text-white/55">
            <tr>
              <th className="px-4 py-4 font-medium">Aktennummer</th>
              <th className="px-4 py-4 font-medium">Name / Sammelakte</th>
              <th className="px-4 py-4 font-medium">Typ</th>
              <th className="px-4 py-4 font-medium">Status</th>
              <th className="px-4 py-4 font-medium">Letzte Änderung</th>
              <th className="px-4 py-4 font-medium">Aktion</th>
            </tr>
          </thead>
          <tbody className="bg-black/15 text-white/90">
            {visibleRecords.length ? visibleRecords.map((record) => (
              <tr key={record.id} className="border-t border-white/6">
                <td className="px-4 py-4">{record.id}</td>
                <td className="px-4 py-4">
                  <button
                    type="button"
                    onClick={() => setSelectedId(record.id)}
                    className="record-link text-left font-semibold text-white transition hover:text-red-200 hover:underline hover:underline-offset-4"
                  >
                    {record.kind === "personenakte" ? record.person?.vorNachname ?? record.title : record.title}
                  </button>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(record.kind === "personenakte" ? record.person?.tags : record.collection?.tags)?.slice(0, 3).map((tag) => (
                      <StatusBadge key={tag} text={tag} />
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4">{record.kind === "personenakte" ? "Personenakte" : "Sammelakte"}</td>
                <td className="px-4 py-4"><StatusBadge text={record.status} /></td>
                <td className="px-4 py-4 text-white/65">{record.lastUpdated}</td>
                <td className="px-4 py-4">
                  <button onClick={() => setSelectedId(record.id)} className="ui-btn ui-btn-inline">Öffnen</button>
                </td>
              </tr>
            )) : (
              <tr className="border-t border-white/6"><td className="px-4 py-5 text-white/45" colSpan={6}>Keine Akten für diesen Filter gefunden</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}


function KfzRegisterApp() {
  const { aktenRecords, kfzRecords: records, setKfzRecords: setRecords } = useContext(RecordsContext);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<null | "create" | "edit">(null);
  const [form, setForm] = useState<KfzFormState>(getInitialKfzForm());

  const selectedRecord = useMemo(
    () => records.find((record) => record.id === selectedId) ?? null,
    [records, selectedId]
  );

  const ownerOptions = useMemo(() => {
    const personNames = aktenRecords
      .filter((record) => record.kind === "personenakte")
      .map((record) => record.person?.vorNachname ?? record.title)
      .filter(Boolean);
    return ["Unbekannt", ...personNames];
  }, [aktenRecords]);

  const visibleRecords = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return records;
    return records.filter((record) =>
      [record.kennzeichen, record.fahrzeugtyp, record.modell, record.halter, record.status, record.versicherung]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [records, search]);

  const modelOptions = VEHICLE_MODEL_OPTIONS.map((option) => ({
    value: option.id,
    label: `${option.modell} · ${option.fahrzeugtyp}`,
  }));

  const ownerSelectOptions = ownerOptions.map((owner) => ({ value: owner, label: owner }));
  const huSelectOptions = KFZ_HU_STATUS_OPTIONS.map((status) => ({ value: status, label: status }));
  const versicherungSelectOptions = KFZ_VERSICHERUNG_OPTIONS.map((versicherung) => ({ value: versicherung, label: versicherung }));
  const statusSelectOptions = KFZ_STATUS_OPTIONS.map((status) => ({ value: status, label: status }));

  function findMatchingAkteIdByName(name: string) {
    const normalized = name.trim().toLowerCase();
    if (!normalized || normalized === "unbekannt") return null;
    const match = aktenRecords.find(
      (record) => record.kind === "personenakte" && record.person?.vorNachname.toLowerCase() === normalized
    );
    return match?.id ?? null;
  }

  const modelForForm = VEHICLE_MODEL_OPTIONS.find((option) => option.id === form.modellId) ?? VEHICLE_MODEL_OPTIONS[0];

  function openCreate() {
    setMode("create");
    setSelectedId(null);
    setForm(getInitialKfzForm());
  }

  function openEdit(record: KfzRecord) {
    const model = VEHICLE_MODEL_OPTIONS.find((option) => option.modell === record.modell) ?? VEHICLE_MODEL_OPTIONS[0];
    setMode("edit");
    setForm({
      kennzeichen: record.kennzeichen,
      modellId: model?.id ?? VEHICLE_MODEL_OPTIONS[0]?.id ?? "",
      halter: record.halter,
      huStatus: record.huStatus,
      huAblauf: record.huAblauf,
      versicherung: record.versicherung,
      status: record.status,
      notiz: record.notiz,
    });
  }

  function saveRecord() {
    if (!form.kennzeichen.trim()) return;
    const selectedModel = VEHICLE_MODEL_OPTIONS.find((option) => option.id === form.modellId) ?? VEHICLE_MODEL_OPTIONS[0];
    const assignedPersonAkteId = findMatchingAkteIdByName(form.halter);
    const payload: KfzRecord = {
      id: mode === "edit" && selectedRecord ? selectedRecord.id : `kfz-${Date.now()}`,
      kennzeichen: form.kennzeichen.trim().toUpperCase(),
      fahrzeugtyp: selectedModel.fahrzeugtyp,
      modell: selectedModel.modell,
      halter: form.halter,
      assignedPersonAkteId,
      huStatus: form.huStatus,
      huAblauf: form.huAblauf,
      versicherung: form.versicherung,
      status: form.status,
      notiz: form.notiz.trim() || "Kein zusätzlicher Vermerk hinterlegt.",
    };

    setRecords((prev) => {
      if (mode === "edit" && selectedRecord) {
        return prev.map((record) => (record.id === selectedRecord.id ? payload : record));
      }
      return [payload, ...prev];
    });

    setSelectedId(payload.id);
    setMode(null);
  }

  function unregisterRecord(recordId: string) {
    setRecords((prev) => prev.filter((record) => record.id !== recordId));
    if (selectedId === recordId) {
      setSelectedId(null);
    }
  }

  if (mode) {
    return (
      <AppShell
        breadcrumb={`Bitterhafen CopLink / KFZ-Register / ${mode === "create" ? "Fahrzeug registrieren" : "Fahrzeug bearbeiten"}`}
        title={mode === "create" ? "Fahrzeug registrieren" : `Fahrzeug ${selectedRecord?.kennzeichen ?? "bearbeiten"}`}
      >
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
          <p className="mb-5 text-sm text-white/55">
            {mode === "create"
              ? "Registriere hier ein neues Fahrzeug für das KFZ-Register. Kennzeichen wird manuell gepflegt, Modell und Status werden zentral erfasst."
              : "Bearbeite hier die hinterlegten Fahrzeugdaten. Das ist die Grundlage für spätere Verknüpfungen mit Personenakten und Fahndungen."}
          </p>

          <div className="grid gap-5 lg:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-white/60">Kennzeichen</label>
              <input
                value={form.kennzeichen}
                onChange={(event) => setForm((current) => ({ ...current, kennzeichen: event.target.value.toUpperCase() }))}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-red-400/40"
                placeholder="z. B. E-GHGT"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/60">Halter</label>
              <FancySelect value={form.halter} onChange={(value) => setForm((current) => ({ ...current, halter: value }))} options={ownerSelectOptions} placeholder="Halter auswählen" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/60">Modell</label>
              <FancySelect value={form.modellId} onChange={(value) => setForm((current) => ({ ...current, modellId: value }))} options={modelOptions} placeholder="Modell auswählen" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/60">Fahrzeugtyp</label>
              <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">{modelForForm?.fahrzeugtyp ?? "-"}</div>
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/60">HU / TÜV Status</label>
              <FancySelect value={form.huStatus} onChange={(value) => setForm((current) => ({ ...current, huStatus: value as KfzRecord["huStatus"] }))} options={huSelectOptions} placeholder="HU-Status" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/60">HU / TÜV Ablaufdatum</label>
              <input
                type="date"
                value={form.huAblauf}
                onChange={(event) => setForm((current) => ({ ...current, huAblauf: event.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-red-400/40"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/60">Versicherung</label>
              <FancySelect value={form.versicherung} onChange={(value) => setForm((current) => ({ ...current, versicherung: value as KfzRecord["versicherung"] }))} options={versicherungSelectOptions} placeholder="Versicherung" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/60">Status</label>
              <FancySelect value={form.status} onChange={(value) => setForm((current) => ({ ...current, status: value as KfzRecord["status"] }))} options={statusSelectOptions} placeholder="Status" />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm text-white/60">Vermerk / Hinweis</label>
            <textarea
              value={form.notiz}
              onChange={(event) => setForm((current) => ({ ...current, notiz: event.target.value }))}
              className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-red-400/40"
              placeholder="z. B. Bezug zu laufender Ermittlung, gesuchtes Kennzeichen, Halter unklar ..."
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => setMode(null)} className="ui-btn ui-btn-ghost">Abbrechen</button>
            <button onClick={saveRecord} className="ui-btn ui-btn-red">{mode === "create" ? "Fahrzeug registrieren" : "Änderungen speichern"}</button>
          </div>
        </div>
      </AppShell>
    );
  }

  if (selectedRecord) {
    return (
      <AppShell
        breadcrumb="Bitterhafen CopLink / KFZ-Register / Fahrzeugdetail"
        title={`Fahrzeug ${selectedRecord.kennzeichen}`}
        actions={
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setSelectedId(null)} className="ui-btn ui-btn-ghost">Zurück</button>
            <button onClick={() => openEdit(selectedRecord)} className="ui-btn ui-btn-red">Fahrzeug bearbeiten</button>
          </div>
        }
      >
        <div className="grid gap-5 lg:grid-cols-4">
          <InfoCard label="Kennzeichen" value={selectedRecord.kennzeichen} />
          <InfoCard label="Fahrzeugtyp" value={selectedRecord.fahrzeugtyp} />
          <InfoCard label="Modell" value={selectedRecord.modell} />
          <InfoCard label="Halter" value={selectedRecord.halter} />
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-white/38">HU / TÜV</p>
            <div className="mt-3">
              <KfzToneBadge text={formatHuDisplay(selectedRecord)} tone={getHuTone(selectedRecord)} />
            </div>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-white/38">Versicherung</p>
            <div className="mt-3">
              <KfzToneBadge text={selectedRecord.versicherung} tone={getInsuranceTone(selectedRecord.versicherung)} />
            </div>
          </div>
          <InfoCard label="Status" value={selectedRecord.status} />
        </div>

        <div className="mt-5 rounded-2xl border border-white/8 bg-white/[0.03] p-5">
          <SectionTitle title="Vermerk / Hinweis" />
          <p className="max-w-4xl leading-7 text-white/72">{selectedRecord.notiz}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <StatusBadge text={selectedRecord.status} />
            <KfzToneBadge text={selectedRecord.versicherung} tone={getInsuranceTone(selectedRecord.versicherung)} />
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell
      breadcrumb="Bitterhafen CopLink / KFZ-Register"
      title="Kraftfahrzeug Register"
      actions={<button onClick={openCreate} className="ui-btn ui-btn-red">Fahrzeug registrieren</button>}
    >
      <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-white/60">
        KFZ-Register V3 verwaltet Fahrzeuge als eigenes Modul. Kennzeichen, Modell, HU / TÜV, Versicherung, Status und Halter werden zentral gepflegt und mit Personenakten verknüpft, sobald ein passender Halter im Aktensystem existiert.
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-[180px_1fr]">
        <div className="flex items-center gap-3 text-sm text-white/60">
          <span>Show</span>
          <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-white">{visibleRecords.length}</div>
          <span>Einträge</span>
        </div>
        <div className="md:justify-self-end md:w-[320px]">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Kennzeichen, Modell oder Halter suchen..."
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-red-400/40"
          />
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-white/8">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.05] text-white/55">
            <tr>
              <th className="px-4 py-4 font-medium">Kennzeichen</th>
              <th className="px-4 py-4 font-medium">Fahrzeugtyp</th>
              <th className="px-4 py-4 font-medium">Modell</th>
              <th className="px-4 py-4 font-medium">Halter</th>
              <th className="px-4 py-4 font-medium">HU / TÜV</th>
              <th className="px-4 py-4 font-medium">Versicherung</th>
              <th className="px-4 py-4 font-medium">Status</th>
              <th className="px-4 py-4 font-medium">Aktion</th>
              <th className="px-4 py-4 font-medium">Anmeldung</th>
            </tr>
          </thead>
          <tbody className="bg-black/15 text-white/90">
            {visibleRecords.length ? visibleRecords.map((record) => (
              <tr key={record.id} className="border-t border-white/6">
                <td className="px-4 py-4">
                  <button
                    type="button"
                    onClick={() => setSelectedId(record.id)}
                    className="record-link text-left font-semibold text-white transition hover:text-red-200 hover:underline hover:underline-offset-4"
                  >
                    {record.kennzeichen}
                  </button>
                </td>
                <td className="px-4 py-4">{record.fahrzeugtyp}</td>
                <td className="px-4 py-4">{record.modell}</td>
                <td className="px-4 py-4">{record.halter}</td>
                <td className="px-4 py-4">
                  <KfzToneBadge text={formatHuDisplay(record)} tone={getHuTone(record)} />
                </td>
                <td className="px-4 py-4">
                  <KfzToneBadge text={record.versicherung} tone={getInsuranceTone(record.versicherung)} />
                </td>
                <td className="px-4 py-4"><StatusBadge text={record.status} /></td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => setSelectedId(record.id)} className="ui-btn ui-btn-inline">Anzeigen</button>
                    <button onClick={() => { setSelectedId(record.id); openEdit(record); }} className="ui-btn ui-btn-inline">Bearbeiten</button>
                    <button onClick={() => unregisterRecord(record.id)} className="ui-btn ui-btn-ghost">Abmelden</button>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${getOwnerRegistrationTone(record)}`}>
                    {getOwnerRegistrationLabel(record)}
                  </span>
                </td>
              </tr>
            )) : (
              <tr className="border-t border-white/6"><td className="px-4 py-5 text-white/45" colSpan={9}>Keine Fahrzeuge für diese Suche gefunden</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}


function CalculatorApp() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");

  function appendValue(value: string) {
    setExpression((prev) => prev + value);
  }

  function clearValue() {
    setExpression("");
    setResult("0");
  }

  function evaluateExpression() {
    if (!expression.trim()) {
      setResult("0");
      return;
    }

    if (!/^[0-9+\-*/().,\s]+$/.test(expression)) {
      setResult("Fehler");
      return;
    }

    try {
      const normalized = expression.replace(/,/g, ".");
      const value = Function(`"use strict"; return (${normalized})`)();
      setResult(String(value));
    } catch {
      setResult("Fehler");
    }
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key;

      if (/^[0-9]$/.test(key)) {
        event.preventDefault();
        appendValue(key);
        return;
      }

      const mapped: Record<string, string> = {
        "+": "+",
        "-": "-",
        "*": "*",
        "/": "/",
        ".": ".",
        ",": ".",
        "(": "(",
        ")": ")",
      };

      if (mapped[key]) {
        event.preventDefault();
        appendValue(mapped[key]);
        return;
      }

      if (key === "Enter" || key === "=") {
        event.preventDefault();
        evaluateExpression();
        return;
      }

      if (key === "Backspace") {
        event.preventDefault();
        setExpression((prev) => prev.slice(0, -1));
        return;
      }

      if (key === "Escape" || key.toLowerCase() === "c") {
        event.preventDefault();
        clearValue();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expression]);

  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "(",
    ")",
    "C",
    "=",
    "+",
  ];

  return (
    <div className="h-full bg-[#0b0d13] p-4 text-white">
      <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
        <p className="text-xs uppercase tracking-[0.28em] text-red-300/70">Bitterhafen CopLink / Taschenrechner</p>
        <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4">
          <div className="text-sm text-white/50">{expression || "0"}</div>
          <div className="mt-2 text-3xl font-bold">{result}</div>
        </div>

        <div className="mt-3 text-xs text-white/35">NumPad und Tastatur-Eingabe aktiv</div>

        <div className="mt-4 grid grid-cols-4 gap-3">
          {buttons.map((button) => (
            <button
              key={button}
              type="button"
              onClick={() => {
                if (button === "C") {
                  clearValue();
                  return;
                }

                if (button === "=") {
                  evaluateExpression();
                  return;
                }

                appendValue(button);
              }}
              className={`rounded-xl border px-3 py-3 text-center font-semibold transition ${
                button === "="
                  ? "border-red-400/40 bg-red-500/20 hover:bg-red-500/30"
                  : button === "C"
                  ? "border-amber-400/35 bg-amber-500/15 hover:bg-amber-500/22"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              {button}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function renderAppContent(appId: AppId) {
  switch (appId) {
    case "akten":
      return <AktenApp />;

    case "ermittlungen":
      return (
        <AppShell
          breadcrumb="Bitterhafen CopLink / Ermittlungen"
          title="Ermittlungen"
          actions={
            <button className="ui-btn ui-btn-red">
              Tabellenansicht bearbeiten
            </button>
          }
        >
          <div className="flex flex-wrap gap-3">
            <button className="ui-btn ui-btn-red">
              Ermittlung hinzufügen
            </button>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-[180px_1fr]">
            <div className="flex items-center gap-3 text-sm text-white/60">
              <span>Show</span>
              <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-white">10</div>
              <span>entries</span>
            </div>
            <div className="md:justify-self-end md:w-[260px]">
              <SearchInput placeholder="Ermittlung suchen..." />
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-white/8">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.05] text-white/55">
                <tr>
                  <th className="px-4 py-4 font-medium">Name / Sammelakte</th>
                  <th className="px-4 py-4 font-medium">Officer</th>
                  <th className="px-4 py-4 font-medium">Tags</th>
                  <th className="px-4 py-4 font-medium">Aktion</th>
                </tr>
              </thead>
              <tbody className="bg-black/15 text-white/90">
                {[
                  ["Ani Mozrelly Auftrag", "Srna Marinovic", "Geteilt"],
                  ["FIB-IE-38", "Agent Black", "Geteilt"],
                  ["Waffenhandel Ziki Peres", "Agent Bane", "Priorität"],
                ].map(([title, officer, tag]) => (
                  <tr key={title} className="border-t border-white/6">
                    <td className="px-4 py-4">{title}</td>
                    <td className="px-4 py-4">{officer}</td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-3 py-1 text-[11px] font-semibold text-white ${tag === "Priorität" ? "bg-rose-500" : "bg-cyan-500"}`}>
                        {tag}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button className="ui-btn ui-btn-inline">Öffnen</button>
                        <button className="ui-btn ui-btn-inline">Bearbeiten</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AppShell>
      );

    case "kfz":
      return <KfzRegisterApp />;

    case "officer":
      return (
        <AppShell breadcrumb="Bitterhafen CopLink / Officer" title="Officer Übersicht">
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              ["Agent Jax", "Chief (Standard)", "32039-40"],
              ["Agent Hawk", "Officer (Standard)", "32039-06"],
              ["Agent Fallout", "Officer (Standard)", "32039-21"],
            ].map(([name, rank, number]) => (
              <div key={name} className="overflow-hidden rounded-2xl border border-white/8 bg-black/20">
                <div className="border-b border-white/6 bg-gradient-to-r from-emerald-700 to-lime-600 p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-2xl">👮</div>
                    <div>
                      <p className="text-2xl font-bold text-white">{name}</p>
                      <p className="text-sm font-semibold text-white/90">{rank}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-0 divide-y divide-white/6">
                  {[
                    ["Dienstnummer", number],
                    ["Sicherheitsstufe", "0"],
                    ["Akteneinträge", "0"],
                    ["Ermittlungen", "0"],
                    ["Aktivitäten", "6"],
                    ["Dienstzeit", "keine"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between px-5 py-3 text-sm">
                      <span className="text-white/60">{label}</span>
                      <span className="rounded-md bg-red-500/15 px-2 py-1 font-semibold text-red-200">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AppShell>
      );

    case "leitstelle":
      return (
        <AppShell breadcrumb="Bitterhafen CopLink / Leitstelle" title="Leitstelle">
          <p className="text-sm text-white/65">Hier hast du eine Übersicht aller Officer und ihrer Funkstatus.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button className="ui-btn ui-btn-inline">Streifen zurücksetzen</button>
          </div>
          <div className="mt-5 overflow-hidden rounded-2xl border border-white/8">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.05] text-white/55">
                <tr>
                  <th className="px-4 py-4 font-medium">Dienstnummer</th>
                  <th className="px-4 py-4 font-medium">Status</th>
                  <th className="px-4 py-4 font-medium">Status-Info</th>
                  <th className="px-4 py-4 font-medium">Option</th>
                </tr>
              </thead>
              <tbody className="bg-black/15 text-white/90">
                {[
                  ["32039-01 -> Ali", "Funk Offline", "Außer Dienst"],
                  ["32039-40 -> Agent Jax", "Funk Offline", "Außer Dienst"],
                  ["32039-29 -> Agent Tyga", "Funk Offline", "Außer Dienst"],
                  ["32039-28 -> Agent Lotus", "Funk Offline", "Außer Dienst"],
                ].map(([id, status, info]) => (
                  <tr key={id} className="border-t border-white/6">
                    <td className="px-4 py-4">{id}</td>
                    <td className="px-4 py-4">{status}</td>
                    <td className="px-4 py-4">{info}</td>
                    <td className="px-4 py-4 text-white/40">—</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AppShell>
      );

    case "stempeluhr":
      return (
        <AppShell breadcrumb="Bitterhafen CopLink / Stempeluhr" title="Stempeluhr">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["0 Minuten", "from-blue-600 to-sky-500"],
              ["0 Stunde(n)", "from-emerald-600 to-green-500"],
              ["0 Tag(e)", "from-rose-600 to-red-500"],
            ].map(([value, gradient]) => (
              <div key={value} className={`rounded-2xl bg-gradient-to-r ${gradient} p-5 shadow-lg`}>
                <p className="text-2xl font-bold text-white">{value}</p>
              </div>
            ))}
          </div>

          <button className="mt-5 rounded-xl border border-emerald-400/35 bg-emerald-500/12 px-5 py-3 text-sm font-semibold text-emerald-300">Dienst beginnen</button>

          <div className="mt-8">
            <h2 className="text-3xl font-bold text-white">Vergangene 10 Dienste:</h2>
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/8">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/[0.05] text-white/55">
                  <tr>
                    <th className="px-4 py-4 font-medium">Dienstbeginn</th>
                    <th className="px-4 py-4 font-medium">Zeit</th>
                    <th className="px-4 py-4 font-medium">Dienstende</th>
                  </tr>
                </thead>
                <tbody className="bg-black/15 text-white/50">
                  <tr className="border-t border-white/6">
                    <td className="px-4 py-4" colSpan={3}>Keine Einträge vorhanden</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </AppShell>
      );

    case "einstellungen":
      return (
        <AppShell breadcrumb="Bitterhafen CopLink / Einstellungen" title="Einstellungen">
          <div className="grid gap-4 lg:grid-cols-2">
            {[
              ["Persönliche Einstellungen", "Passe das Aussehen deines CopLink nach deinem Geschmack an.", "from-sky-500 to-blue-500"],
              ["Computer Einstellungen", "Ändere benutzerübergreifende Einstellungen wie das Hintergrundbild.", "from-pink-500 to-rose-500"],
              ["Akten Einstellungen", "Gestalte die Aktenstruktur flexibel und füge neue Felder hinzu.", "from-amber-500 to-orange-500"],
              ["Lizenzen einstellen", "Erstelle und konfiguriere individuelle Lizenzen wie Führerschein und Waffenschein.", "from-teal-500 to-emerald-500"],
              ["Gruppen einstellen", "Lege Nutzergruppen an und passe deren Rechte an.", "from-slate-600 to-slate-700"],
              ["Favoriten einstellen", "Lege deine bevorzugten Anwendungen benutzerübergreifend fest.", "from-emerald-500 to-lime-500"],
            ].map(([title, desc, gradient]) => (
              <div key={title} className={`rounded-2xl bg-gradient-to-r ${gradient} p-6 text-white shadow-lg`}>
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="mt-3 max-w-[580px] text-sm text-white/90">{desc}</p>
              </div>
            ))}
          </div>
        </AppShell>
      );

    case "ausbildungen":
      return (
        <AppShell breadcrumb="Bitterhafen CopLink / Ausbildungen" title="Ausbildungen verwalten">
          <p className="max-w-4xl text-white/70">Hier kannst du alle Ausbildungen und ihren Inhalt verwalten. Officer können sich für Ausbildungen eintragen lassen und Ausbilder können Officer bei abgeschlossenen Ausbildungen Qualifikationen hinzufügen.</p>
          <div className="mt-5 overflow-hidden rounded-2xl border border-white/8 bg-black/15">
            <div className="border-b border-white/8 bg-white/[0.04] px-4 py-3 text-lg font-semibold text-white">Allgemein</div>
            <div className="space-y-6 p-5">
              <div>
                <h3 className="text-2xl font-bold text-white">Allgemein</h3>
                <p className="mt-3 text-white/65">Ausbildungen zum Nachholen etc</p>
              </div>
              <button className="ui-btn ui-btn-red">Teilnahme Anfragen</button>
              <p className="text-lg font-semibold text-white">Aktuelle Ausbilder 32039-22 -&gt; Agent Bane</p>
            </div>
          </div>
        </AppShell>
      );

    case "taschenrechner":
      return <CalculatorApp />;

    case "gefaengnis":
      return (
        <AppShell breadcrumb="Bitterhafen CopLink / Gefängnis" title="Zellenbelegung">
          <div className="overflow-hidden rounded-2xl border border-white/8">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.05] text-white/55">
                <tr>
                  <th className="px-4 py-4 font-medium">Name</th>
                  <th className="px-4 py-4 font-medium">Belegung</th>
                  <th className="px-4 py-4 font-medium">Ende der Haft</th>
                  <th className="px-4 py-4 font-medium">Bemerkungen</th>
                  <th className="px-4 py-4 font-medium">#</th>
                </tr>
              </thead>
              <tbody className="bg-black/15 text-white/50">
                <tr className="border-t border-white/6">
                  <td className="px-4 py-4" colSpan={5}>Keine aktiven Häftlinge vorhanden</td>
                </tr>
              </tbody>
            </table>
          </div>
        </AppShell>
      );

    case "strafen":
      return (
        <AppShell breadcrumb="Bitterhafen CopLink / Strafen" title="Strafen">
          <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 px-5 py-4 text-amber-100">Dieses Gesetzbuch stammt vom Master-Computer des Netzwerk</div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/8">
            <div className="flex items-center justify-between bg-sky-500/20 px-5 py-4 text-sm font-semibold text-sky-100">
              <span>BGB - Bürgerliches Gesetzbuch</span>
              <span>⌃</span>
            </div>
            <div className="bg-black/15 p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <span>Show</span>
                  <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-white">10</div>
                  <span>entries</span>
                </div>
                <div className="w-[220px]"><SearchInput placeholder="Search..." /></div>
              </div>
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/8">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/[0.05] text-white/55">
                    <tr>
                      <th className="px-4 py-4 font-medium">Straftat</th>
                      <th className="px-4 py-4 font-medium">Minimalstrafe</th>
                      <th className="px-4 py-4 font-medium">Maximalstrafe</th>
                      <th className="px-4 py-4 font-medium">Minimalhaftzeit</th>
                      <th className="px-4 py-4 font-medium">Maximalhaftzeit</th>
                    </tr>
                  </thead>
                  <tbody className="bg-black/15 text-white/90">
                    {[
                      ["§1 Rechtsmissbräuchlicher Vertragsschluss", "15000 Dollar", "15000 Dollar", "10 Minuten", "10 Minuten"],
                      ["§2 Vertragsbruch im Dienst- / Werkvertrag", "10000 Dollar", "10000 Dollar", "---", "---"],
                      ["§3 Arglistige Täuschung beim Vertrag", "25000 Dollar", "25000 Dollar", "15 Minuten", "15 Minuten"],
                    ].map((row) => (
                      <tr key={row[0]} className="border-t border-white/6">
                        {row.map((cell) => (
                          <td key={cell} className="px-4 py-4">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </AppShell>
      );

    case "urlaub":
      return (
        <AppShell breadcrumb="Bitterhafen CopLink / Urlaub" title="Mein Urlaub">
          <button className="ui-btn ui-btn-red">Urlaub hinzufügen</button>
          <div className="mt-5 overflow-hidden rounded-2xl border border-white/8 bg-black/15">
            <div className="flex border-b border-white/8">
              <div className="border-r border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white">offene Urlaube</div>
              <div className="px-4 py-3 text-sm text-sky-300">abgeschlossene Urlaube</div>
            </div>
            <div className="p-5">
              <div className="rounded-xl border border-sky-400/30 bg-sky-500/15 px-4 py-4 text-sm text-sky-100">Es sind keine Einträge vorhanden</div>
            </div>
          </div>
        </AppShell>
      );

    case "strafanzeigen":
      return (
        <AppShell breadcrumb="Bitterhafen CopLink / Strafanzeigen" title="Strafanzeigen">
          <button className="ui-btn ui-btn-inline">Anzeige erstellen</button>
          <div className="mt-5 overflow-hidden rounded-2xl border border-white/8 bg-black/15">
            <div className="border-b border-white/8 px-4 py-3 text-sm text-white/70">Search:</div>
            <div className="border-b border-white/8 px-4 py-3 text-sm text-white/70">Show entries: 10</div>
            <div className="p-4">
              <table className="w-full text-left text-sm">
                <thead className="text-white/55">
                  <tr>
                    <th className="px-3 py-3">ID</th>
                    <th className="px-3 py-3">Von</th>
                    <th className="px-3 py-3">Täter</th>
                    <th className="px-3 py-3">Officer</th>
                    <th className="px-3 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-white/45">
                  <tr className="border-t border-white/6">
                    <td className="px-3 py-4" colSpan={5}>Nothing to show</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </AppShell>
      );

    case "vorlagen":
      return (
        <AppShell breadcrumb="Bitterhafen CopLink / Vorlagen" title="Vorlagen">
          <div className="space-y-3">
            {["Akten", "Einsatzberichte", "Abschlepphof", "Ermittlungen"].map((item) => (
              <button key={item} className="flex w-full items-center justify-between rounded-xl border border-white/8 bg-white/[0.04] px-5 py-5 text-left text-lg font-medium text-white transition hover:bg-white/[0.07]">
                <span>{item}</span>
                <span className="text-white/35">›</span>
              </button>
            ))}
          </div>
        </AppShell>
      );

    case "funk":
      return (
        <AppShell breadcrumb="Bitterhafen CopLink / Funk" title="Funk">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Leitstelle", "Aktiv verbunden"],
              ["Streife Nord", "2 Einheiten online"],
              ["Ermittlungen", "1 Einheit online"],
              ["Spezialeinsatz", "Keine Aktivität"],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-white/8 bg-black/15 p-5">
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="mt-3 text-sm text-white/60">{desc}</p>
              </div>
            ))}
          </div>
        </AppShell>
      );

    case "einsatzberichte":
      return (
        <AppShell breadcrumb="Bitterhafen CopLink / Einsatzberichte" title="Übersicht der Einsatzberichte">
          <button className="ui-btn ui-btn-red">Einsatzbericht hinzufügen</button>
          <div className="mt-5 overflow-hidden rounded-2xl border border-white/8">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.05] text-white/55">
                <tr>
                  <th className="px-4 py-4 font-medium">ID</th>
                  <th className="px-4 py-4 font-medium">Name</th>
                  <th className="px-4 py-4 font-medium">Erstellt von</th>
                  <th className="px-4 py-4 font-medium">Erstellt am</th>
                  <th className="px-4 py-4 font-medium">Optionen</th>
                </tr>
              </thead>
              <tbody className="bg-black/15 text-white/90">
                {[
                  ["101769", "Sicherheitsstufe: 2", "--- --- ---", "--- --- ----"],
                  ["99908", "Sicherheitsstufe: 3", "--- --- ---", "--- --- ----"],
                  ["98749", "Routenrazzia Pilze", "Agent Washington", "11.01.2026"],
                ].map(([id, name, author, date]) => (
                  <tr key={id} className="border-t border-white/6">
                    <td className="px-4 py-4">{id}</td>
                    <td className="px-4 py-4">
                      <div className="font-medium">{name}</div>
                      {name === "Routenrazzia Pilze" ? (
                        <span className="mt-2 inline-block rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-semibold text-white">Geteilt</span>
                      ) : (
                        <span className="mt-2 inline-block rounded-full bg-rose-500 px-3 py-1 text-[11px] font-semibold text-white">{name}</span>
                      )}
                    </td>
                    <td className="px-4 py-4">{author}</td>
                    <td className="px-4 py-4">{date}</td>
                    <td className="px-4 py-4">
                      <button className="ui-btn ui-btn-inline">Anzeigen</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AppShell>
      );

    case "kalender":
      return (
        <AppShell breadcrumb="Bitterhafen CopLink / Kalender" title="Kalender">
          <div className="grid gap-4 md:grid-cols-7">
            {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((day) => (
              <div key={day} className="rounded-xl border border-white/8 bg-white/[0.04] px-4 py-3 text-center font-semibold text-white">{day}</div>
            ))}
            {Array.from({ length: 35 }, (_, index) => index + 1).map((day) => (
              <div key={day} className="min-h-[92px] rounded-xl border border-white/8 bg-black/15 p-3 text-sm text-white/80">{day <= 30 ? day : ""}</div>
            ))}
          </div>
        </AppShell>
      );

    case "notizen":
      return (
        <AppShell breadcrumb="Bitterhafen CopLink / Notizen" title="Notizen">
          <textarea defaultValue="Kurze Notizen, Stichpunkte oder interne Hinweise..." className="min-h-[260px] w-full rounded-2xl border border-white/10 bg-black/25 p-5 text-sm text-white outline-none" />
        </AppShell>
      );

    case "waffenregister":
      return (
        <AppShell breadcrumb="Bitterhafen CopLink / Waffenregister" title="Waffenregister">
          <div className="overflow-hidden rounded-2xl border border-white/8">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.05] text-white/55">
                <tr>
                  <th className="px-4 py-4 font-medium">Seriennummer</th>
                  <th className="px-4 py-4 font-medium">Waffe</th>
                  <th className="px-4 py-4 font-medium">Besitzer</th>
                  <th className="px-4 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="bg-black/15 text-white/90">
                {[
                  ["WR-1007", "Pistol .50", "Agent Bane", "Registriert"],
                  ["WR-1119", "Spezialkarabiner", "LSPD Asservat", "Asserviert"],
                  ["WR-1188", "Pistole", "Unbekannt", "Prüfung"],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-white/6">
                    {row.map((cell) => (
                      <td key={cell} className="px-4 py-4">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AppShell>
      );

    case "units":
      return (
        <AppShell breadcrumb="Bitterhafen CopLink / Units" title="Units">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              ["Unit Alpha", "2 Officer", "Streifenbetrieb"],
              ["Unit Bravo", "1 Officer", "Bereitschaft"],
              ["Unit Charlie", "3 Officer", "Ermittlungen"],
            ].map(([title, count, status]) => (
              <div key={title} className="rounded-2xl border border-white/8 bg-black/15 p-5">
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="mt-3 text-sm text-white/60">{count}</p>
                <p className="mt-2 text-sm text-red-200/80">{status}</p>
              </div>
            ))}
          </div>
        </AppShell>
      );

    case "wissensdatenbank":
      return (
        <AppShell breadcrumb="Bitterhafen CopLink / Wissensdatenbank" title="Wissensdatenbank">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Dienstvorschriften", "Interne Regeln, Abläufe und Standards"],
              ["Gesetzesgrundlagen", "Schneller Überblick über zentrale Normen"],
              ["Formulare & Vorlagen", "Standardtexte und Einsatzvorlagen"],
              ["Ausbildung", "Leitfäden, Prüfungen und Schulungsunterlagen"],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-white/8 bg-black/15 p-5">
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="mt-3 text-sm text-white/60">{desc}</p>
              </div>
            ))}
          </div>
        </AppShell>
      );

    case "meinpc":
      return (
        <AppShell breadcrumb="Bitterhafen CopLink / Mein PC" title="Mein PC">
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <div className="rounded-2xl border border-white/8 bg-black/15 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-white/35">Support</p>
              <div className="mt-5 space-y-4">
                {[
                  ["Discord", "Interner Supportkanal"],
                  ["Website", "Bitterhafen Portal"],
                  ["VPC-Website", "Zusätzliche Informationen"],
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
                    <p className="font-semibold text-white">{title}</p>
                    <p className="mt-2 text-sm text-white/60">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/8 bg-black/15 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-white/35">Devices and Disks</p>
              <div className="mt-5 space-y-4 text-sm text-white/85">
                {[
                  ["Akten", "32% belegt"],
                  ["Images", "78% belegt"],
                  ["System (C:)", "bereit"],
                  ["Backups (D:)", "verbunden"],
                  ["Network", "online"],
                ].map(([label, status]) => (
                  <div key={label} className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-4">
                    <div className="flex items-center justify-between gap-4">
                      <span>{label}</span>
                      <span className="text-white/55">{status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AppShell>
      );

    default:
      return null;
  }
}

export default function Home() {
  const desktopRef = useRef<HTMLDivElement | null>(null);
  const zCounterRef = useRef(10);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [resizeState, setResizeState] = useState<ResizeState | null>(null);
  const [iconPositions, setIconPositions] = useState<Record<AppId, IconPosition>>(getInitialIconPositions());
  const [iconDragState, setIconDragState] = useState<IconDragState | null>(null);
  const [search, setSearch] = useState("");
  const [startOpen, setStartOpen] = useState(false);
  const [clockOpen, setClockOpen] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const [aktenRecords, setAktenRecords] = useState<AktenRecord[]>(INITIAL_AKTEN_RECORDS);
  const [kfzRecords, setKfzRecords] = useState<KfzRecord[]>(INITIAL_KFZ_RECORDS);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (dragState) {
        const desktop = desktopRef.current;
        if (!desktop) return;
        const rect = desktop.getBoundingClientRect();

        setWindows((prev) =>
          prev.map((currentWindow) => {
            if (currentWindow.id !== dragState.id || currentWindow.isMinimized || currentWindow.isMaximized) {
              return currentWindow;
            }

            const nextX = clamp(event.clientX - rect.left - dragState.pointerOffsetX, 12, rect.width - currentWindow.width - 12);
            const nextY = clamp(event.clientY - rect.top - dragState.pointerOffsetY, 18, rect.height - currentWindow.height - 92);

            return {
              ...currentWindow,
              x: nextX,
              y: nextY,
            };
          })
        );
      }

      if (resizeState) {
        const desktop = desktopRef.current;
        if (!desktop) return;
        const rect = desktop.getBoundingClientRect();
        const minWidth = 520;
        const minHeight = 320;
        const rightPadding = 12;
        const bottomPadding = 92;

        setWindows((prev) =>
          prev.map((currentWindow) => {
            if (currentWindow.id !== resizeState.id || currentWindow.isMinimized || currentWindow.isMaximized) {
              return currentWindow;
            }

            const dx = event.clientX - resizeState.startMouseX;
            const dy = event.clientY - resizeState.startMouseY;
            let nextX = resizeState.startX;
            let nextY = resizeState.startY;
            let nextWidth = resizeState.startWidth;
            let nextHeight = resizeState.startHeight;
            const dir = resizeState.direction;

            if (dir.includes("e")) {
              nextWidth = clamp(resizeState.startWidth + dx, minWidth, rect.width - resizeState.startX - rightPadding);
            }

            if (dir.includes("s")) {
              nextHeight = clamp(resizeState.startHeight + dy, minHeight, rect.height - resizeState.startY - bottomPadding);
            }

            if (dir.includes("w")) {
              const maxLeft = resizeState.startX + resizeState.startWidth - minWidth;
              nextX = clamp(resizeState.startX + dx, 12, maxLeft);
              nextWidth = resizeState.startWidth - (nextX - resizeState.startX);
            }

            if (dir.includes("n")) {
              const maxTop = resizeState.startY + resizeState.startHeight - minHeight;
              nextY = clamp(resizeState.startY + dy, 18, maxTop);
              nextHeight = resizeState.startHeight - (nextY - resizeState.startY);
            }

            return {
              ...currentWindow,
              x: nextX,
              y: nextY,
              width: nextWidth,
              height: nextHeight,
            };
          })
        );
      }

      if (iconDragState) {
        const desktop = desktopRef.current;
        if (!desktop) return;
        const rect = desktop.getBoundingClientRect();

        setIconDragState((prev) =>
          prev
            ? {
                ...prev,
                moved:
                  prev.moved ||
                  Math.abs(event.clientX - prev.startMouseX) > 4 ||
                  Math.abs(event.clientY - prev.startMouseY) > 4,
              }
            : null
        );

        setIconPositions((prev) => ({
          ...prev,
          [iconDragState.id]: {
            x: clamp(event.clientX - rect.left - iconDragState.pointerOffsetX, 6, rect.width - 96),
            y: clamp(event.clientY - rect.top - iconDragState.pointerOffsetY, 72, rect.height - 132),
          },
        }));
      }
    }

    function handleMouseUp() {
      if (iconDragState && !iconDragState.moved) {
        openApp(iconDragState.id);
      }

      setDragState(null);
      setResizeState(null);
      setIconDragState(null);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragState, resizeState, iconDragState]);

  const visibleWindows = windows.filter((windowState) => !windowState.isMinimized).sort((a, b) => a.z - b.z);
  const desktopOpenAppIds = new Set(windows.map((windowState) => windowState.appId));
  const activeWindow = visibleWindows[visibleWindows.length - 1] ?? null;

  const searchResults = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) return [];
    return APPS.filter((app) => app.label.toLowerCase().includes(value)).slice(0, 8);
  }, [search]);

  const calendarCells = useMemo(() => {
    if (!now) return [] as { label: string; currentMonth: boolean; isToday: boolean }[];

    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = lastDay.getDate();
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const cells: { label: string; currentMonth: boolean; isToday: boolean }[] = [];

    for (let i = startOffset - 1; i >= 0; i -= 1) {
      cells.push({ label: String(prevMonthLastDay - i), currentMonth: false, isToday: false });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push({
        label: String(day),
        currentMonth: true,
        isToday: day === now.getDate(),
      });
    }

    while (cells.length < 42) {
      cells.push({ label: String(cells.length - daysInMonth - startOffset + 1), currentMonth: false, isToday: false });
    }

    return cells;
  }, [now]);

  function nextZ() {
    zCounterRef.current += 1;
    return zCounterRef.current;
  }

  function createWindow(appId: AppId): WindowState {
    const app = getApp(appId);
    const desktop = desktopRef.current?.getBoundingClientRect() ?? null;
    const openCount = windows.length;
    const { width, height, x, y } = getWindowPlacement(app, openCount, desktop);

    return {
      id: appId,
      appId,
      title: app.label,
      x,
      y,
      width,
      height,
      prevX: x,
      prevY: y,
      prevWidth: width,
      prevHeight: height,
      isMinimized: false,
      isMaximized: false,
      z: nextZ(),
    };
  }

  function focusWindow(id: AppId) {
    const z = nextZ();
    setWindows((prev) =>
      prev.map((windowState) =>
        windowState.id === id
          ? { ...windowState, z, isMinimized: false }
          : windowState
      )
    );
  }

  function openApp(appId: AppId) {
    setStartOpen(false);
    setClockOpen(false);
    setSearch("");

    setWindows((prev) => {
      const existing = prev.find((windowState) => windowState.appId === appId);
      const z = nextZ();

      if (existing) {
        return prev.map((windowState) =>
          windowState.id === existing.id
            ? { ...windowState, isMinimized: false, z }
            : windowState
        );
      }

      const app = getApp(appId);
      const desktop = desktopRef.current?.getBoundingClientRect() ?? null;
      const openCount = prev.length;
      const { width, height, x, y } = getWindowPlacement(app, openCount, desktop);

      return [
        ...prev,
        {
          id: appId,
          appId,
          title: app.label,
          x,
          y,
          width,
          height,
          prevX: x,
          prevY: y,
          prevWidth: width,
          prevHeight: height,
          isMinimized: false,
          isMaximized: false,
          z,
        },
      ];
    });
  }

  function closeWindow(id: AppId) {
    setWindows((prev) => prev.filter((windowState) => windowState.id !== id));
  }

  function minimizeWindow(id: AppId) {
    setWindows((prev) =>
      prev.map((windowState) =>
        windowState.id === id ? { ...windowState, isMinimized: true } : windowState
      )
    );
  }

  function toggleTaskbarApp(appId: AppId) {
    setClockOpen(false);

    const existing = windows.find((windowState) => windowState.appId === appId);
    if (!existing) {
      openApp(appId);
      return;
    }

    if (!existing.isMinimized && activeWindow?.id === existing.id) {
      minimizeWindow(existing.id);
      return;
    }

    focusWindow(existing.id);
  }

  function toggleMaximizeWindow(id: AppId) {
    const desktop = desktopRef.current?.getBoundingClientRect();
    if (!desktop) return;

    setWindows((prev) =>
      prev.map((windowState) => {
        if (windowState.id !== id) return windowState;

        if (windowState.isMaximized) {
          return {
            ...windowState,
            x: windowState.prevX,
            y: windowState.prevY,
            width: windowState.prevWidth,
            height: windowState.prevHeight,
            isMaximized: false,
            z: nextZ(),
          };
        }

        return {
          ...windowState,
          prevX: windowState.x,
          prevY: windowState.y,
          prevWidth: windowState.width,
          prevHeight: windowState.height,
          x: 14,
          y: 14,
          width: Math.max(desktop.width - 28, 900),
          height: Math.max(desktop.height - 92, 560),
          isMaximized: true,
          isMinimized: false,
          z: nextZ(),
        };
      })
    );
  }

  function startDragging(id: AppId, event: React.MouseEvent<HTMLDivElement>) {
    const targetWindow = windows.find((windowState) => windowState.id === id);
    if (!targetWindow || targetWindow.isMaximized) return;

    const desktop = desktopRef.current?.getBoundingClientRect();
    if (!desktop) return;

    focusWindow(id);
    setDragState({
      id,
      pointerOffsetX: event.clientX - desktop.left - targetWindow.x,
      pointerOffsetY: event.clientY - desktop.top - targetWindow.y,
    });
  }

  function startResizing(id: AppId, direction: ResizeDirection, event: React.MouseEvent<HTMLDivElement>) {
    const targetWindow = windows.find((windowState) => windowState.id === id);
    if (!targetWindow || targetWindow.isMaximized) return;

    focusWindow(id);
    setResizeState({
      id,
      direction,
      startMouseX: event.clientX,
      startMouseY: event.clientY,
      startX: targetWindow.x,
      startY: targetWindow.y,
      startWidth: targetWindow.width,
      startHeight: targetWindow.height,
    });
  }

  function startDraggingIcon(id: AppId, event: React.MouseEvent<HTMLButtonElement>) {
    const desktop = desktopRef.current?.getBoundingClientRect();
    if (!desktop) return;

    const position = iconPositions[id] ?? { x: 10, y: 74 };

    setIconDragState({
      id,
      pointerOffsetX: event.clientX - desktop.left - position.x,
      pointerOffsetY: event.clientY - desktop.top - position.y,
      startMouseX: event.clientX,
      startMouseY: event.clientY,
      moved: false,
    });
  }

  const pinnedIdSet = new Set(TASKBAR_PINNED);
  const nonPinnedOpenWindows = windows.filter((windowState, index, allWindows) => {
    if (pinnedIdSet.has(windowState.appId)) return false;
    return allWindows.findIndex((candidate) => candidate.appId === windowState.appId) === index;
  });

  return (
    <RecordsContext.Provider value={{ aktenRecords, setAktenRecords, kfzRecords, setKfzRecords }}>
      <QuickOpenContext.Provider value={openApp}>
        <main ref={desktopRef} className="desktop-bg desktop-grid relative min-h-screen overflow-hidden text-white">
      <div className="desktop-glow absolute inset-0" />
      <div className="desktop-ambient-beam pointer-events-none absolute inset-y-0 left-1/2 w-[520px] -translate-x-1/2 bg-gradient-to-b from-red-500/0 via-red-500/8 to-red-500/0 blur-3xl" />

      <div className="pointer-events-none absolute inset-0">
        <div className="watermark-glow absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-[40px] border border-red-500/25 bg-red-500/5 shadow-[0_0_120px_rgba(200,25,55,0.16)]" />
        <div className="watermark-glow absolute left-1/2 top-1/2 h-[90px] w-[90px] -translate-x-1/2 -translate-y-[92px] rounded-[28px] border border-red-500/20 bg-red-500/8 shadow-[0_0_40px_rgba(200,25,55,0.15)]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[86px] text-5xl font-black text-red-100/90">CL</div>
        <div className="watermark-glow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[5px] text-6xl font-black tracking-tight text-white/88">CopLink</div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[36px] text-[13px] uppercase tracking-[0.42em] text-white/25">Bitterhafen Polizeisystem</div>
      </div>

      <div className="brand-pulse brand-float brand-shimmer absolute left-4 top-4 z-20 rounded-[24px] border bg-black/55 px-5 py-3.5 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-400 text-sm font-black text-white">CL</div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/45">UnityLink</p>
            <p className="text-[18px] font-black text-white">Bitterhafen CopLink</p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-10">
        {desktopApps.map((app, index) => {
          const position = iconPositions[app.id] ?? { x: 10, y: 74 };
          return (
            <DesktopIcon
              key={app.id}
              label={app.desktopLabel ?? app.label}
              short={app.short}
              accent={app.accent}
              active={desktopOpenAppIds.has(app.id)}
              delayMs={(index % 6) * 120}
              x={position.x}
              y={position.y}
              onMouseDown={(event) => startDraggingIcon(app.id, event)}
            />
          );
        })}
      </div>

      {visibleWindows.map((windowState) => (
        <WindowFrame
          key={windowState.id}
          title={windowState.title}
          isFocused={activeWindow?.id === windowState.id}
          isMaximized={windowState.isMaximized}
          x={windowState.x}
          y={windowState.y}
          width={windowState.width}
          height={windowState.height}
          zIndex={windowState.z}
          onFocus={() => focusWindow(windowState.id)}
          onStartDrag={(event) => startDragging(windowState.id, event)}
          onStartResize={(direction, event) => startResizing(windowState.id, direction, event)}
          onMinimize={() => minimizeWindow(windowState.id)}
          onToggleMaximize={() => toggleMaximizeWindow(windowState.id)}
          onClose={() => closeWindow(windowState.id)}
        >
          {renderAppContent(windowState.appId)}
        </WindowFrame>
      ))}

      {searchResults.length > 0 && (
        <div className="absolute bottom-24 left-1/2 z-30 w-[320px] rounded-2xl border border-white/10 bg-[#090b10]/95 p-2 shadow-2xl backdrop-blur-xl" style={{ transform: "translateX(-20%)" }}>
          {searchResults.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => openApp(app.id)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-white/8"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${app.accent} text-xs font-black text-white`}>{app.short}</div>
              <div>
                <p className="text-sm font-semibold text-white">{app.label}</p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">App öffnen</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {startOpen && (
        <div className="absolute bottom-24 left-1/2 z-30 h-[430px] w-[400px] overflow-hidden rounded-[26px] border border-white/10 bg-[#090b10]/95 shadow-2xl backdrop-blur-xl" style={{ transform: "translateX(-40%)" }}>
          <div className="border-b border-white/8 px-5 py-4">
            <p className="text-[10px] uppercase tracking-[0.32em] text-white/35">Bitterhafen CopLink</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Startmenü</h2>
          </div>
          <div className="window-scrollbar h-[calc(100%-78px)] overflow-auto p-3">
            <div className="grid grid-cols-2 gap-3">
              {APPS.map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => openApp(app.id)}
                  className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-3 text-left transition hover:bg-white/[0.06]"
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${app.accent} text-xs font-black text-white`}>{app.short}</div>
                  <div>
                    <p className="text-sm font-semibold text-white">{app.label}</p>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">Öffnen</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div
        className="absolute bottom-3 z-20 flex items-center gap-2 rounded-[22px] border border-white/10 bg-black/72 px-4 py-3 shadow-[0_20px_48px_rgba(0,0,0,0.45)] backdrop-blur-xl"
        style={{ left: "44%", transform: "translateX(-50%)" }}
      >
        <button
          type="button"
          onClick={() => { setStartOpen((prev) => !prev); setClockOpen(false); }}
          className={`start-button-pulse flex items-center gap-3 rounded-2xl border px-4 py-3 transition ${
            startOpen
              ? "border-red-500/35 bg-red-500/18 text-white"
              : "border-white/10 bg-white/[0.04] text-white/90 hover:bg-white/[0.08]"
          }`}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-400 text-sm font-black text-white">CL</div>
          <span className="text-sm font-semibold">Start</span>
        </button>

        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onFocus={() => { setStartOpen(false); setClockOpen(false); }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && searchResults[0]) {
              openApp(searchResults[0].id);
            }
          }}
          placeholder="CopLink durchsuchen..."
          className="w-[190px] rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-red-500/35"
        />

        <div className="flex items-center gap-2">
          {pinnedApps.map((app) => {
            const relatedWindow = windows.find((windowState) => windowState.appId === app.id);
            const isOpen = Boolean(relatedWindow && !relatedWindow.isMinimized);
            const isFocused = activeWindow?.appId === app.id;

            return (
              <button
                key={app.id}
                type="button"
                onClick={() => toggleTaskbarApp(app.id)}
                className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                  isFocused
                    ? "border-red-500/35 bg-red-500/16 text-white"
                    : isOpen
                    ? "border-white/16 bg-white/[0.07] text-white"
                    : "border-white/10 bg-white/[0.04] text-white/85 hover:bg-white/[0.08]"
                }`}
              >
                {app.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {nonPinnedOpenWindows.map((windowState) => {
            const app = getApp(windowState.appId);
            return (
              <button
                key={windowState.id}
                type="button"
                onClick={() => toggleTaskbarApp(windowState.appId)}
                className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                  activeWindow?.id === windowState.id
                    ? "border-red-500/35 bg-red-500/16 text-white"
                    : windowState.isMinimized
                    ? "border-white/10 bg-white/[0.03] text-white/55 hover:bg-white/[0.08]"
                    : "border-white/12 bg-white/[0.07] text-white"
                }`}
              >
                {app.label}
              </button>
            );
          })}
        </div>
      </div>

      {clockOpen && (
        <div className="absolute bottom-20 right-4 z-30 w-[320px] rounded-[26px] border border-white/10 bg-[#090b10]/95 p-5 shadow-2xl backdrop-blur-xl">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">Datum & Uhrzeit</p>
          <div className="mt-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <p className="text-4xl font-black text-white">{formatTime(now)}</p>
            <p className="mt-1 text-sm text-white/55">{now ? now.toLocaleDateString("de-DE", { weekday: "long", day: "2-digit", month: "long", year: "numeric" }) : "--"}</p>
          </div>
          <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">{now ? now.toLocaleDateString("de-DE", { month: "long", year: "numeric" }) : "Kalender"}</p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">Mo–So</p>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-xs">
              {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((day) => (
                <div key={day} className="text-white/35">{day}</div>
              ))}
              {calendarCells.map((cell, index) => (
                <div
                  key={`${cell.label}-${index}`}
                  className={`rounded-xl px-2 py-2 ${
                    cell.isToday
                      ? "bg-red-500/20 text-white ring-1 ring-red-400/35"
                      : cell.currentMonth
                      ? "bg-white/[0.04] text-white/85"
                      : "text-white/25"
                  }`}
                >
                  {cell.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          setClockOpen((prev) => !prev);
          setStartOpen(false);
        }}
        className="absolute bottom-3 right-4 z-20 rounded-[22px] border border-white/10 bg-black/72 px-4 py-3 text-right shadow-[0_20px_48px_rgba(0,0,0,0.45)] backdrop-blur-xl transition hover:bg-black/80"
      >
        <p className="text-sm font-semibold text-white">{formatTime(now)}</p>
        <p className="text-xs text-white/55">{formatDate(now)}</p>
      </button>
        </main>
      </QuickOpenContext.Provider>
    </RecordsContext.Provider>
  );
}
