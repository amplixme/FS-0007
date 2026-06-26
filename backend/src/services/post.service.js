import prisma from "../repository/Prisma/prisma.db.js";
import CustomError from "../utils/customError.js";

export const create = async (title, content, authorId) => {
  const newPost = await prisma.post.create({
    data: {
      title,
      content,
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

  return newPost;
};

export const getAllPublishedPosts = async () => {
  return await prisma.post.findMany({
    where: {
      published: true, 
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

export const getPostById = async (id) => {
 
  const postId = parseInt(id, 10);
  if (isNaN(postId)) throw new CustomError(400, "ID inválido");

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!post) {
    throw new CustomError(404, "El post no existe");
  }

  return post;
};