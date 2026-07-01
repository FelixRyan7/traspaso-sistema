export const formatDateTimeES = (date?: string | Date | null) => {
  if (!date) return "-";

  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Europe/Madrid",
  }).format(new Date(date));
};