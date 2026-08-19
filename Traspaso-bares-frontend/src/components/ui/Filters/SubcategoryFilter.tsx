type SubcategoryFilter = {
  key: string;
  label: string;
  subcategories: readonly string[];
};

type Props = {
  options: readonly SubcategoryFilter[];
  value: string;
  onChange: (value: string) => void;
};

export default function SubcategoryFilter({
  options,
  value,
  onChange,
}: Props) {
  return (
    <div className="flex md:gap-6 gap-2 overflow-x-auto pb-2">
      {options.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onChange(cat.key)}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
            value === cat.key
              ? "bg-primary text-white-soft"
              : "bg-white border border-gray-light text-dark"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}