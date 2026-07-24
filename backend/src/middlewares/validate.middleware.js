import { ZodError } from "zod";

export const validate = (schema) => {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = new Error(
          error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join(", ")
        );
        validationError.status = 400;

        return next(validationError);
      }

      next(error);
    }
  };
};
