import { api } from "./baseURL";

const getAccounts = async () => {
  const response = await api.get("/api/account");
  return response.data;
};

const getAccount = async (id) => {
  const response = await api.get(`/api/account/${id}`);
  return response.data;
};

const login = async (username, password) => {
  const response = await api.post("/api/account/login", { username,
    password });
  return response.data;
};

const updateAccount = async (id, data) => {
  const response = await api.put(`/api/account/${id}`, data);
  return response.data;
};

export { getAccounts, getAccount, login, updateAccount };


