type AppWindowProps = {
  title: string;
  quickApps: string[];
  children: React.ReactNode;
};

export default function AppWindow({
  title,
  quickApps,
  children,
}: AppWindowProps) {
  return (
    <div className="flex h-full min-h-[620px] overflow-hidden rounded-[30px] border border-sky-700/40 bg-white/92 shadow-[0_25px_80px_rgba(0,0,0,0.28)] backdrop-blur-md">
      <div className="flex w-[235px] flex-col border-r border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between bg-gradient-to-r from-sky-700 to-cyan-500 px-4 py-3 text-white">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-white/85" />
            <span className="text-sm font-semibold">{title}</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="rounded-md bg-white/15 px-2 py-1">—</span>
            <span className="rounded-md bg-white/15 px-2 py-1">□</span>
          </div>
        </div>

        <div className="flex-1 px-4 py-5">
          <p className="mb-4 text-xs uppercase tracking-wide text-slate-400">
            Oft genutzte Apps
          </p>

          <div className="space-y-2">
            {quickApps.map((item) => (
              <button
                key={item}
                type="button"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-200"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                  {item.slice(0, 1)}
                </span>
                <span>{item}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Systemstatus
            </p>
            <p className="mt-2 text-sm font-semibold text-emerald-600">
              CopLink online
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Desktop V1 aktiv, Kernmodule vorbereitet
            </p>
          </div>
        </div>
      </div>

      <div className="window-scrollbar flex-1 overflow-auto px-8 py-8 text-slate-900">
        {children}
      </div>
    </div>
  );
}
