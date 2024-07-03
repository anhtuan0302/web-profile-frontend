import { api } from './baseURL';

const getProjects = async () => {
    const response = await api.get('/api/project');
    return response.data;
}

const getProject = async (id) => {
    const response = await api.get(`/api/project/${id}`);
    return response.data;
}

const createProject = async (data) => {
    const response = await api.post('/api/project', data);
    return response.data;
}

const updateProject = async (id, data) => {
    const response = await api.put(`/api/project/${id}`, data);
    return response.data;
}

const deleteProject = async (id) => {
    const response = await api.delete(`/api/project/${id}`);
    return response.data;
}

export { getProjects, getProject, createProject, updateProject, deleteProject };