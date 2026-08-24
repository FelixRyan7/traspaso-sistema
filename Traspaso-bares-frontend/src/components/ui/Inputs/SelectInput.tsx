import { useState } from "react";

type Option = {
  value: string;
  label: string;
};

type Props = {
  id: string;
  label: string;
  options: readonly Option[];
  value?: string | number;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
};

export default function SelectFloatingRHF({
  label,
  options,
  value,
  onChange,
  error,
  disabled = false,
}: Props) {
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="flex flex-col w-full relative min-h-[90px]">
      {/* BOX */}
      <div
        className={`
          relative flex items-center h-16 px-3 rounded-md border cursor-pointer
          transition-colors
          ${error ? "border-error" : "border-gray-light"}
          ${disabled ? "opacity-40 cursor-not-allowed" : "hover:border-primary"}
        `}
        onClick={() => !disabled && setOpen(!open)}
      >
        {/* VALUE */}
        <span className={`text-base ${selected ? "text-dark" : "text-gray"}`}>
          {selected?.label || label}
        </span>

        {/* LABEL */}
        <label
          className={`
            absolute left-3 transition-all text-gray text-xs
            -top-2 bg-white px-1
          `}
        >
          {label}
        </label>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="scroll-area absolute z-50 mt-2 w-full bg-white/30 backdrop-blur-md border border-gray-light rounded-lg shadow-md max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange?.(opt.value);
                setOpen(false);
              }}
              className={`
                w-full text-left px-4 py-2 text-sm
                hover:bg-primary-soft hover:text-primary-strong
                transition-colors
                ${opt.value === value ? "bg-primary-soft text-primary-strong" : ""}
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* ERROR */}
      {error && (
        <p className="text-error text-xs mt-1 ml-1">{error}</p>
      )}
    </div>
  );
}