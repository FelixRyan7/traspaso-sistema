import { useState, useRef, useEffect } from "react";

type Option = {
  label: string;
  onClick: () => void;
  destructive?: boolean;
  icon?: React.ReactNode;
};

type Props = {
  options: Option[];
  triggerIcon?: React.ReactNode;
};

export default function DropdownMenu({ options, triggerIcon }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>

      {/* TRIGGER */}
      <button
        onClick={() => setOpen(o => !o)}
        className="
          w-8 h-8
          flex items-center justify-center
          rounded-full
          hover:bg-gray-light/30
          transition
        "
      >
        {triggerIcon ?? "⋯"}
      </button>

      {/* MENU */}
      <div
        className={`
          absolute right-0 mt-2 w-48
          bg-white-soft
          border border-gray-light
          rounded-xl
          shadow-lg
          overflow-hidden
          z-50

          transform origin-top-right
          transition-all duration-150 ease-out

          ${open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
          }
        `}
      >
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => {
              opt.onClick();
              setOpen(false);
            }}
            className={`
              w-full flex items-center gap-2
              text-left px-4 py-2 text-sm
              hover:bg-gray-light/20
              transition
              ${opt.destructive ? "text-error" : "text-dark"}
            `}
          >
            {opt.icon && (
              <span className="text-base">
                {opt.icon}
              </span>
            )}

            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}