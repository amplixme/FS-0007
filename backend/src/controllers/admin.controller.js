import { createUser, deleteComment, deletePost, deleteUser, getStats, getUsers, updateUser, updateUserRole } from "../services/admin.service.js";
import { success } from "../utils/response.js";

// GET
export const getStatsController = async (req, res, next) => {
    try {
        const stats = await getStats();
        success(res, stats, 200);
    } catch (err) {
        next(err);
    }
}

export const getUsersController = async (req, res, next) => {
    try {
        const users = await getUsers();
        success(res, users, 200);
    } catch (err) {
        next(err);
    }
}

// POST
export const createUserController = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const newUser = await createUser(name, email, password, role);

        res.status(201).json({
            message: "Usuario creado exitosamente",
            user: newUser,
        })
    } catch (err) {
        next(err);
    }
}

// PATCH
export const updateUserController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;

        const updatedUser = await updateUser(id, name, email, role);

        res.status(200).json({
            message: "Usuario actualizado exitosamente",
            user: updatedUser,
        });
    } catch (err) {
        next(err);
    }
}

export const updateUserRoleController = async (req, res, next) => {
    try {
        const requesterId = req.user.userId;
        const { id } = req.params;
        const updatedUser = await updateUserRole(id, requesterId);

        res.status(200).json({
            message: "Rol de usuario actualizado exitosamente",
            user: updatedUser,
        });
    } catch (err) {
        next(err);
    }
}

// DELETE
export const deleteUserController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const requesterId = req.user.userId;

        await deleteUser(id, requesterId);

        res.status(200).json({
            message: "Usuario eliminado exitosamente",
        });
    } catch (err) {
        next(err);
    }
}

export const deletePostController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deletePost(id);

        res.status(200).json({
            message: "Post eliminado exitosamente",
        });
    } catch (err) {
        next(err);
    }
}

export const deleteCommentController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteComment(id);

        res.status(200).json({
            message: "Comentario eliminado exitosamente",
        });
    } catch (err) {
        next(err);
    }
}