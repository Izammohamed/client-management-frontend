import { api } from "../index";

export const getAllClients = async () => {
  return await api.get("/clientmanagement/clients");
};

export const addClient = async (payload) => {
  return await api.post("/clientmanagement/clients", payload);
};

export const updateClient = async (payload) => {
  const id = payload.client_id || payload.id;
  return await api.put(`/clientmanagement/clients/${id}`, payload);
};

export const deleteClient = async (client_id) => {
  return await api.delete(`/clientmanagement/clients/${client_id}`);
};

export const searchClient = async (phone) => {
  return await api.get(`/clientmanagement/clients/search/${phone}`);
};

export default {
  getAllClients,
  addClient,
  updateClient,
  deleteClient,
  searchClient
};
