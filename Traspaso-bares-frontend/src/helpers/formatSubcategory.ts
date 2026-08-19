const SUBCATEGORY_LABELS = {
  vodka: "Vodka",
  gin: "Ginebra",
  rum: "Ron",
  whisky: "Whisky",
  tequila: "Tequila",
  aperitif: "Aperitivo",
  liqueur: "Licor",
  beer: "Cerveza",
  water: "Agua",
  juice: "Zumo",
  soda: "Refresco de soda",
  energy_drink: "Bebida energética",
  coffee: "Café",
  cleaning: "Limpieza",
  fruit: "Fruta",
  ice: "Hielo",
  other: "Otros",
} as const;

export function formatSubcategory(subcategory?: string): string {
  if (!subcategory) return "";

  return (
    SUBCATEGORY_LABELS[
      subcategory as keyof typeof SUBCATEGORY_LABELS
    ] ?? subcategory
  );
}
