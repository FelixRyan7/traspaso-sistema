import { useMutation } from "@tanstack/react-query";

import api from "../../api/axios";

export const useCancelLocationRequest = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await api.patch(
        `/locationRequests/${id}/cancel`
      );

      return res.data;
    },
  });
};