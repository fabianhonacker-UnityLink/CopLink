import { createContext } from "react";
import {
  INITIAL_AKTEN_RECORDS,
  INITIAL_ASSERVATEN_ITEMS,
  INITIAL_ASSERVATEN_SCHRAENKE,
  INITIAL_KFZ_RECORDS,
  INITIAL_OFFICER_RECORDS,
  INITIAL_STRAFANZEIGEN,
  INITIAL_WEAPON_RECORDS,
  type AktenRecord,
  type AsservatenItemRecord,
  type AsservatenSchrankRecord,
  type KfzRecord,
  type OfficerRecord,
  type StrafanzeigeRecord,
  type WeaponRecord,
} from "./recordsData";
import type { AppId } from "./desktopShell";

export type RecordsContextValue = {
  aktenRecords: AktenRecord[];
  setAktenRecords: (value: AktenRecord[] | ((prev: AktenRecord[]) => AktenRecord[])) => void;
  kfzRecords: KfzRecord[];
  setKfzRecords: (value: KfzRecord[] | ((prev: KfzRecord[]) => KfzRecord[])) => void;
  strafanzeigenRecords: StrafanzeigeRecord[];
  setStrafanzeigenRecords: (value: StrafanzeigeRecord[] | ((prev: StrafanzeigeRecord[]) => StrafanzeigeRecord[])) => void;
  weaponRecords: WeaponRecord[];
  setWeaponRecords: (value: WeaponRecord[] | ((prev: WeaponRecord[]) => WeaponRecord[])) => void;
  officerRecords: OfficerRecord[];
  setOfficerRecords: (value: OfficerRecord[] | ((prev: OfficerRecord[]) => OfficerRecord[])) => void;
  asservatenSchraenke: AsservatenSchrankRecord[];
  setAsservatenSchraenke: (value: AsservatenSchrankRecord[] | ((prev: AsservatenSchrankRecord[]) => AsservatenSchrankRecord[])) => void;
  asservatenItems: AsservatenItemRecord[];
  setAsservatenItems: (value: AsservatenItemRecord[] | ((prev: AsservatenItemRecord[]) => AsservatenItemRecord[])) => void;
};

export const QuickOpenContext = createContext<(appId: AppId) => void>(() => {});

export const RecordsContext = createContext<RecordsContextValue>({
  aktenRecords: INITIAL_AKTEN_RECORDS,
  setAktenRecords: () => {},
  kfzRecords: INITIAL_KFZ_RECORDS,
  setKfzRecords: () => {},
  strafanzeigenRecords: INITIAL_STRAFANZEIGEN,
  setStrafanzeigenRecords: () => {},
  weaponRecords: INITIAL_WEAPON_RECORDS,
  setWeaponRecords: () => {},
  officerRecords: INITIAL_OFFICER_RECORDS,
  setOfficerRecords: () => {},
  asservatenSchraenke: INITIAL_ASSERVATEN_SCHRAENKE,
  setAsservatenSchraenke: () => {},
  asservatenItems: INITIAL_ASSERVATEN_ITEMS,
  setAsservatenItems: () => {},
});
