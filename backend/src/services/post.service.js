import prisma from "../repository/Prisma/prisma.db.js";

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