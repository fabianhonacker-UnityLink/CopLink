"use client";

import type { BadgeTone } from "../../components/coplink/UiPrimitives";
import type { StrafModifierState } from "../../data/strafkatalog";

export type AktenRecordType = "personenakte" | "sammelakte";
export type AktenEntryType = "Straftaten" | "Gangstraftaten" | "Bußgelder und Normales";

export type AktenLicense = {
  id: string;
  name: string;
  aussteller: string;
  nummer: string;
};

export type AktenWeapon = {
  id: string;
  weapon: string;
  serial: string;
  status: string;
};

export type WeaponCatalogOption = {
  id: string;
  weapon: string;
};

export type AsservatOption = {
  id: string;
  label: string;
  category: string;
};

export type VehicleModelOption = {
  id: string;
  modell: string;
  fahrzeugtyp: string;
};

export type AktenCharge = {
  id: string;
  from: string;
  taeter: string;
  officer: string;
  status: string;
  fahndung: boolean;
};

export type AktenVehicle = {
  id: string;
  kennzeichen: string;
  fahrzeugtyp: string;
  modell: string;
  hu: string;
  versicherung: string;
  status: string;
};

export type AktenEntry = {
  id: string;
  type: AktenEntryType;
  title: string;
  creator: string;
  sentence: string;
  date: string;
  notes: string;
};

export type PersonenAkteData = {
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
  sicherheitsstufe: number;
  tags: string[];
  lizenzen: AktenLicense[];
  waffen: AktenWeapon[];
  verkehrspunkte: number;
  strafanzeigen: AktenCharge[];
  fahrzeuge: AktenVehicle[];
  eintraege: AktenEntry[];
};

