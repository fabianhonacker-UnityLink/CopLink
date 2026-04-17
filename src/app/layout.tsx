import "./globals.css";
import Link from "next/link";
import { headers } from "next/headers";

export const metadata = {
  title: "CopLink",
  description: "Polizei-System für UnityLink",
};

const navItems = [
  { href: "/", label: "Dashboard", icon: "🏠" },
  { href: "/personen", label: "Personen", icon: "🧍" },
  { href: "/fahrzeuge", label: "Fahrzeuge", icon: "🚗" },
  { href: "/akten", label: "Akten", icon: "📁" },
  { href: "/berichte", label: "Berichte", icon: "📝" },
  { href: "/personal", label: "Personal", icon: "👮" },
  { href: "/faelle", label: "Fälle", icon: "⚖️" },
  { href: "/fahndung", label: "Fahndung", icon: "🚨" },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-next-pathname") || "/";

  return (
    <html lang="de">
      <body className="bg-black text-white">
        <div className="flex min-h-screen">
          <aside className="flex w-72 flex-col justify-between border-r border-zinc-800 bg-zinc-900">
            <div className="p-6">
              <div className="mb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-blue-400">
                  UnityLink
                </p>
                <h2 className="mt-2 text-2xl font-bold">🚔 CopLink</h2>
                <p className="mt-2 text-sm text-zinc-400">
                  Internes Polizei-System
                </p>
              </div>

              <nav className="space-y-2">
                {navItems.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                        isActive
                          ? "bg-blue-500/15 text-white border border-blue-500/30"
                          : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                      }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="border-t border-zinc-800 p-6">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Systemstatus
                </p>
                <p className="mt-2 text-sm font-medium text-green-400">
                  CopLink online
                </p>
                <p className="mt-1 text-xs text-zinc-400">
                  Alle Kernmodule erreichbar
                </p>
              </div>
            </div>
          </aside>

          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}