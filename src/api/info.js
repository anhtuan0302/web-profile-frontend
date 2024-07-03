import { api } from './baseURL';

const getInfo = async () => {
    const response = await api.get('/api/info');
    return response.data;
}

const createInfo = async (data) => {
    const response = await api.post('/api/info', data);
    return response.data;
}

const updateInfo = async (id, data) => {
    const response = await api.put(`/api/info/${id}`, data);
    return response.data;
}

const deleteInfo = async (id) => {
    const response = await api.delete(`/api/info/${id}`);
    return response.data;
}

export { getInfo, createInfo, updateInfo, deleteInfo };