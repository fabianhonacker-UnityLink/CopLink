export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="border-b border-zinc-800 bg-zinc-900/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-400">
            UnityLink System
          </p>
          <h1 className="mt-2 text-4xl font-bold">
            CopLink – Landespolizei Bitterhafen
          </h1>
          <p className="mt-3 max-w-3xl text-zinc-400">
            Internes Polizei-System für Einsatzübersicht, Personenabfragen,
            Fahrzeugregister, Berichte und Personalverwaltung.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-400">Aktive Fahndungen</p>
            <h2 className="mt-3 text-3xl font-bold">12</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Offene Personen- und Fahrzeugfahndungen
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-400">Berichte heute</p>
            <h2 className="mt-3 text-3xl font-bold">7</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Neue Einsatz- und Ermittlungsberichte
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-400">Beamte im Dienst</p>
            <h2 className="mt-3 text-3xl font-bold">18</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Aktive Einheiten laut Systemstatus
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-400">Offene Fälle</p>
            <h2 className="mt-3 text-3xl font-bold">29</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Laufende Ermittlungen und unbearbeitete Akten
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-xl font-semibold">Schnellzugriffe</h3>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
                <h4 className="text-lg font-semibold">Personensuche</h4>
                <p className="mt-2 text-sm text-zinc-400">
                  Bürgerdaten, Vermerke und bekannte Einträge abrufen.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
                <h4 className="text-lg font-semibold">Fahrzeugregister</h4>
                <p className="mt-2 text-sm text-zinc-400">
                  Kennzeichen prüfen und Halterdaten einsehen.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
                <h4 className="text-lg font-semibold">Berichte</h4>
                <p className="mt-2 text-sm text-zinc-400">
                  Neue Einsatzberichte und Ermittlungsdokumentation erstellen.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
                <h4 className="text-lg font-semibold">Personalpanel</h4>
                <p className="mt-2 text-sm text-zinc-400">
                  Mitarbeiter, Dienstnummern, Ränge und Einheiten verwalten.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-xl font-semibold">Systemmeldungen</h3>

            <div className="mt-5 space-y-4">
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
                <p className="text-sm font-medium text-blue-300">
                  CopLink online
                </p>
                <p className="mt-1 text-sm text-zinc-300">
                  Systemstatus stabil. Alle Kernmodule erreichbar.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm font-medium text-white">
                  Hinweis Personalabteilung
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  Neue Bewerbungen und Schulungsstände können hier später
                  eingebunden werden.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm font-medium text-white">
                  Nächster Ausbau
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  Als Nächstes bauen wir Navigation, Login-Struktur und erste
                  Unterseiten.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}