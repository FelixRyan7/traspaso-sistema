export const formatSpanishDate = (
 date: Date | string | number
): string => {
  const parsedDate = new Date(date);

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(parsedDate)
    .replace(/\./g, "");
};