export type StrafgesetzId = string;

export type StrafgesetzRecord = {
  id: StrafgesetzId;
  label: string;
  accent: string;
};

export type StrafkatalogEintrag = {
  id: string;
  lawId: StrafgesetzId;
  paragraph: string;
  title: string;
  fine: number;
  he: number;
  points: number;
  notes: string;
};

export type StrafModifierState = {
  confession: boolean;
  repeatOffender: boolean;
};

export type StrafSummen = {
  fine: number;
  he: number;
  points: number;
  factor: number;
  heWasCapped: boolean;
};

export const STRAFGESETZE: StrafgesetzRecord[] = [
  { id: "stgb", label: "StGB – Strafgesetzbuch", accent: "rose" },
  { id: "stvo", label: "StVO – Straßenverkehrsordnung", accent: "sky" },
  { id: "owig", label: "OWiG – Ordnungswidrigkeitengesetz", accent: "amber" },
  { id: "btmg", label: "BtMG – Betäubungsmittelgesetz", accent: "emerald" },
  { id: "waffg", label: "WaffG – Waffengesetz", accent: "violet" },
  { id: "dsg", label: "DSG – Datenschutzgesetz", accent: "cyan" },
];

function entry(
  lawId: StrafgesetzId,
  paragraph: string,
  title: string,
  fine: number,
  he: number,
  points: number,
  notes = "—",
  idSuffix = "",
): StrafkatalogEintrag {
  return {
    id: `${lawId}-${paragraph}${idSuffix ? `-${idSuffix}` : ""}`,
    lawId,
    paragraph,
    title,
    fine,
    he,
    points,
    notes,
  };
}

export const STRAFKATALOG: StrafkatalogEintrag[] = [
  entry("stgb", "101", "Mord", 80000, 120, 0),
  entry("stgb", "102", "Totschlag", 50000, 80, 0),
  entry("stgb", "103", "Fahrlässige Tötung", 25000, 40, 0),
  entry("stgb", "104", "Mordversuch", 40000, 60, 0),
  entry("stgb", "110", "Körperverletzung", 10000, 20, 0),
  entry("stgb", "111", "Gefährliche Körperverletzung", 25000, 40, 0),
  entry("stgb", "112", "Schwere Körperverletzung", 30000, 60, 0),
  entry("stgb", "113", "Körperverletzung an Beamten", 50000, 60, 0),
  entry("stgb", "114", "Fahrlässige Körperverletzung", 5000, 10, 0),
  entry("stgb", "115", "Körperverletzung mit Todesfolge", 30000, 60, 0),
  entry("stgb", "120", "Diebstahl", 7500, 15, 0),
  entry("stgb", "121", "Schwerer Diebstahl", 15000, 20, 0, "Waffendiebstahl höher"),
  entry("stgb", "122", "Raub", 25000, 60, 0),
  entry("stgb", "123", "Erpressung", 10000, 30, 0),
  entry("stgb", "124", "Betrug", 15000, 30, 0),
  entry("stgb", "125", "Hehlerei", 7500, 20, 0),
  entry("stgb", "126", "Unterschlagung", 5000, 0, 0),
  entry("stgb", "128", "Einbruchsdiebstahl", 12500, 20, 0),
  entry("stgb", "129", "Brandstiftung", 15000, 30, 0),
  entry("stgb", "130", "Sachbeschädigung", 5000, 0, 0),
  entry("stgb", "131", "Schwere Sachbeschädigung", 7500, 10, 0),
  entry("stgb", "133", "Öffentliche Aufforderung zu Straftaten", 5000, 20, 0),
  entry("stgb", "134", "Störung des öffentlichen Friedens", 10000, 20, 0),
  entry("stgb", "135", "Unangemeldete Demonstration", 7500, 0, 0),
  entry("stgb", "136", "Bedrohung", 7500, 20, 0),
  entry("stgb", "137", "Nötigung", 7500, 25, 0),
  entry("stgb", "139", "Hausfriedensbruch", 5000, 10, 0),
  entry("stgb", "140", "Entziehung hoheitlicher Maßnahmen", 7500, 15, 0),
  entry("stgb", "145", "Urkunden- oder Dokumentenfälschung", 8000, 20, 0),
  entry("stgb", "146", "Geldfälschung", 7500, 25, 0, "Über 100.000 € höher"),
  entry("stgb", "147", "Identitätsbetrug", 7500, 20, 0),
  entry("stgb", "156", "Falschaussage", 5000, 10, 0),
  entry("stgb", "166", "Missbrauch von Kommunikationsmitteln", 1000, 0, 0, "Notrufmissbrauch höher"),
  entry("stvo", "200", "Rotlichtverstoß", 1000, 0, 0),
  entry("stvo", "201", "Vorfahrtsverstoß", 1000, 0, 0),
  entry("stvo", "202", "Gefährdung des Straßenverkehrs", 5000, 10, 0, "Führerscheinentzug"),
  entry("stvo", "203", "Verkehrsunfall mit Personenschaden", 2500, 0, 0),
  entry("stvo", "206", "Unfallflucht", 2000, 0, 1),
  entry("stvo", "207", "Fahren ohne gültige Fahrerlaubnis", 5000, 10, 0),
  entry("stvo", "210", "Technische Manipulation (Tuning / Nitro)", 5000, 0, 2),
  entry("stvo", "220", "Alkohol am Steuer (> 0,8 ‰)", 5000, 0, 0, "Führerscheinentzug"),
  entry("stvo", "221", "Fahren unter Drogeneinfluss", 5000, 0, 0, "Führerscheinentzug"),
  entry("stvo", "230", "Illegales Straßenrennen", 5000, 10, 0, "Führerscheinentzug"),
  entry("stvo", "231", "Driften / Burnouts in Städten", 1500, 0, 0),
  entry("stvo", "232", "Geisterfahrt", 2000, 0, 2),
  entry("stvo", "233", "Flucht vor Kontrolle", 2500, 0, 0),
  entry("stvo", "234", "Geschwindigkeitsüberschreitung", 500, 0, 0, "Je nach km/h-Stufe"),
  entry("owig", "302", "Widerstand gegen Polizeimaßnahme", 2000, 10, 0),
  entry("owig", "303", "Missachtung von Absperrungen", 2500, 0, 0),
  entry("owig", "305", "Behinderung von Rettungskräften", 5000, 10, 0),
  entry("owig", "308", "Nicht-Mitführen von Warndreieck, Warnweste oder Verbandkasten", 500, 0, 0),
  entry("owig", "309", "Vermummungsverbot", 1500, 0, 0),
  entry("btmg", "500", "Besitz von Betäubungsmitteln", 2000, 10, 0, "Geringe / größere Menge"),
  entry("btmg", "501", "Handel mit Betäubungsmitteln", 10000, 20, 0),
  entry("btmg", "506", "Bewaffneter Drogenhandel", 15000, 30, 0),
  entry("waffg", "601", "Unerlaubter Waffenbesitz", 10000, 20, 0),
  entry("waffg", "602", "Unerlaubtes Führen eines Waffenholsters", 5000, 0, 0),
  entry("waffg", "603", "Unerlaubter Waffengebrauch", 20000, 50, 0),
  entry("waffg", "604", "Führen verbotener Waffen", 20000, 20, 0),
  entry("waffg", "605", "Handel mit illegalen Waffen", 25000, 40, 0),
  entry("waffg", "607", "Schusswaffe im Dienst unter Alkohol- oder Drogeneinfluss", 20000, 40, 0, "Entzug der Waffenerlaubnis"),
  entry("waffg", "608", "Verlust oder Weitergabe von Dienstwaffen", 10000, 30, 0, "Disziplinarmaßnahme"),
  entry("dsg", "808", "Funkverkehr und Kommunikationsdaten", 5000, 0, 0),
  entry("dsg", "809", "Unbefugte Datenverarbeitung", 7500, 20, 0),
  entry("dsg", "810", "Datenmissbrauch durch Beamte", 10000, 20, 0, "Disziplinarmaßnahme / Suspendierung"),
  entry("dsg", "811", "Veröffentlichung personenbezogener Informationen", 7500, 0, 0),
  entry("dsg", "815", "Datenschutz im medizinischen Bereich", 10000, 20, 0),
];

