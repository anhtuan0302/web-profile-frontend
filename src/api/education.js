import { api } from './baseURL';

const getEducations = async () => {
    const response = await api.get('/api/education');
    return response.data;
}

const getEducation = async (id) => {
    const response = await api.get(`/api/education/${id}`);
    return response.data;
}

const createEducation = async (data) => {
    const response = await api.post('/api/education', data);
    return response.data;
}

const updateEducation = async (id, data) => {
    const response = await api.put(`/api/education/${id}`, data);
    return response.data;
}

const deleteEducation = async (id) => {
    const response = await api.delete(`/api/education/${id}`);
    return response.data;
}

export { getEducations, getEducation, createEducation, updateEducation, deleteEducation };