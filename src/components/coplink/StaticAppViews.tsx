import Image from "next/image";
import officerAvatarPlaceholder from "../../assets/officer-avatar.png";
import { FancyTextarea } from "./UiPrimitives";
import { AppShell, SearchInput } from "./AppChrome";

export function ErmittlungenAppView() {
  return (
    <AppShell
      breadcrumb="Hammer Modding CopLink / Ermittlungen"
      title="Ermittlungen"
      actions={<button className="ui-btn ui-btn-red">Tabellenansicht bearbeiten</button>}
    >
      <div className="flex flex-wrap gap-3">
        <button className="ui-btn ui-btn-red">Ermittlung hinzufügen</button>
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
}

export function OfficerAppView() {
  return (
    <AppShell breadcrumb="Hammer Modding CopLink / Officer" title="Officer Übersicht">
      <div className="grid gap-5 lg:grid-cols-3">
        {[
          ["Agent Jax", "Chief (Standard)", "32039-40"],
          ["Agent Hawk", "Officer (Standard)", "32039-06"],
          ["Agent Fallout", "Officer (Standard)", "32039-21"],
        ].map(([name, rank, number]) => (
          <div key={name} className="overflow-hidden rounded-2xl border border-white/8 bg-black/20">
            <div className="border-b border-white/6 bg-gradient-to-r from-emerald-700 to-lime-600 p-5">
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border border-red-500/20 bg-black/40 shadow-[0_0_20px_rgba(255,0,70,0.12)]">
                  <Image
                    src={officerAvatarPlaceholder}
                    alt="Officer Platzhalter"
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
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
}

export function LeitstelleAppView() {
  return (
    <AppShell breadcrumb="Hammer Modding CopLink / Leitstelle" title="Leitstelle">
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
}

export function StempeluhrAppView() {
  return (
    <AppShell breadcrumb="Hammer Modding CopLink / Stempeluhr" title="Stempeluhr">
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
}

export function EinstellungenAppView() {
  return (
    <AppShell breadcrumb="Hammer Modding CopLink / Einstellungen" title="Einstellungen">
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
}

export function AusbildungenAppView() {
  return (
    <AppShell breadcrumb="Hammer Modding CopLink / Ausbildungen" title="Ausbildungen verwalten">
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
}

export function GefaengnisAppView() {
  return (
    <AppShell breadcrumb="Hammer Modding CopLink / Gefängnis" title="Zellenbelegung">
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
}

export function UrlaubAppView() {
  return (
    <AppShell breadcrumb="Hammer Modding CopLink / Urlaub" title="Mein Urlaub">
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
}

export function VorlagenAppView() {
  return (
    <AppShell breadcrumb="Hammer Modding CopLink / Vorlagen" title="Vorlagen">
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
}

export function FunkAppView() {
  return (
    <AppShell breadcrumb="Hammer Modding CopLink / Funk" title="Funk">
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
}

export function EinsatzberichteAppView() {
  return (
    <AppShell breadcrumb="Hammer Modding CopLink / Einsatzberichte" title="Übersicht der Einsatzberichte">
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
}

export function KalenderAppView() {
  return (
    <AppShell breadcrumb="Hammer Modding CopLink / Kalender" title="Kalender">
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
}

export function NotizenAppView() {
  return (
    <AppShell breadcrumb="Hammer Modding CopLink / Notizen" title="Notizen">
      <FancyTextarea defaultValue="Kurze Notizen, Stichpunkte oder interne Hinweise..." className="min-h-[260px] w-full rounded-2xl border border-white/10 bg-black/25 p-5 text-sm text-white outline-none" />
    </AppShell>
  );
}

export function WaffenregisterAppView() {
  return (
    <AppShell breadcrumb="Hammer Modding CopLink / Waffenregister" title="Waffenregister">
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
}

export function UnitsAppView() {
  return (
    <AppShell breadcrumb="Hammer Modding CopLink / Units" title="Units">
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
}

export function WissensdatenbankAppView() {
  return (
    <AppShell breadcrumb="Hammer Modding CopLink / Wissensdatenbank" title="Wissensdatenbank">
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
}

export function MeinPcAppView() {
  return (
    <AppShell breadcrumb="Hammer Modding CopLink / Mein PC" title="Mein PC">
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="rounded-2xl border border-white/8 bg-black/15 p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-white/35">Support</p>
          <div className="mt-5 space-y-4">
            {[
              ["Discord", "Interner Supportkanal"],
              ["Website", "Hammer Modding Portal"],
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
}
