export default function PersonalPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-zinc-800 bg-zinc-900/70">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-400">
            CopLink / Personal
          </p>
          <h1 className="mt-2 text-4xl font-bold">Personalpanel</h1>
          <p className="mt-3 max-w-3xl text-zinc-400">
            Übersicht über Mitarbeiter, Ränge, Dienstnummern und Einheiten.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold">Mitarbeiterübersicht</h2>

          <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800">
            <table className="w-full text-left">
              <thead className="bg-zinc-950 text-zinc-400">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Dienstnummer</th>
                  <th className="px-4 py-3">Rang</th>
                  <th className="px-4 py-3">Abteilung</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-800">
                  <td className="px-4 py-3">Max Berger</td>
                  <td className="px-4 py-3">LP-102</td>
                  <td className="px-4 py-3">Officer</td>
                  <td className="px-4 py-3">Streifendienst</td>
                  <td className="px-4 py-3 text-green-400">Im Dienst</td>
                </tr>
                <tr className="border-t border-zinc-800">
                  <td className="px-4 py-3">Laura Stein</td>
                  <td className="px-4 py-3">LP-087</td>
                  <td className="px-4 py-3">Sergeant</td>
                  <td className="px-4 py-3">Ermittlungen</td>
                  <td className="px-4 py-3 text-yellow-400">Abwesend</td>
                </tr>
                <tr className="border-t border-zinc-800">
                  <td className="px-4 py-3">Jonas Falk</td>
                  <td className="px-4 py-3">LP-021</td>
                  <td className="px-4 py-3">Captain</td>
                  <td className="px-4 py-3">Leitung</td>
                  <td className="px-4 py-3 text-green-400">Im Dienst</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}