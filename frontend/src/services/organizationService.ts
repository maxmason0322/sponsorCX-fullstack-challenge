import api from "./api";

export const organizationService = {
  getAll: async () => {
    const response = await api.get("/organizations");
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/organizations/${id}`);
    return response.data;
  },
  getDetails: async (id: number) => {
    const response = await api.get(`/organizations/${id}/details`);
    return response.data;
  },
};
