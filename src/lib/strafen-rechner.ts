import {
  calculateStrafSummen,
  getOffensesByIds,
  type StrafModifierState,
  type StrafSummen,
} from "../data/strafkatalog";

export type StrafRechnerAuswahl = {
  id: string;
  variantId?: string;
};

export function berechneStrafsummen(
  auswahl: StrafRechnerAuswahl[],
  modifiers: StrafModifierState,
): StrafSummen {
  return calculateStrafSummen(
    auswahl.map((item) => item.id),
    modifiers,
  );
}

export function holeStraftaten(auswahl: StrafRechnerAuswahl[]) {
  return getOffensesByIds(auswahl.map((item) => item.id));
}
