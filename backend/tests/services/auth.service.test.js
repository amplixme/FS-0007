import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/repository/Prisma/prisma.db.js", () => ({
  default: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

vi.mock("bcrypt", () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn(),
  },
}));

vi.mock("../../src/utils/jwt.js", () => ({
  generateToken: vi.fn(),
}));

import prisma from "../../src/repository/Prisma/prisma.db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../src/utils/jwt.js";

import { register, login } from "../../src/services/auth.service.js";

beforeEach(() => {
  vi.clearAllMocks();
});

// ----- REGISTER tests (5) -----
it("debería registrar un usuario", async () => {
  prisma.user.findUnique.mockResolvedValue(null);

  bcrypt.hash.mockResolvedValue("passwordHasheada");

  prisma.user.create.mockResolvedValue({
    id: 1,
    email: "test@test.com",
    name: "Julio",
  });

  const result = await register(
    "test@test.com",
    "123456",
    "Julio"
  );

  expect(prisma.user.findUnique).toHaveBeenCalled();
  expect(prisma.user.create).toHaveBeenCalled();
  expect(result.user.email).toBe("test@test.com");
});

it("debería lanzar error si el usuario ya existe", async () => {
  prisma.user.findUnique.mockResolvedValue({ id: 1, email: "test@test.com" });

  await expect(register("test@test.com", "123456", "Julio")).rejects.toMatchObject({
    status: 409,
    message: "User already exists.",
  });

  expect(prisma.user.create).not.toHaveBeenCalled();
});

it("debería hashear la contraseña al registrar", async () => {
  prisma.user.findUnique.mockResolvedValue(null);

  const plainPassword = "miPassword";
  bcrypt.hash.mockResolvedValue("hashedPassword");
  prisma.user.create.mockResolvedValue({ id: 2, email: "a@b.com", name: "Ana" });

  await register("a@b.com", plainPassword, "Ana");

  expect(bcrypt.hash).toHaveBeenCalledWith(plainPassword, 10);
  expect(prisma.user.create).toHaveBeenCalled();
});

it("debería llamar a prisma.user.create con la contraseña hasheada y role 'USER'", async () => {
  prisma.user.findUnique.mockResolvedValue(null);

  bcrypt.hash.mockResolvedValue("hashedPassword123");

  prisma.user.create.mockResolvedValue({ id: 3, email: "c@d.com", name: "Carlos" });

  await register("c@d.com", "secret", "Carlos");

  expect(prisma.user.create).toHaveBeenCalledWith({
    data: {
      email: "c@d.com",
      password: "hashedPassword123",
      name: "Carlos",
      role: "USER",
    },
  });
});

it("debería propagar el error si prisma.user.create falla", async () => {
  prisma.user.findUnique.mockResolvedValue(null);
  bcrypt.hash.mockResolvedValue("x");
  prisma.user.create.mockRejectedValue(new Error("DB error"));

  await expect(register("err@d.com", "pwd", "Err")).rejects.toThrow("DB error");
});

// ----- LOGIN tests (5) -----
it("debería autenticar y devolver token al hacer login", async () => {
  const user = {
    id: 1,
    email: "test@test.com",
    password: "hashedPassword",
    name: "Julio",
    role: "USER",
  };

  prisma.user.findUnique.mockResolvedValue(user);
  bcrypt.compare.mockResolvedValue(true);
  generateToken.mockReturnValue("token123");

  const result = await login("test@test.com", "123456");

  expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: "test@test.com" } });
  expect(bcrypt.compare).toHaveBeenCalledWith("123456", "hashedPassword");
  expect(generateToken).toHaveBeenCalledWith(user);

  expect(result.token).toBe("token123");
  expect(result.user.email).toBe("test@test.com");
});

it("debería lanzar 401 si las credenciales son inválidas (usuario inexistente)", async () => {
  prisma.user.findUnique.mockResolvedValue(null);

  await expect(login("noexiste@test.com", "pwd")).rejects.toMatchObject({
    status: 401,
    message: "Invalid credentials",
  });
});

it("debería lanzar 401 si la contraseña es incorrecta", async () => {
  const user = { id: 4, email: "u@v.com", password: "hashed", name: "Uva", role: "USER" };
  prisma.user.findUnique.mockResolvedValue(user);
  bcrypt.compare.mockResolvedValue(false);

  await expect(login("u@v.com", "wrongpwd")).rejects.toMatchObject({
    status: 401,
    message: "Invalid credentials",
  });

  expect(bcrypt.compare).toHaveBeenCalledWith("wrongpwd", "hashed");
});

it("debería devolver el role del usuario en la respuesta", async () => {
  const user = { id: 5, email: "role@test.com", password: "p", name: "Rolo", role: "ADMIN" };
  prisma.user.findUnique.mockResolvedValue(user);
  bcrypt.compare.mockResolvedValue(true);
  generateToken.mockReturnValue("tkn");

  const res = await login("role@test.com", "p");

  expect(res.user.role).toBe("ADMIN");
  expect(res.user.name).toBe("Rolo");
});

it("debería propagar el error si generateToken falla", async () => {
  const user = { id: 6, email: "g@h.com", password: "ph", name: "Gen", role: "USER" };
  prisma.user.findUnique.mockResolvedValue(user);
  bcrypt.compare.mockResolvedValue(true);
  generateToken.mockImplementation(() => { throw new Error("jwt error"); });

  await expect(login("g@h.com", "ph")).rejects.toThrow("jwt error");
});
