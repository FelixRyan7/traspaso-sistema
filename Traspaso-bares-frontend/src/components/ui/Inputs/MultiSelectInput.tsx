type Option = {
  value: number;
  label: string;
};

type Props = {
  label: string;
  options: Option[];
  value: number[];
  onChange: (value: number[]) => void;
  error?: string;
};

export default function MultiSelectRHF({
  label,
  options,
  value,
  onChange,
  error,
}: Props) {
  const toggle = (id: number) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* LABEL */}
      <label className="text-sm ml-2 font-medium text-gray">
        {label}
      </label>

      {/* GRID OPTIONS */}
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt) => {
          const isSelected = value.includes(opt.value);

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggle(opt.value)}
              className={`
                flex items-center justify-between
                px-3 py-2 rounded-lg border transition-all
                text-sm font-medium
                ${
                  isSelected
                    ? "bg-primary-soft border-primary text-primary-strong"
                    : "bg-white-soft border-gray-light text-dark hover:border-primary hover:bg-primary-soft/40"
                }
              `}
            >
              <span>{opt.label}</span>

              {/* CHECK ICON */}
              <div
                className={`
                  w-4 h-4 rounded border flex items-center justify-center
                  ${
                    isSelected
                      ? "bg-primary border-primary"
                      : "border-gray-light"
                  }
                `}
              >
                {isSelected && (
                  <span className="text-white text-xs">✓</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* SELECTED SUMMARY */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {options
            .filter((o) => value.includes(o.value))
            .map((o) => (
              <span
                key={o.value}
                className="text-xs bg-primary-soft text-primary-strong px-2 py-1 rounded-full"
              >
                {o.label}
              </span>
            ))}
        </div>
      )}

      {/* ERROR */}
      {error && (
        <p className="text-error text-sm">{error}</p>
      )}
    </div>
  );
}