import prisma from "../repository/Prisma/prisma.db.js";
import CustomError from "../utils/customError.js";

export const create = async (
  title,
  content,
  authorId,
  published,
  categoryIds,
  coverImage,
) => {
  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      authorId: Number(authorId),
      published: Boolean(published),
      categories: categoryIds?.length
        ? { connect: categoryIds.map((id) => ({ id })) }
        : undefined,
      coverImage: coverImage || null,
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

export const getAllPublishedPosts = async ({ category, page = 1, limit = 10, sort = "newest", authorId, search }) => {
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  const offset = (pageNum - 1) * limitNum;

  const where = {
    published: true,
  };

  if (authorId) {
    where.authorId = Number(authorId);
  }

  let orderBy;
  switch (sort) {
    case "oldest":
      orderBy = { createdAt: "asc" };
      break;
    case "comments":
      orderBy = { comments: { _count: "desc" } };
      break;
    case "newest":
    default:
      orderBy = { createdAt: "desc" };
      break;
  }

  if (category) {
    where.categories = {
      some: {
        slug: category,
      },
    };
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { content: { contains: search, mode: "insensitive" } },
    ];
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy,
      skip: offset,
      take: limitNum,
      include: {
        _count: {
          select: {
            comments: true
          }
        },
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        categories: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    }),
    prisma.post.count({ where }),
  ]);

  return {
    data: posts,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum),
  };
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

const validateOwnership = async (id, user) => {
  const postId = parseInt(id, 10);

  if (isNaN(postId)) throw new CustomError(400, "ID inválido");

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new CustomError(404, "Post no encontrado");
  }

  const isAuthor = post.authorId === Number(user.userId);
  const isAdmin = user.role === "ADMIN";

  if (!isAuthor && !isAdmin) {
    throw new CustomError(403, "No tienes permiso para modificar este post");
  }

  return postId;
};

export const updatePost = async (
  id,
  title,
  content,
  user,
  published,
  coverImage,
) => {
  const postId = await validateOwnership(id, user);

  return await prisma.post.update({
    where: { id: postId },
    data: {
      title,
      content,
      published: published !== undefined ? Boolean(published) : undefined,
      coverImage: coverImage !== undefined ? coverImage || null : undefined,
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

export const deletePost = async (id, user) => {
  const postId = await validateOwnership(id, user);

  return await prisma.post.delete({
    where: {
      id: postId,
    },
  });
};
