import prisma from "../repository/Prisma/prisma.db.js";
import CustomError from "../utils/customError.js";

export const getAllCategories = async () => {
  return await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

export const createCategory = async (name, slug) => {
  return await prisma.category.create({
    data: {
      name,
      slug,
    },
  });
};

export const updateCategory = async (id, name, slug) => {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!category) {
    throw new CustomError(404, "Categoria no encontrada");
  }

  return await prisma.category.update({
    where: {
      id,
    },
    data: {
      name,
      slug,
    },
  });
};

export const deleteCategory = async (id) => {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      posts: true,
    },
  });

  if (!category) {
    throw new CustomError(404, "Categoria no encontrada");
  }

  if (category.posts.length > 0) {
    throw new CustomError(
      409,
      "No se puede eliminar una categoría con posts asociados",
    );
  }

  return await prisma.category.delete({
    where: {
      id,
    },
  });
};
