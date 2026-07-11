import api from "./api";

export const getByPostId = async (postId) => {
  const response = await api.get(`/posts/${postId}/comments`);
  return response.data;
};

export const create = async (postId, data) => {
  const response = await api.post(`/posts/${postId}/comments`, data);
  return response.data;
};

export const update = async (id, data) => {
  const response = await api.put(`/comments/${id}`, data);
  return response.data;
};

export const deleteComment = async (id) => {
  const response = await api.delete(`/comments/${id}`);
  return response.data;
};