export function getOffensesByIds(ids: string[], katalog: StrafkatalogEintrag[] = STRAFKATALOG) {
  const idSet = new Set(ids);
  return katalog.filter((entry) => idSet.has(entry.id));
}

export function getModifierFactor(modifiers: StrafModifierState) {
  let factor = 1;
  if (modifiers.confession) factor -= 0.25;
  if (modifiers.repeatOffender) factor += 0.25;
  return Math.max(0, factor);
}

export function calculateStrafSummen(
  offenseIds: string[],
  modifiers: StrafModifierState,
  katalog: StrafkatalogEintrag[] = STRAFKATALOG,
): StrafSummen {
  const offenses = getOffensesByIds(offenseIds, katalog);
  const factor = getModifierFactor(modifiers);

  const rawFine = offenses.reduce((sum, offense) => sum + offense.fine, 0);
  const rawHe = offenses.reduce((sum, offense) => sum + offense.he, 0);
  const points = offenses.reduce((sum, offense) => sum + offense.points, 0);

  const adjustedHe = Math.round(rawHe * factor);

  return {
    fine: Math.round(rawFine * factor),
    he: Math.min(adjustedHe, 180),
    points,
    factor,
    heWasCapped: adjustedHe > 180,
  };
}

export function formatEuroValue(value: number | null) {
  if (value == null) return "---";
  return `${value.toLocaleString("de-DE")} €`;
}

export function formatHeValue(value: number | null) {
  if (value == null) return "---";
  return `${value} HE`;
}

export function formatPointsValue(value: number | null) {
  if (value == null) return "0 Punkte";
  return `${value} Punkt${value === 1 ? "" : "e"}`;
}

export function formatStrafMeta(entry: StrafkatalogEintrag) {
  return [
    formatEuroValue(entry.fine),
    formatHeValue(entry.he),
    formatPointsValue(entry.points),
  ].join(" · ");
}
