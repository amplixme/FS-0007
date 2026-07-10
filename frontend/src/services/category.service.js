import api from "./api";

export const getAll = async () => {
    try {
        const response = await api.get("/categories");
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Error al obtener las categorías",
            { cause: error }
        );
    }
};

export const createCategory = async (name, slug) => {
    try {
        const response = await api.post("/categories", { name, slug });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Error al crear la categoría",
            { cause: error }
        );
    }
};


export const updateCategory = async (id, name, slug) => {
    try {
        const response = await api.put(`/categories/${id}`, { name, slug });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Error al actualizar la categoría",
            { cause: error }
        );
    }
};


export const deleteCategory = async (id) => {
    try {
        const response = await api.delete(`/categories/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Error al eliminar la categoría",
            { cause: error }
        );
    }
};