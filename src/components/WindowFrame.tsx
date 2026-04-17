type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

type WindowFrameProps = {
  title: string;
  isFocused: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  onFocus: () => void;
  onStartDrag: (event: React.MouseEvent<HTMLDivElement>) => void;
  onStartResize: (direction: ResizeDirection, event: React.MouseEvent<HTMLDivElement>) => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onClose: () => void;
  children: React.ReactNode;
};


const resizeHandles: { direction: ResizeDirection; className: string }[] = [
  { direction: "n", className: "resize-handle resize-n" },
  { direction: "s", className: "resize-handle resize-s" },
  { direction: "e", className: "resize-handle resize-e" },
  { direction: "w", className: "resize-handle resize-w" },
  { direction: "ne", className: "resize-handle resize-ne" },
  { direction: "nw", className: "resize-handle resize-nw" },
  { direction: "se", className: "resize-handle resize-se" },
  { direction: "sw", className: "resize-handle resize-sw" },
];

export default function WindowFrame({
  title,
  isFocused,
  isMaximized,
  x,
  y,
  width,
  height,
  zIndex,
  onFocus,
  onStartDrag,
  onStartResize,
  onMinimize,
  onToggleMaximize,
  onClose,
  children,
}: WindowFrameProps) {
  return (
    <div
      onMouseDown={onFocus}
      className={`absolute overflow-hidden rounded-[22px] border bg-[#0b0d13]/96 shadow-[0_28px_90px_rgba(0,0,0,0.52)] backdrop-blur-xl transition ${
        isFocused
          ? "border-red-500/45 ring-1 ring-red-500/20"
          : "border-white/10"
      } ${isMaximized ? "rounded-none" : ""}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        zIndex,
      }}
    >
      <div
        onMouseDown={onStartDrag}
        onDoubleClick={onToggleMaximize}
        className={`flex h-11 cursor-move items-center justify-between border-b px-4 select-none ${
          isFocused
            ? "border-red-500/20 bg-gradient-to-r from-[#b31127] via-[#7b1f20] to-[#2a1c22]"
            : "border-white/10 bg-gradient-to-r from-[#2b2c33] via-[#1e2026] to-[#15171c]"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-400 text-[11px] font-black text-white">
            CL
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/55">
              UnityLink
            </p>
            <p className="text-sm font-semibold text-white">{title}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onMinimize();
            }}
            className="flex h-6 w-6 items-center justify-center rounded-md bg-white/8 text-xs text-white/85 transition hover:bg-white/14"
            aria-label="Minimieren"
          >
            —
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onToggleMaximize();
            }}
            className="flex h-6 w-6 items-center justify-center rounded-md bg-white/8 text-[10px] text-white/85 transition hover:bg-white/14"
            aria-label="Maximieren"
          >
            {isMaximized ? "❐" : "□"}
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="flex h-6 w-6 items-center justify-center rounded-md bg-red-500/85 text-[10px] font-bold text-white transition hover:bg-red-400"
            aria-label="Schließen"
          >
            ×
          </button>
        </div>
      </div>

      <div className="window-scrollbar h-[calc(100%-44px)] overflow-auto">{children}</div>

      {!isMaximized && resizeHandles.map((handle) => (
        <div
          key={handle.direction}
          onMouseDown={(event) => {
            event.stopPropagation();
            onStartResize(handle.direction, event);
          }}
          className={handle.className}
        />
      ))}
    </div>
  );
}
