export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-400">
            UnityLink System
          </p>
          <h1 className="mt-3 text-3xl font-bold">CopLink Login</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Anmeldung für berechtigte Mitarbeiter der Landespolizei Bitterhafen
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Dienstkennung
            </label>
            <input
              type="text"
              placeholder="z. B. LP-102"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Passwort
            </label>
            <input
              type="password"
              placeholder="Passwort eingeben"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Anmelden
          </button>
        </form>

        <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Hinweis
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            Dies ist aktuell eine Design- und Strukturansicht. Die echte
            Benutzeranmeldung wird später mit Rollen- und Rechtesystem ergänzt.
          </p>
        </div>
      </div>
    </main>
  );
}