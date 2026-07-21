import prisma from "../repository/Prisma/prisma.db.js";
import CustomError from "../utils/customError.js";

const findUserOrThrow = async (userId) => {
  const id = Number(userId);

  if (isNaN(id)) {
    throw new CustomError(400, "ID de usuario no encontrado");
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new CustomError(404, "Usuario no encontrado");
  }

  return user;
};

export const getPublicProfile = async (userId) => {
  //No reutilizo la función findUserOrThrow para no realizar 2 llamadas a DB.
  const id = Number(userId);

  if (isNaN(id)) {
    throw new CustomError(400, "ID de usuario inválido");
  }
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id:true,
      name: true,
      bio: true,
      createdAt: true,
      avatarUrl: true,
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });
  return user
};

export const updateProfile = async (userId, name, bio, avatarUrl) => {
  const user = await findUserOrThrow(userId);

  return await prisma.user.update({
    where: {
      id:userId,
    },
    data: {
      name,
      bio,
      avatarUrl,
    },
  });
};
