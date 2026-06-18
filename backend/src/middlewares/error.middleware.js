import { Prisma } from "@prisma/client";
import { error } from "../utils/response.js";

export const errorHandler = (err, req, res, next) => {

    console.error(err);

    if (err instanceof Prisma.PrismaClientKnownRequestError) {

        switch (err.code) {

            case "P2002":
                return error(
                    res,
                    "The resource already exists.",
                    409
                );

            case "P2025":
                return error(
                    res,
                    "Not found.",
                    404
                );

            default:
                return error(
                    res,
                    err.message,
                    500
                );
        }

    }

    return error(
        res,
        err.message || "Internal Server Error.",
        err.status || 500
    );
};