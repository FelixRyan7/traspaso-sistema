export type SubcategoryFilterOption = {
  key: string;
  label: string;
  subcategories: readonly string[];
};

export const CATEGORY_OPTIONS = [
  { value: "alcohol", label: "Alcohol" },
  { value: "soft_drink", label: "Refrescos" },
  { value: "beer", label: "Cerveza" },
  { value: "wine", label: "Vino" },
  { value: "food", label: "Comida" },
  { value: "supplies", label: "Suministros" },
  { value: "other", label: "Otros" },
] as const;

export const SUBCATEGORY_OPTIONS: readonly SubcategoryFilterOption[] = [
  {
    key: "all",
    label: "Todos",
    subcategories: [],
  },
  {
    key: "vodka",
    label: "Vodka",
    subcategories: ["vodka"],
  },
  {
    key: "gin",
    label: "Ginebra",
    subcategories: ["gin"],
  },
  {
    key: "rum",
    label: "Ron",
    subcategories: ["rum"],
  },
  {
    key: "whisky",
    label: "Whisky",
    subcategories: ["whisky"],
  },
  {
    key: "tequila",
    label: "Tequila",
    subcategories: ["tequila"],
  },
  {
    key: "aperitif",
    label: "Aperitivo",
    subcategories: ["aperitif"],
  },
  {
    key: "liqueur",
    label: "Licor",
    subcategories: ["liqueur"],
  },
  {
    key: "beer",
    label: "Cerveza",
    subcategories: ["beer"],
  },
  {
    key: "wine",
    label: "Vino",
    subcategories: [
      "white",
      "red",
      "rose",
      "cava",
      "champagne",
    ],
  },
  {
    key: "water",
    label: "Agua",
    subcategories: ["water"],
  },
  {
    key: "soda",
    label: "Soda",
    subcategories: ["soda"],
  },
  {
    key: "energy_drink",
    label: "Energética",
    subcategories: ["energy_drink"],
  },
  {
    key: "coffee",
    label: "Café",
    subcategories: ["coffee"],
  },
  {
    key: "ice",
    label: "Ice",
    subcategories: ["ice" , "frozen"],
  },
  {
    key: "other_group",
    label: "Otros",
    subcategories: [
      "other",
      "mixer",
      "premix",
      "frozen",
      "juice",
      "snack",
      "cleaning",
      "auxiliary",
    ],
  },
] as const;

export const UNIT_TYPE_OPTIONS = [
  { value: "can", label: "Lata" },
  { value: "bottle", label: "Botella" },
  { value: "box", label: "Caja" },
  { value: "bag", label: "Bolsa" },
  { value: "unit", label: "Unidad" },
  { value: "barril", label: "Barril" },
  { value: "bib", label: "Bag in Box" },
] as const;

export const QUANTITY_UNIT_OPTIONS = [
  { value: "ml", label: "ml" },
  { value: "l", label: "Litros" },
  { value: "g", label: "Gramos" },
  { value: "kg", label: "Kg" },
  { value: "unit", label: "Unidad" },
] as const;