import { useState } from "react";
import type { AlertMessage } from "../../components/ui/Alerts/AlertList";

export function useAlerts() {
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);

  const pushAlert = (alert: Omit<AlertMessage, "id">) => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { id, ...alert }]);
  };

  const removeAlert = (id: number | string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return { alerts, pushAlert, removeAlert };
}