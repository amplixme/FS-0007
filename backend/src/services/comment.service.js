import prisma from "../repository/Prisma/prisma.db.js";
import CustomError from "../utils/customError.js";

const validateId = (value, label = "recurso") => {
  const id = Number(value);
  if (isNaN(id)) {
    throw new CustomError(400, `ID de ${label} no válido`);
  }
  return id;
};

const validatePostId = (postId) => validateId(postId, "post");

const findPostOrThrow = async (postId) => {
  const id = validatePostId(postId);
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) throw new CustomError(404, "Post no encontrado");
  return post;
};

export const createComment = async (postId, content, authorId) => {
  const post = await findPostOrThrow(postId);

  return await prisma.comment.create({
    data: {
      content,
      postId: post.id,
      authorId: Number(authorId),
    },
    include: { author: { select: { name: true } } },
  });
};

export const getCommentsByPost = async (postId) => {
  const id = validatePostId(postId);

  return await prisma.comment.findMany({
    where: { postId: id },
    include: { author: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });
};

export const updateComment = async (commentId, userId, data) => {
  const id = validateId(commentId, "comentario");

  const comment = await prisma.comment.findUnique({ where: { id } });
  if (!comment) throw new CustomError(404, "Comentario no encontrado");

  if (comment.authorId !== Number(userId)) {
    throw new CustomError(403, "No autorizado");
  }

  return prisma.comment.update({ where: { id }, data });
};

export const deleteComment = async (commentId, user) => {
  const id = validateId(commentId, "comentario");

  const comment = await prisma.comment.findUnique({ where: { id } });
  if (!comment) throw new CustomError(404, "Comentario no encontrado");

  const isOwner = comment.authorId === Number(user.userId); // ⚠️ confirmar campo real
  const isAdmin = user.role === "ADMIN"; // ⚠️ confirmar que exista en req.user

  if (!isOwner && !isAdmin) {
    throw new CustomError(403, "No autorizado");
  }

  return prisma.comment.delete({ where: { id } });
};