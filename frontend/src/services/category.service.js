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