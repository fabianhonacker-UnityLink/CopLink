type PersonData = {
  name: string;
  geburtsdatum: string;
  telefon: string;
  status: string;
  statusColor: string;
  beruf: string;
  wohnort: string;
  hinweis: string;
  fahrzeuge: string[];
  berichte: string[];
  akten: string[];
};

const personenDaten: Record<string, PersonData> = {
  "leon-hartmann": {
    name: "Leon Hartmann",
    geburtsdatum: "12.05.1996",
    telefon: "555-0142",
    status: "Unauffällig",
    statusColor: "text-green-400",
    beruf: "Mechaniker",
    wohnort: "Bitterhafen, Innenstadt",
    hinweis: "Keine bekannten strafrechtlichen Einträge.",
    fahrzeuge: ["Buffalo STX – BH-LP-204"],
    berichte: ["BR-2026-018 – Verkehrskontrolle ohne Beanstandung"],
    akten: ["Keine offenen Akten"],
  },
  "mara-voss": {
    name: "Mara Voss",
    geburtsdatum: "03.11.1992",
    telefon: "555-0198",
    status: "Beobachtung",
    statusColor: "text-yellow-400",
    beruf: "Unbekannt",
    wohnort: "Bitterhafen, Hafengebiet",
    hinweis:
      "Bekannte Kontakte im Hafenbereich, mehrfach in Zusammenhang mit Ermittlungen genannt.",
    fahrzeuge: ["Kein registriertes Fahrzeug"],
    berichte: [
      "BR-2026-027 – Beobachtung im Hafenbereich",
      "BR-2026-029 – Kontakt zu verdächtigen Personen",
    ],
    akten: ["AK-2026-002 – Organisierte Hehlerei"],
  },
};

export default async function PersonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = personenDaten[slug];

  if (!person) {
    return (
      <main className="min-h-screen bg-black px-6 py-10 text-white">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold">Person nicht gefunden</h1>
          <p className="mt-3 text-zinc-400">
            Für diesen Eintrag liegen aktuell keine Daten vor.
          </p>
          <p className="mt-2 text-sm text-zinc-500">Slug: {slug}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-zinc-800 bg-zinc-900/70">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-400">
            CopLink / Personenakte
          </p>
          <h1 className="mt-2 text-4xl font-bold">{person.name}</h1>
          <p className={`mt-3 text-sm font-medium ${person.statusColor}`}>
            Status: {person.status}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">Grunddaten</h2>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between border-b border-zinc-800 pb-3">
                <span className="text-zinc-400">Geburtsdatum</span>
                <span>{person.geburtsdatum}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-3">
                <span className="text-zinc-400">Telefon</span>
                <span>{person.telefon}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-3">
                <span className="text-zinc-400">Beruf</span>
                <span>{person.beruf}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-zinc-400">Wohnort</span>
                <span>{person.wohnort}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">Hinweis / Vermerk</h2>
            <p className="mt-5 text-sm leading-6 text-zinc-300">
              {person.hinweis}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">Registrierte Fahrzeuge</h2>
            <div className="mt-5 space-y-3">
              {person.fahrzeuge.map((fahrzeug) => (
                <div
                  key={fahrzeug}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-300"
                >
                  {fahrzeug}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">Zugehörige Berichte</h2>
            <div className="mt-5 space-y-3">
              {person.berichte.map((bericht) => (
                <div
                  key={bericht}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-300"
                >
                  {bericht}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 xl:col-span-2">
            <h2 className="text-xl font-semibold">Verknüpfte Akten</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {person.akten.map((akte) => (
                <div
                  key={akte}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-300"
                >
                  {akte}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}