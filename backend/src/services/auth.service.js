import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import prisma from "../repository/Prisma/prisma.db.js";
import CustomError from "../utils/customError.js";

export const register = async (email, password, name) => {
  const existUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existUser) throw new CustomError(409, "User already exists.");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: "USER",
    },
  });

  return {
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    },
  };
};

export const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new CustomError(401, "Invalid credentials");

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) throw new CustomError(401, "Invalid credentials");

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatarUrl: user.avatarUrl
    },
  };
};
