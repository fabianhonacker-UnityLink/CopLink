type TaskbarPinnedApp = {
  id: string;
  label: string;
};

type TaskbarWindow = {
  instanceId: string;
  appId: string;
  title: string;
  minimized: boolean;
};

type TaskbarProps = {
  startOpen: boolean;
  search: string;
  setSearch: (value: string) => void;
  onStartToggle: () => void;
  pinnedApps: TaskbarPinnedApp[];
  openWindows: TaskbarWindow[];
  onPinnedClick: (appId: string) => void;
  onWindowClick: (instanceId: string) => void;
  timeString: string;
  dateString: string;
};

export default function Taskbar({
  startOpen,
  search,
  setSearch,
  onStartToggle,
  pinnedApps,
  openWindows,
  onPinnedClick,
  onWindowClick,
  timeString,
  dateString,
}: TaskbarProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 border-t border-white/8 bg-black/55 px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div className="w-44 text-xs text-zinc-500">Bitterhafen CopLink</div>

        <div className="flex flex-1 items-center justify-center">
          <div className="flex w-full max-w-6xl items-center justify-start gap-3 pl-[10vw]">
            <button
              type="button"
              onClick={onStartToggle}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition ${
                startOpen
                  ? "border-red-400/35 bg-red-500/15 text-white"
                  : "border-white/10 bg-white/5 text-white/90 hover:bg-white/10"
              }`}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500 font-bold text-white shadow-lg">
                CL
              </div>
              <span className="text-sm font-semibold">Start</span>
            </button>

            <div className="w-[250px]">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="CopLink durchsuchen..."
                className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-red-400/35"
              />
            </div>

            <div className="flex items-center gap-2">
              {pinnedApps.map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => onPinnedClick(app.id)}
                  className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm font-medium text-zinc-200 transition hover:bg-white/10 hover:text-white"
                >
                  {app.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {openWindows.map((window) => (
                <button
                  key={window.instanceId}
                  type="button"
                  onClick={() => onWindowClick(window.instanceId)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                    window.minimized
                      ? "border-white/10 bg-white/5 text-zinc-500 hover:bg-white/10 hover:text-zinc-200"
                      : "border-red-400/20 bg-red-500/12 text-white hover:bg-red-500/18"
                  }`}
                >
                  {window.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-32 text-right">
          <p className="text-sm font-semibold text-white">{timeString}</p>
          <p className="text-xs text-zinc-400">{dateString}</p>
        </div>
      </div>
    </div>
  );
}
