import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/repository/Prisma/prisma.db.js", () => ({
  default: {
    post: {
      create: vi.fn(),
      findMany: vi.fn(),
      count: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

import prisma from "../../src/repository/Prisma/prisma.db.js";
import CustomError from "../../src/utils/customError.js";
import {
  create,
  getAllPublishedPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../../src/services/post.service.js";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Post Service Unit Tests", () => {
  it("1. Debe crear un post correctamente", async () => {
    const mockCreatedPost = {
      id: 1,
      title: "Nuevo Post",
      content: "Contenido del post",
      authorId: 10,
      published: true,
      coverImage: null,
      author: { name: "Santy" },
    };

    prisma.post.create.mockResolvedValue(mockCreatedPost);

    const result = await create("Nuevo Post", "Contenido del post", 10, true, [], null);

    expect(prisma.post.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockCreatedPost);
  });

  it("2. Debe obtener todos los posts publicados con paginación", async () => {
    const mockPosts = [
      { id: 1, title: "Post 1", published: true },
      { id: 2, title: "Post 2", published: true },
    ];

    prisma.post.findMany.mockResolvedValue(mockPosts);
    prisma.post.count.mockResolvedValue(2);

    const result = await getAllPublishedPosts({ page: 1, limit: 10 });

    expect(prisma.post.findMany).toHaveBeenCalled();
    expect(prisma.post.count).toHaveBeenCalled();
    expect(result).toEqual({
      data: mockPosts,
      total: 2,
      page: 1,
      totalPages: 1,
    });
  });

  it("3. Debe obtener un post por su ID si existe", async () => {
    const mockPost = {
      id: 1,
      title: "Post Existente",
      author: { name: "Santy" },
    };

    prisma.post.findUnique.mockResolvedValue(mockPost);

    const result = await getPostById("1");

    expect(prisma.post.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { author: { select: { name: true } } },
    });
    expect(result).toEqual(mockPost);
  });


  it("4. Debe lanzar CustomError 404 si el post no existe", async () => {
    prisma.post.findUnique.mockResolvedValue(null);

    await expect(getPostById("999")).rejects.toThrow(CustomError);
    await expect(getPostById("999")).rejects.toMatchObject({
      status: 404,
      message: "El post no existe",
    });
  });

  it("5. Debe actualizar un post si el usuario es el autor", async () => {
    const mockUser = { userId: "10", role: "USER" };
    const mockExistingPost = { id: 1, authorId: 10, title: "Viejo título" };
    const mockUpdatedPost = { id: 1, authorId: 10, title: "Nuevo título" };

    prisma.post.findUnique.mockResolvedValue(mockExistingPost);
    prisma.post.update.mockResolvedValue(mockUpdatedPost);

    const result = await updatePost("1", "Nuevo título", "Nuevo contenido", mockUser, true, null);

    expect(prisma.post.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(prisma.post.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockUpdatedPost);
  });


  it("6. Debe lanzar CustomError 403 si el usuario no es el autor ni ADMIN", async () => {
    const mockUser = { userId: "99", role: "USER" };
    const mockExistingPost = { id: 1, authorId: 10 };

    prisma.post.findUnique.mockResolvedValue(mockExistingPost);

    await expect(
      updatePost("1", "Intento editar", "Contenido", mockUser, true, null)
    ).rejects.toMatchObject({
      status: 403,
      message: "No tienes permiso para modificar este post",
    });
  });


  it("7. Debe eliminar un post correctamente si el usuario es el autor o ADMIN", async () => {
    const mockUser = { userId: "10", role: "USER" };
    const mockExistingPost = { id: 1, authorId: 10 };

    prisma.post.findUnique.mockResolvedValue(mockExistingPost);
    prisma.post.delete.mockResolvedValue(mockExistingPost);

    const result = await deletePost("1", mockUser);

    expect(prisma.post.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockExistingPost);
  });
});