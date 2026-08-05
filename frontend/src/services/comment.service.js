import api from "./api";

export const getCommentByPostId = async (postId) => {
  const response = await api.get(`/posts/${postId}/comments`);
  return response.data;
};

export const createComment = async (postId, data) => {
  const response = await api.post(`/posts/${postId}/comments`, data);
  return response.data;
};

export const updateComment = async (id, data) => {
  const response = await api.put(`/comments/${id}`, data);
  return response.data;
};

export const deleteComment = async (id) => {
  const response = await api.delete(`/comments/${id}`);
  return response.data;
};
