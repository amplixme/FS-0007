import api from "./api";

export const getPosts = async ({
  page = 1,
  limit = 10,
  category,
  sort,
  search,
  authorId,
} = {}) => {
  try {
    const response = await api.get("/posts", {
      params: {
        page,
        limit,
        category: category || undefined,
        sort: sort || undefined,
        search: search || undefined,
        authorId: authorId || undefined,
      },
    });

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error?.message ||
        error.response?.data?.message ||
        "Error al obtener los posts",
    );
  }
};

export const getPosts = async (category) => {
  return getAll({ category });
};

export const getPostById = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error?.message ||
        error.response?.data?.message ||
        "Error al obtener el post",
    );
  }
};

export const createPost = async (data) => {
  try {
    const response = await api.post("/posts", data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error?.message ||
        error.response?.data?.message ||
        "Error al crear el post",
    );
  }
};

export const updatePost = async (id, data) => {
  try {
    const response = await api.put(`/posts/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error?.message ||
        error.response?.data?.message ||
        "Error al actualizar el post",
    );
  }
};

export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error?.message ||
        error.response?.data?.message ||
        "Error al eliminar el post",
    );
  }
};