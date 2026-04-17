type DesktopIconProps = {
  label: string;
  short: string;
  accent: string;
  active?: boolean;
  delayMs?: number;
  x: number;
  y: number;
  onMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function DesktopIcon({
  label,
  short,
  accent,
  active = false,
  delayMs = 0,
  x,
  y,
  onMouseDown,
}: DesktopIconProps) {
  return (
    <button
      type="button"
      onMouseDown={onMouseDown}
      className="group absolute flex w-[112px] flex-col items-center gap-4 rounded-[30px] px-2 py-4 text-center transition duration-200 hover:-translate-y-1 hover:bg-white/6"
      style={{ left: x, top: y, animationDelay: `${delayMs}ms` }}
    >
      <div
        className={`desktop-icon-bob flex h-[66px] w-[66px] items-center justify-center rounded-[22px] border border-white/18 bg-gradient-to-br ${accent} text-[18px] font-extrabold text-white shadow-[0_8px_26px_rgba(0,0,0,0.35)] transition duration-200 group-hover:scale-[1.08] group-hover:shadow-[0_0_24px_rgba(255,80,120,0.35)] ${
          active ? "ring-2 ring-red-400/45 shadow-[0_0_28px_rgba(255,70,110,0.25)]" : ""
        }`}
      >
        {short}
      </div>

      <span className="max-w-[126px] text-[15px] font-extrabold leading-[1.2] tracking-[0.005em] text-white/92 transition group-hover:text-white">
        {label}
      </span>
    </button>
  );
}
