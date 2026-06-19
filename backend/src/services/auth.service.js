import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const register = async (email, password, name) => {
    const existUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existUser) {
        const err = new Error("User already exists.");
        err.status = 409;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });

    return newUser;
}