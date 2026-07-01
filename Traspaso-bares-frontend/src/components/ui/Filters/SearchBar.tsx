type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="sticky top-0 bg-white-soft z-10 pb-2">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar producto..."
        className="w-full px-4 py-3 rounded-xl border border-gray-light focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}