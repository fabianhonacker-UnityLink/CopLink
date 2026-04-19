"use client";

import { useContext, type ReactNode } from "react";
import { FancyInput } from "./UiPrimitives";
import { QuickOpenContext } from "../../lib/coplink/appContexts";
import { QUICK_APPS, getApp } from "../../lib/coplink/desktopShell";

function AppSidebar() {
  const openQuickApp = useContext(QuickOpenContext);

  return (
    <div className="flex h-full w-[224px] flex-col border-r border-white/8 bg-white/[0.03] px-4 py-5">
      <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-white/35">Oft genutzte Apps</p>

      <div className="space-y-2">
        {QUICK_APPS.map((quickAppId) => {
          const app = getApp(quickAppId);
          return (
            <button
              key={app.id}
              type="button"
              onClick={() => openQuickApp(app.id)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-white/85 transition hover:bg-white/8"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/20 text-[11px] font-bold text-red-200">
                {app.short.slice(0, 1)}
              </span>
              <span className="min-w-0 flex-1 truncate" title={app.label}>{app.desktopLabel ?? app.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto rounded-2xl border border-white/8 bg-black/20 p-4">
        <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">Status</p>
        <p className="mt-2 text-sm font-semibold text-emerald-400">System verbunden</p>
        <p className="mt-1 text-xs text-white/45">Hammer Modding CopLink aktiv</p>
      </div>
    </div>
  );
}

export function AppShell({
  breadcrumb,
  title,
  actions,
  children,
}: {
  breadcrumb: string;
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full bg-[#090b11] text-white">
      <AppSidebar />
      <div className="window-scrollbar flex-1 overflow-auto px-5 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-red-200/60">{breadcrumb}</p>
            <h1 className="mt-2 text-2xl font-bold text-white">{title}</h1>
          </div>
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}

export function SearchInput({ placeholder }: { placeholder: string }) {
  return (
    <FancyInput
      type="text"
      placeholder={placeholder}
      className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-red-400/40"
    />
  );
}
