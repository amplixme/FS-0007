import api from "./api";

export const getAdminStats = () => api.get("/admin/stats").then((res) => res.data.data);

export const getAdminUsers = () => api.get("/admin/users").then((res) => res.data.data);

export const createAdminUser = (payload) =>
    api.post("/admin/users", payload).then((res) => res.data);

export const updateAdminUser = (id, payload) =>
    api.patch(`/admin/users/${id}`, payload).then((res) => res.data);

export const toggleAdminUserRole = (id) =>
    api.patch(`/admin/users/${id}/role`).then((res) => res.data);

export const deleteAdminUser = (id) =>
    api.delete(`/admin/users/${id}`).then((res) => res.data);

export const deleteAdminPost = (id) =>
    api.delete(`/admin/posts/${id}`).then((res) => res.data);

export const deleteAdminComment = (id) =>
    api.delete(`/admin/comments/${id}`).then((res) => res.data);