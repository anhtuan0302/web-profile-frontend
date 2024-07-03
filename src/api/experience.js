import { api } from './baseURL';

const getExperiences = async () => {
    const response = await api.get('/api/experience');
    return response.data;
}

const getExperience = async (id) => {
    const response = await api.get(`/api/experience/${id}`);
    return response.data;
}

const createExperience = async (data) => {
    const response = await api.post('/api/experience', data);
    return response.data;
}

const updateExperience = async (id, data) => {
    const response = await api.put(`/api/experience/${id}`, data);
    return response.data;
}

const deleteExperience = async (id) => {
    const response = await api.delete(`/api/experience/${id}`);
    return response.data;
}

export { getExperiences, getExperience, createExperience, updateExperience, deleteExperience };