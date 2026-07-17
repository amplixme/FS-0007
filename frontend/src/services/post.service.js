import api from "./api";

export const getPosts = async ({category, authorId}) => {
  try {
    const params = {}
    if(category) params.category = category
    if(authorId) params.authorId = authorId
    const response = await api.get("/posts", {
      params: params,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener los posts",
    );
  }
};

export const getPostById = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener el post",
    );
  }
};

export const createPost = async (data) => {
  try {
    const response = await api.post("/posts", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al crear el post");
  }
};

export const updatePost = async (id, data) => {
  try {
    const response = await api.put(`/posts/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al actualizar el post",
    );
  }
};

export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al eliminar el post",
    );
  }
};
