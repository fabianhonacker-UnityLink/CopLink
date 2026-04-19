"use client";

import { useEffect, useRef, useState, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";

export type SelectOption = {
  value: string;
  label: string;
};

export type BadgeTone = "red" | "green" | "yellow" | "cyan" | "neutral";
export type StrafanzeigeStatusValue = "Erstellt" | "Gesucht" | "Abgeschlossen";

const BADGE_TONE_CLASSES: Record<BadgeTone, string> = {
  red: "bg-rose-500/20 text-rose-200 border-rose-400/30",
  green: "bg-emerald-500/20 text-emerald-200 border-emerald-400/30",
  yellow: "bg-amber-500/20 text-amber-200 border-amber-400/30",
  cyan: "bg-cyan-500/20 text-cyan-200 border-cyan-400/30",
  neutral: "bg-white/10 text-white/80 border-white/10",
};

export const STRAFANZEIGE_STATUS_META: Record<
  StrafanzeigeStatusValue,
  { label: string; tone: BadgeTone; description: string; formHint: string }
> = {
  Erstellt: {
    label: "In Bearbeitung",
    tone: "yellow",
    description: "Anzeige ist in Bearbeitung und offen.",
    formHint: "Anzeige ist in Bearbeitung und offen.",
  },
  Gesucht: {
    label: "Gesucht",
    tone: "red",
    description: "Person ist zur Fahndung ausgeschrieben.",
    formHint: "Status Gesucht aktiviert automatisch die Fahndung.",
  },
  Abgeschlossen: {
    label: "Abgeschlossen",
    tone: "green",
    description: "Vorgang abgeschlossen.",
    formHint: "Vorgang ist abgeschlossen.",
  },
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function capitalizeWords(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" " );
}

export function getBadgeToneClass(tone: BadgeTone = "neutral") {
  return BADGE_TONE_CLASSES[tone];
}

export function resolveStatusTone(text: string): BadgeTone {
  const normalized = text.trim().toLowerCase();

  if (normalized.includes("gesucht")) return "red";
  if (normalized.includes("abgeschlossen") || normalized.includes("unauffällig")) return "green";
  if (normalized.includes("erstellt") || normalized.includes("beobachtung") || normalized.includes("intern")) return "yellow";
  if (normalized.includes("aktiv") || normalized.includes("geteilt")) return "cyan";
  return "neutral";
}

export function getStrafanzeigeStatusMeta(status: string) {
  const normalized = status.trim().toLowerCase();

  if (normalized === "gesucht") return STRAFANZEIGE_STATUS_META.Gesucht;
  if (normalized === "abgeschlossen") return STRAFANZEIGE_STATUS_META.Abgeschlossen;
  if (normalized === "erstellt") return STRAFANZEIGE_STATUS_META.Erstellt;

  return {
    label: capitalizeWords(status || "Unbekannt"),
    tone: resolveStatusTone(status),
    description: "Status ohne zusätzliche Beschreibung.",
    formHint: "Status ohne zusätzliche Beschreibung.",
  };
}

export function formatLinkedChargeStatus(status: string, fahndung?: boolean) {
  if (fahndung) return STRAFANZEIGE_STATUS_META.Gesucht.label;
  return getStrafanzeigeStatusMeta(status).label;
}

export function ToneBadge({ text, tone }: { text: string; tone?: BadgeTone }) {
  return (
    <span className={cx("inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]", getBadgeToneClass(tone ?? resolveStatusTone(text)))}>
      {text}
    </span>
  );
}

export function SectionTitle({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-[28px] font-bold text-white">{title}</h2>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

export function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
      <p className="text-xs uppercase tracking-[0.22em] text-white/38">{label}</p>
      <p className="mt-3 text-base font-semibold text-white">{value || "-"}</p>
    </div>
  );
}

export function FieldBlock({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={cx("block", className)}>
      <span className="mb-2 block text-sm font-medium text-white/70">{label}</span>
      {children}
    </label>
  );
}

export function ActionBar({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("flex flex-wrap gap-3", className)}>{children}</div>;
}

export function StatusBadge({ text, tone }: { text: string; tone?: BadgeTone }) {
  return <ToneBadge text={text} tone={tone} />;
}

export function FancySelect({
  value,
  options,
  onChange,
  placeholder,
}: {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    window.addEventListener("mousedown", handlePointerDown);
    return () => window.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const selected = options.find((option) => option.value === value);

  return (
    <div ref={ref} className="ui-select-root">
      <button type="button" onClick={() => setOpen((current) => !current)} className={cx("ui-select-trigger", open && "is-open")}>
        <span>{selected?.label ?? placeholder ?? "Auswählen"}</span>
        <span className={cx("ui-select-caret", open && "is-open")}>▾</span>
      </button>

      {open ? (
        <div className="ui-select-menu window-scrollbar">
          {options.map((option) => {
            const active = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={cx("ui-select-option", active && "is-active")}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function FancyInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cx(className ?? "ui-input")} />;
}

export function FancyTextarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cx(className ?? "ui-textarea")} />;
}

export function FancyCheckbox({ className, ...props }: Omit<InputHTMLAttributes<HTMLInputElement>, "type">) {
  return <input {...props} type="checkbox" className={cx(className)} />;
}

export function UiButton({
  variant = "red",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "red" | "red-alt" | "green" | "blue" | "ghost" | "inline";
}) {
  const variantClass = {
    red: "ui-btn ui-btn-red",
    "red-alt": "ui-btn ui-btn-red-alt",
    green: "ui-btn ui-btn-green",
    blue: "ui-btn ui-btn-blue",
    ghost: "ui-btn ui-btn-ghost",
    inline: "ui-btn ui-btn-inline",
  }[variant];

  return (
    <button {...props} className={cx(variantClass, className)}>
      {children}
    </button>
  );
}
