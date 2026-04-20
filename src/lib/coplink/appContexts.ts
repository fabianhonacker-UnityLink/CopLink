import { createContext } from "react";
import { STRAFGESETZE, STRAFKATALOG, type StrafgesetzRecord, type StrafkatalogEintrag } from "../../data/strafkatalog";
import {
  INITIAL_AKTEN_RECORDS,
  INITIAL_AUSBILDUNGEN,
  INITIAL_ASSERVATEN_ITEMS,
  INITIAL_ASSERVATEN_SCHRAENKE,
  INITIAL_KFZ_RECORDS,
  INITIAL_LEITSTELLEN_DISPATCHER,
  INITIAL_LEITSTELLEN_STATUS_RECORDS,
  INITIAL_LEITSTELLEN_STREIFEN,
  INITIAL_OFFICER_RECORDS,
  INITIAL_STRAFANZEIGEN,
  INITIAL_URLAUB_RECORDS,
  INITIAL_WEAPON_RECORDS,
  type AktenRecord,
  type AusbildungRecord,
  type AsservatenItemRecord,
  type AsservatenSchrankRecord,
  type KfzRecord,
  type LeitstellenDispatcherRecord,
  type LeitstellenStatusRecord,
  type LeitstellenStreifenRecord,
  type OfficerRecord,
  type StrafanzeigeRecord,
  type UrlaubRecord,
  type WeaponRecord,
} from "./recordsData";
import type { AppId } from "./desktopShell";

export type RecordsContextValue = {
  aktenRecords: AktenRecord[];
  ausbildungRecords: AusbildungRecord[];
  setAusbildungRecords: (value: AusbildungRecord[] | ((prev: AusbildungRecord[]) => AusbildungRecord[])) => void;
  setAktenRecords: (value: AktenRecord[] | ((prev: AktenRecord[]) => AktenRecord[])) => void;
  kfzRecords: KfzRecord[];
  setKfzRecords: (value: KfzRecord[] | ((prev: KfzRecord[]) => KfzRecord[])) => void;
  strafanzeigenRecords: StrafanzeigeRecord[];
  setStrafanzeigenRecords: (value: StrafanzeigeRecord[] | ((prev: StrafanzeigeRecord[]) => StrafanzeigeRecord[])) => void;
  weaponRecords: WeaponRecord[];
  setWeaponRecords: (value: WeaponRecord[] | ((prev: WeaponRecord[]) => WeaponRecord[])) => void;
  officerRecords: OfficerRecord[];
  setOfficerRecords: (value: OfficerRecord[] | ((prev: OfficerRecord[]) => OfficerRecord[])) => void;
  urlaubRecords: UrlaubRecord[];
  setUrlaubRecords: (value: UrlaubRecord[] | ((prev: UrlaubRecord[]) => UrlaubRecord[])) => void;
  asservatenSchraenke: AsservatenSchrankRecord[];
  setAsservatenSchraenke: (value: AsservatenSchrankRecord[] | ((prev: AsservatenSchrankRecord[]) => AsservatenSchrankRecord[])) => void;
  asservatenItems: AsservatenItemRecord[];
  setAsservatenItems: (value: AsservatenItemRecord[] | ((prev: AsservatenItemRecord[]) => AsservatenItemRecord[])) => void;
  leitstellenStatusRecords: LeitstellenStatusRecord[];
  setLeitstellenStatusRecords: (value: LeitstellenStatusRecord[] | ((prev: LeitstellenStatusRecord[]) => LeitstellenStatusRecord[])) => void;
  leitstellenStreifen: LeitstellenStreifenRecord[];
  setLeitstellenStreifen: (value: LeitstellenStreifenRecord[] | ((prev: LeitstellenStreifenRecord[]) => LeitstellenStreifenRecord[])) => void;
  leitstellenDispatcher: LeitstellenDispatcherRecord;
  setLeitstellenDispatcher: (value: LeitstellenDispatcherRecord | ((prev: LeitstellenDispatcherRecord) => LeitstellenDispatcherRecord)) => void;
  strafgesetzRecords: StrafgesetzRecord[];
  setStrafgesetzRecords: (value: StrafgesetzRecord[] | ((prev: StrafgesetzRecord[]) => StrafgesetzRecord[])) => void;
  strafkatalogRecords: StrafkatalogEintrag[];
  setStrafkatalogRecords: (value: StrafkatalogEintrag[] | ((prev: StrafkatalogEintrag[]) => StrafkatalogEintrag[])) => void;
};

export const QuickOpenContext = createContext<(appId: AppId) => void>(() => {});

export const RecordsContext = createContext<RecordsContextValue>({
  aktenRecords: INITIAL_AKTEN_RECORDS,
  ausbildungRecords: INITIAL_AUSBILDUNGEN,
  setAusbildungRecords: () => {},
  setAktenRecords: () => {},
  kfzRecords: INITIAL_KFZ_RECORDS,
  setKfzRecords: () => {},
  strafanzeigenRecords: INITIAL_STRAFANZEIGEN,
  setStrafanzeigenRecords: () => {},
  weaponRecords: INITIAL_WEAPON_RECORDS,
  setWeaponRecords: () => {},
  officerRecords: INITIAL_OFFICER_RECORDS,
  setOfficerRecords: () => {},
  urlaubRecords: INITIAL_URLAUB_RECORDS,
  setUrlaubRecords: () => {},
  asservatenSchraenke: INITIAL_ASSERVATEN_SCHRAENKE,
  setAsservatenSchraenke: () => {},
  asservatenItems: INITIAL_ASSERVATEN_ITEMS,
  setAsservatenItems: () => {},
  leitstellenStatusRecords: INITIAL_LEITSTELLEN_STATUS_RECORDS,
  setLeitstellenStatusRecords: () => {},
  leitstellenStreifen: INITIAL_LEITSTELLEN_STREIFEN,
  setLeitstellenStreifen: () => {},
  leitstellenDispatcher: INITIAL_LEITSTELLEN_DISPATCHER,
  setLeitstellenDispatcher: () => {},
  strafgesetzRecords: STRAFGESETZE,
  setStrafgesetzRecords: () => {},
  strafkatalogRecords: STRAFKATALOG,
  setStrafkatalogRecords: () => {},
});
