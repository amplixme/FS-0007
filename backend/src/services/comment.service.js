import prisma from "../repository/Prisma/prisma.db.js";
import CustomError from "../utils/customError.js";

const validatePostId = (postId) => {
  const id = Number(postId);

  if (isNaN(id)) {
    throw new CustomError(400, "ID de post no válido");
  }

  return id;
};

const findPostOrThrow = async (postId) => {
  const id = validatePostId(postId);

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  if (!post) {
    throw new CustomError(404, "Post no encontrado");
  }

  return post;
};

export const createComment = async (postId, content, authorId) => {
  const post = await findPostOrThrow(postId);

  return await prisma.comment.create({
    data: {
      content,
      postId: id,
      authorId: Number(authorId),
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const getCommentsByPost = async (postId) => {
  const id = validatePostId(postId);

  return await prisma.comment.findMany({
    where: {
      postId: id,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
