import api from "./api"

export const getProfile = async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
}
export const updateProfile = async (data) => {
    const response = await api.put(`/users/me`, data);
    return response.data;
}
