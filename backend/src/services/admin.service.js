import prisma from "../repository/Prisma/prisma.db.js"
import bcrypt from "bcrypt"
import CustomError from "../utils/customError.js";

export const getStats = async () => {
    try {
        const [totalUsers, totalPosts, totalComments, postsByCategory] =
            await Promise.all([
                prisma.user.count(),
                prisma.post.count(),
                prisma.comment.count(),
                prisma.category.findMany({
                    select: {
                        name: true,
                        slug: true,
                        _count: {
                            select: {
                                posts: true,
                            },
                        },
                    },
                }),
            ]);

        return {
            totalUsers,
            totalPosts,
            totalComments,
            postsByCategory,
        };
    } catch (error) {
        console.error("Error al obtener las estadísticas:", error);
        throw new Error("Error al obtener las estadísticas");
    }
};

export const getUsers = async () => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                _count: {
                    select: {
                        posts: true,
                    },
                },
            },
        });

        return users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            postsCount: user._count.posts,
        }));
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        throw new Error("Error al obtener los usuarios");
    }
}

export const getAdminComment = async ({ page = 1, limit = 10 }) => {
    try {
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 10;
        const offset = (pageNum - 1) * limitNum;

        const [comments, total] = await Promise.all([
            prisma.comment.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
                skip: offset,
                take: limitNum,
                select: {
                    id: true,
                    content: true,
                    createdAt: true,
                    post: {
                        select: {
                            id: true,
                            title: true,
                        },
                    },
                    author: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            }),
            prisma.comment.count(),
        ]);
        return {
            data: comments,
            total,
            page: pageNum,
            totalPages: Math.ceil(total / limitNum),
        };
    } catch (error) {
        console.error("Error al obtener los comentarios:", error);
        throw new Error("Error al obtener los comentarios");
    }
}

export const createUser = async (name, email, password, role) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
        throw new CustomError(409, "El email ya está registrado");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        }
    });
    return newUser;
}

export const updateUser = async (targetUserId, name, email, role) => {
    const id = Number(targetUserId);

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
        throw new CustomError(404, "Usuario no encontrado");
    }

    const data = {
        ...(name && { name }),
        ...(email && { email }),
        ...(role && { role }),
    };

    if (data.email && data.email !== user.email) {
        const emailInUse = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (emailInUse) {
            throw new CustomError(409, "El email ya está registrado");
        }
    }

    const updatedUser = await prisma.user.update({
        where: { id },
        data,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });

    return updatedUser;
};

export const updateUserRole = async (targetUserId, requesterId) => {
    const id = Number(targetUserId);

    if (id === requesterId) {
        throw new CustomError(403, "No podés cambiar tu propio rol");
    }

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
        throw new CustomError(404, "Usuario no encontrado");
    }

    const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";

    const updatedUser = await prisma.user.update({
        where: { id },
        data: { role: newRole },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });

    return updatedUser;
}

//eliminar un usuario (elimina sus posts y comentarios en cascada). No puede eliminarse a sí mismo
export const deleteUser = async (targetUserId, requesterId) => {
    const id = Number(targetUserId);

    if (id === requesterId) {
        throw new CustomError(403, "No podés eliminarte a vos mismo");
    }

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
        throw new CustomError(404, "Usuario no encontrado");
    }

    await prisma.user.delete({ where: { id } });


}

export const deletePost = async (postId) => {
    const id = Number(postId);

    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
        throw new CustomError(404, "Post no encontrado");
    }

    await prisma.post.delete({ where: { id } });
}

export const deleteComment = async (commentId) => {
    const id = Number(commentId);

    const comment = await prisma.comment.findUnique({ where: { id } });

    if (!comment) {
        throw new CustomError(404, "Comentario no encontrado");
    }

    await prisma.comment.delete({ where: { id } });
}
