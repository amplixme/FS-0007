import prisma from "../repository/Prisma/prisma.db.js";
import CustomError from "../utils/customError.js";

export const createComment = async (postId, content, authorId) => {
  const id = Number(postId);

  if (isNaN(id)) {
    throw new CustomError(400, "ID de post no válido");
  }

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  if (!post) {
    throw new CustomError(404, "Post no encontrado");
  }

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