export type SammelAkteData = {
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

export type AktenRecord = {
  id: string;
  kind: AktenRecordType;
  title: string;
  status: string;
  lastUpdated: string;
  searchable: string[];
  person?: PersonenAkteData;
  collection?: SammelAkteData;
};

export const INITIAL_AKTEN_RECORDS: AktenRecord[] = [
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
      sicherheitsstufe: 2,
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
      sicherheitsstufe: 3,
      tags: ["gesucht", "fahrzeugbezug"],
      lizenzen: [
        { id: "liz-1", name: "Führerschein Klasse B", aussteller: "Landespolizei Bitterhafen", nummer: "FS-B-18322" },
      ],
      waffen: [],
      verkehrspunkte: 6,
      strafanzeigen: [
        { id: "SA-2026-0002", from: "Staatsanwaltschaft", taeter: "Erwin Eisenhauer", officer: "Agent Bane", status: "in Bearbeitung", fahndung: true },
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
    id: "32039-40-CPD",
    kind: "personenakte",
    title: "Agent Jax",
    status: "aktiv",
    lastUpdated: "19.04.2026 00:12",
    searchable: ["agent jax", "32039-40-cpd", "jax", "beamter"],
    person: {
      aktennummer: "32039-40-CPD",
      imageLabel: "AJ",
      vorNachname: "Agent Jax",
      geburtsdatum: "11.02.1991",
      alias: "-",
      telefon: "555-0040",
      groesse: "184",
      augenfarbe: "Braun",
      haarfarbe: "Dunkelbraun",
      geschlecht: "M",
      sicherheitsstufe: 0,
      tags: ["intern", "beamter"],
      lizenzen: [],
      waffen: [],
      verkehrspunkte: 0,
      strafanzeigen: [],
      fahrzeuge: [],
      eintraege: [],
    },
  },
  {
    id: "32039-06-CPD",
    kind: "personenakte",
    title: "Agent Hawk",
    status: "aktiv",
    lastUpdated: "19.04.2026 00:12",
    searchable: ["agent hawk", "32039-06-cpd", "hawk", "beamter"],
    person: {
      aktennummer: "32039-06-CPD",
      imageLabel: "AH",
      vorNachname: "Agent Hawk",
      geburtsdatum: "03.08.1993",
      alias: "-",
      telefon: "555-0006",
      groesse: "180",
      augenfarbe: "Grün",
      haarfarbe: "Braun",
      geschlecht: "M",
      sicherheitsstufe: 0,
      tags: ["intern", "beamter"],
      lizenzen: [],
      waffen: [],
      verkehrspunkte: 0,
      strafanzeigen: [],
      fahrzeuge: [],
      eintraege: [],
    },
  },
  {
    id: "32039-21-CPD",
    kind: "personenakte",
    title: "Agent Fallout",
    status: "aktiv",
    lastUpdated: "19.04.2026 00:12",
    searchable: ["agent fallout", "32039-21-cpd", "fallout", "beamter"],
    person: {
      aktennummer: "32039-21-CPD",
      imageLabel: "AF",
      vorNachname: "Agent Fallout",
      geburtsdatum: "24.05.1992",
      alias: "-",
      telefon: "555-0021",
      groesse: "178",
      augenfarbe: "Blau",
      haarfarbe: "Schwarz",
      geschlecht: "M",
      sicherheitsstufe: 0,
      tags: ["intern", "beamter"],
      lizenzen: [],
      waffen: [],
      verkehrspunkte: 0,
      strafanzeigen: [],
      fahrzeuge: [],
      eintraege: [],
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

export const LICENSE_OPTIONS: AktenLicense[] = [
  { id: "liz-b", name: "Führerschein Klasse B", aussteller: "Landespolizei Bitterhafen", nummer: "FS-B-99120" },
  { id: "liz-c", name: "Führerschein Klasse C", aussteller: "Landespolizei Bitterhafen", nummer: "FS-C-77102" },
  { id: "liz-boat", name: "Bootsführerschein", aussteller: "Landespolizei Bitterhafen", nummer: "BOOT-22018" },
  { id: "liz-pilot", name: "Pilotenschein", aussteller: "Landespolizei Bitterhafen", nummer: "PIL-78110" },
  { id: "liz-weapon", name: "Waffenlizenz", aussteller: "Landespolizei Bitterhafen", nummer: "WAF-48177" },
];

export const VEHICLE_MODEL_OPTIONS: VehicleModelOption[] = [
  { id: "veh-model-1", fahrzeugtyp: "Sedan", modell: "Jugular S-State" },
  { id: "veh-model-2", fahrzeugtyp: "SUV", modell: "Granger 3600LX" },
  { id: "veh-model-3", fahrzeugtyp: "Sportwagen", modell: "Comet S2" },
  { id: "veh-model-4", fahrzeugtyp: "Motorrad", modell: "Shinobi" },
  { id: "veh-model-5", fahrzeugtyp: "Kombi", modell: "Astron" },
];

export const WEAPON_CATALOG_OPTIONS: WeaponCatalogOption[] = [
  { id: "wep-1", weapon: "Gefechtspistole" },
  { id: "wep-2", weapon: "AP-Pistole" },
  { id: "wep-3", weapon: "Pistol .50" },
  { id: "wep-4", weapon: "Kampfpistole" },
  { id: "wep-5", weapon: "Maschinenpistole" },
  { id: "wep-6", weapon: "Kampf PDW" },
  { id: "wep-7", weapon: "Spezialkarabiner" },
  { id: "wep-8", weapon: "Sturmgewehr" },
  { id: "wep-9", weapon: "Präzisionsgewehr" },
  { id: "wep-10", weapon: "Pump-Shotgun" },
];

export const WEAPON_TYPE_OPTIONS = WEAPON_CATALOG_OPTIONS;

export const ASSERVAT_OPTIONS: AsservatOption[] = [
  ...WEAPON_CATALOG_OPTIONS.map((option) => ({
    id: `weapon-${option.id}`,
    label: option.weapon,
    category: "Waffe",
  })),
  { id: "item-handy", label: "Handy", category: "Elektronik" },
  { id: "item-tablet", label: "Tablet", category: "Elektronik" },
  { id: "item-gps", label: "GPS", category: "Elektronik" },
  { id: "item-datentraeger", label: "Datenträger", category: "Elektronik" },
];

export function getAsservatLabel(id: string) {
  return ASSERVAT_OPTIONS.find((entry) => entry.id === id)?.label ?? id;
}


export type KfzRecord = {
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

export type KfzFormState = {
  kennzeichen: string;
  modellId: string;
  halter: string;
  huStatus: KfzRecord["huStatus"];
  huAblauf: string;
  versicherung: KfzRecord["versicherung"];
  status: KfzRecord["status"];
  notiz: string;
};

export type WeaponStatus = "Registriert" | "Abgemeldet" | "Beschlagnahmt";

export type WeaponRecord = {
  id: string;
  weaponId: string;
  weapon: string;
  serial: string;
  besitzer: string;
  assignedPersonAkteId: string | null;
  status: WeaponStatus;
  registriertAm: string;
  notiz: string;
  linkedStrafanzeigeId: string | null;
};

export type AsservatenSchrankRecord = {
  id: string;
  name: string;
  notiz: string;
  createdAt: string;
};

export type AsservatenItemCategory = "Waffe" | "Elektronik" | "Sonstiges";

export type AsservatenItemRecord = {
  id: string;
  schrankId: string;
  category: AsservatenItemCategory;
  label: string;
  weaponRecordId: string | null;
  linkedStrafanzeigeId: string | null;
  storedAt: string;
  notiz: string;
};


export const AUSBILDUNG_RANK_OPTIONS = [
  "Polizeirat",
  "Polizeihauptkommissar",
  "Polizeikommissar",
  "Polizeikommissaranwärter",
  "Erster Polizeihauptmeister",
  "Polizeihauptmeister",
  "Polizeimeister",
  "Polizeimeisteranwärter",
] as const;

export type AusbildungRank = (typeof AUSBILDUNG_RANK_OPTIONS)[number];
export type AusbildungRequestStatus = "offen" | "bestätigt" | "abgelehnt";

export type AusbildungRequestRecord = {
  id: string;
  officerId: string;
  requestedAt: string;
  status: AusbildungRequestStatus;
  decidedAt: string | null;
  decidedByOfficerId: string | null;
  note: string;
};

export type AusbildungRecord = {
  id: string;
  title: string;
  code: string;
  content: string;
  scheduledDate: string;
  allowSelfSignup: boolean;
  minimumRank: AusbildungRank;
  instructorOfficerIds: string[];
  requests: AusbildungRequestRecord[];
  createdAt: string;
};

export type UrlaubType = "urlaub" | "abwesenheit";

export type UrlaubRecord = {
  id: string;
  officerId: string;
  startDate: string;
  endDate: string;
  type: UrlaubType;
  reason: string;
  createdAt: string;
};

export type OfficerShiftRecord = {
  id: string;
  startedAt: string;
  endedAt: string | null;
  durationMinutes: number;
};

export type OfficerRecord = {
  id: string;
  personAkteId: string;
  dienstnummer: string;
  rolle: string;
  totalDutyMinutes: number;
  currentShiftStartedAt: string | null;
  shiftHistory: OfficerShiftRecord[];
};



export type LeitstellenStatusRecord = {
  id: string;
  code: string;
  label: string;
  shortLabel: string;
  description: string;
  tone: BadgeTone;
  sortOrder: number;
  custom: boolean;
};

export type LeitstellenStreifenRecord = {
  id: string;
  name: string;
  callSign: string;
  vehicle: string;
  imageVariant: "urban" | "interceptor" | "suv";
  assignedOfficerIds: string[];
  statusId: string;
};

export type LeitstellenDispatcherRecord = {
  officerId: string | null;
};

export type WeaponFormState = {
  weaponId: string;
  serial: string;
  besitzer: string;
  status: WeaponStatus;
  registriertAm: string;
  notiz: string;
  linkedStrafanzeigeId: string;
};

export type StrafanzeigeStatus = "Erstellt" | "Gesucht" | "Abgeschlossen";

export type StrafanzeigeRecord = {
  id: string;
  from: string;
  taeter: string;
  officer: string;
  status: StrafanzeigeStatus;
  createdAt: string;
  offenseIds: string[];
  modifiers: StrafModifierState;
  notes: string;
  asservatenIds: string[];
  asservatWeaponLinks: Record<string, string>;
  fahndung: boolean;
};

export const STRAFANZEIGE_STATUS_OPTIONS: StrafanzeigeStatus[] = ["Erstellt", "Gesucht", "Abgeschlossen"];

export const KFZ_STATUS_OPTIONS: KfzRecord["status"][] = ["Unauffällig", "Gesucht", "Beobachtung", "Sichergestellt"];
export const KFZ_HU_STATUS_OPTIONS: KfzRecord["huStatus"][] = ["Gültig", "Abgelaufen", "Unbekannt"];
export const KFZ_VERSICHERUNG_OPTIONS: KfzRecord["versicherung"][] = ["Nicht versichert", "Teilkasko", "Vollkasko", "Keine Angabe"];

export const WEAPON_STATUS_OPTIONS: WeaponStatus[] = ["Registriert", "Abgemeldet", "Beschlagnahmt"];

export const INITIAL_WEAPON_RECORDS: WeaponRecord[] = [
  {
    id: "wr-1",
    weaponId: "wep-3",
    weapon: "Pistol .50",
    serial: "P50-22091",
    besitzer: "Vale Hutch",
    assignedPersonAkteId: "18079433-31484-CPN",
    status: "Registriert",
    registriertAm: "2026-04-11",
    notiz: "Waffe regulär auf Vale Hutch registriert.",
    linkedStrafanzeigeId: null,
  },
  {
    id: "wr-2",
    weaponId: "wep-10",
    weapon: "Pump-Shotgun",
    serial: "PS-77831",
    besitzer: "Unbekannt",
    assignedPersonAkteId: null,
    status: "Beschlagnahmt",
    registriertAm: "2026-04-09",
    notiz: "Waffe im Rahmen eines laufenden Vorgangs beschlagnahmt.",
    linkedStrafanzeigeId: "SA-2026-0003",
  },
];

export const INITIAL_ASSERVATEN_SCHRAENKE: AsservatenSchrankRecord[] = [
  {
    id: "ass-schrank-1",
    name: "Schrank 01",
    notiz: "Standard-Schrank für sichergestellte Waffen.",
    createdAt: "17.04.2026 00:12",
  },
];

export const INITIAL_ASSERVATEN_ITEMS: AsservatenItemRecord[] = [
  {
    id: "ass-item-1",
    schrankId: "ass-schrank-1",
    category: "Waffe",
    label: "Pump-Shotgun",
    weaponRecordId: "wr-2",
    linkedStrafanzeigeId: "SA-2026-0003",
    storedAt: "17.04.2026 00:24",
    notiz: "Nach Sicherstellung direkt in die Asservatenkammer eingelagert.",
  },
];

export const INITIAL_AUSBILDUNGEN: AusbildungRecord[] = [];
export const INITIAL_URLAUB_RECORDS: UrlaubRecord[] = [];

export const INITIAL_OFFICER_RECORDS: OfficerRecord[] = [
  {
    id: "off-1",
    personAkteId: "32039-40-CPD",
    dienstnummer: "32039-40",
    rolle: "Chief",
    totalDutyMinutes: 0,
    currentShiftStartedAt: null,
    shiftHistory: [],
  },
  {
    id: "off-2",
    personAkteId: "32039-06-CPD",
    dienstnummer: "32039-06",
    rolle: "Officer",
    totalDutyMinutes: 0,
    currentShiftStartedAt: null,
    shiftHistory: [],
  },
  {
    id: "off-3",
    personAkteId: "32039-21-CPD",
    dienstnummer: "32039-21",
    rolle: "Officer",
    totalDutyMinutes: 0,
    currentShiftStartedAt: null,
    shiftHistory: [],
  },
];



export const INITIAL_LEITSTELLEN_STATUS_RECORDS: LeitstellenStatusRecord[] = [
  {
    id: "status-1",
    code: "1",
    label: "einsatzbereit auf Funk / auf Streife",
    shortLabel: "Status 1",
    description: "Streife ist einsatzbereit und auf Funk / Streife verfügbar.",
    tone: "green",
    sortOrder: 10,
    custom: false,
  },
  {
    id: "status-2",
    code: "2",
    label: "einsatzbereit auf Dienststelle",
    shortLabel: "Status 2",
    description: "Streife ist einsatzbereit auf der Dienststelle.",
    tone: "cyan",
    sortOrder: 20,
    custom: false,
  },
  {
    id: "status-3",
    code: "3",
    label: "Einsatz übernommen / auf Anfahrt",
    shortLabel: "Status 3",
    description: "Streife hat den Einsatz übernommen und ist auf Anfahrt.",
    tone: "yellow",
    sortOrder: 30,
    custom: false,
  },
  {
    id: "status-4",
    code: "4",
    label: "am Einsatzort",
    shortLabel: "Status 4",
    description: "Streife befindet sich am Einsatzort.",
    tone: "yellow",
    sortOrder: 40,
    custom: false,
  },
  {
    id: "status-5",
    code: "5",
    label: "Sprechwunsch",
    shortLabel: "Status 5",
    description: "Streife hat einen normalen Sprechwunsch.",
    tone: "red",
    sortOrder: 50,
    custom: false,
  },
  {
    id: "status-6",
    code: "6",
    label: "nicht einsatzbereit",
    shortLabel: "Status 6",
    description: "Streife ist aktuell nicht einsatzbereit.",
    tone: "red",
    sortOrder: 60,
    custom: false,
  },
  {
    id: "status-7",
    code: "7",
    label: "einsatzgebunden",
    shortLabel: "Status 7",
    description: "Streife ist an einen Einsatz gebunden.",
    tone: "yellow",
    sortOrder: 70,
    custom: false,
  },
  {
    id: "status-8",
    code: "8",
    label: "bedingt verfügbar",
    shortLabel: "Status 8",
    description: "Streife ist nur eingeschränkt verfügbar.",
    tone: "cyan",
    sortOrder: 80,
    custom: false,
  },
  {
    id: "status-0",
    code: "0",
    label: "priorisierter Sprechwunsch / dringend",
    shortLabel: "Status 0",
    description: "Dringender priorisierter Sprechwunsch der Streife.",
    tone: "red",
    sortOrder: 0,
    custom: false,
  },
  {
    id: "status-9",
    code: "9",
    label: "Quittung / Rückmeldung",
    shortLabel: "Status 9",
    description: "Streife quittiert oder meldet Rückmeldung.",
    tone: "green",
    sortOrder: 90,
    custom: false,
  },
];

export const INITIAL_LEITSTELLEN_STREIFEN: LeitstellenStreifenRecord[] = [
  {
    id: "streife-a11101",
    name: "A11101",
    callSign: "Adam 11-01",
    vehicle: "Buffalo STX",
    imageVariant: "urban",
    assignedOfficerIds: [],
    statusId: "status-6",
  },
  {
    id: "streife-a11102",
    name: "A11102",
    callSign: "Adam 11-02",
    vehicle: "Granger 3600LX",
    imageVariant: "suv",
    assignedOfficerIds: [],
    statusId: "status-6",
  },
  {
    id: "streife-a11103",
    name: "A11103",
    callSign: "Adam 11-03",
    vehicle: "Stanier LE Cruiser",
    imageVariant: "interceptor",
    assignedOfficerIds: [],
    statusId: "status-6",
  },
];

export const INITIAL_LEITSTELLEN_DISPATCHER: LeitstellenDispatcherRecord = {
  officerId: null,
};

export const INITIAL_KFZ_RECORDS: KfzRecord[] = [
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

export const INITIAL_STRAFANZEIGEN: StrafanzeigeRecord[] = [
  {
    id: "SA-2026-0001",
    from: "Leitstelle",
    taeter: "Vale Hutch",
    officer: "Officer Jax",
    status: "Erstellt",
    createdAt: "17.04.2026 01:26",
    offenseIds: ["waffg-601-unerlaubter-waffenbesitz", "stgb-136-bedrohung", "stgb-139-hausfriedensbruch"],
    modifiers: { confession: false, repeatOffender: false },
    notes: "Kontrolle eskalierte vor Ort. Waffe geführt, Bedrohung ausgesprochen und Grundstück trotz Aufforderung nicht verlassen.",
    asservatenIds: [],
    asservatWeaponLinks: {},
    fahndung: false,
  },
  {
    id: "SA-2026-0002",
    from: "Staatsanwaltschaft",
    taeter: "Erwin Eisenhauer",
    officer: "Agent Bane",
    status: "Gesucht",
    createdAt: "17.04.2026 02:10",
    offenseIds: ["stvo-202-gefahrdung-des-strassenverkehrs", "stvo-206-unfallflucht", "stvo-211-fahren-ohne-zulassung"],
    modifiers: { confession: false, repeatOffender: true },
    notes: "Fahrzeugbezug aus Personenakte. Unfallflucht mit technischem Mangel und fehlender Zulassung.",
    asservatenIds: ["item-handy", "item-gps"],
    asservatWeaponLinks: {},
    fahndung: true,
  },
  {
    id: "SA-2026-0003",
    from: "Ermittlungen",
    taeter: "Unbekannte Dritte",
    officer: "Agent Hawk",
    status: "Erstellt",
    createdAt: "16.04.2026 22:41",
    offenseIds: ["btmg-501-handel-mit-betaubungsmitteln", "btmg-503-schmuggel-von-betaubungsmitteln", "stgb-157-strafvereitelung"],
    modifiers: { confession: false, repeatOffender: false },
    notes: "Laufender Ermittlungsstand aus dem Hafengebiet. Datenabgleich und Personenbezug noch offen.",
    asservatenIds: ["weapon-wep-10", "item-tablet"],
    asservatWeaponLinks: {},
    fahndung: false,
  },
];

export function getInitialKfzForm(): KfzFormState {
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

export function formatHuDisplay(record: KfzRecord) {
  if (record.huStatus === "Unbekannt") return "Unbekannt";
  if (!record.huAblauf) return record.huStatus;
  return record.huStatus === "Gültig" ? `Gültig bis ${record.huAblauf}` : `Abgelaufen seit ${record.huAblauf}`;
}

export function getHuTone(record: KfzRecord): BadgeTone {
  if (record.huStatus === "Gültig") return "green";
  if (record.huStatus === "Abgelaufen") return "red";
  return "red";
}

export function getInsuranceTone(versicherung: KfzRecord["versicherung"]): BadgeTone {
  if (versicherung === "Vollkasko") return "green";
  if (versicherung === "Teilkasko") return "yellow";
  if (versicherung === "Nicht versichert" || versicherung === "Keine Angabe") return "red";
  return "neutral";
}

export function getOwnerRegistrationLabel(record: KfzRecord) {
  return record.halter && record.halter !== "Unbekannt" ? "Angemeldet" : "Abgemeldet";
}

export function getOwnerRegistrationTone(record: KfzRecord): BadgeTone {
  return record.halter && record.halter !== "Unbekannt" ? "green" : "red";
}

export function getInitialWeaponForm(): WeaponFormState {
  return {
    weaponId: WEAPON_CATALOG_OPTIONS[0]?.id ?? "",
    serial: "",
    besitzer: "Unbekannt",
    status: "Abgemeldet",
    registriertAm: "",
    notiz: "",
    linkedStrafanzeigeId: "",
  };
}

export function getWeaponStatusTone(status: WeaponStatus): BadgeTone {
  if (status === "Registriert") return "green";
  if (status === "Beschlagnahmt") return "red";
  return "yellow";
}

export function getWeaponRegistrationLabel(record: WeaponRecord) {
  return record.assignedPersonAkteId && record.besitzer !== "Unbekannt" ? "Angemeldet" : "Abgemeldet";
}

export function getWeaponRegistrationTone(record: WeaponRecord): BadgeTone {
  return record.assignedPersonAkteId && record.besitzer !== "Unbekannt" ? "green" : "red";
}
