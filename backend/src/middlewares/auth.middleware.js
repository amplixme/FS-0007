import passport from "passport";
import CustomError from "../utils/customError.js";

export const authMiddleware = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (info?.name === "TokenExpiredError") {
      return next(new CustomError(401, "Token expirado"));
    }

    if (!user) {
      return next(new CustomError(401, "No autorizado"));
    }

    req.user = user;
    next();
  })(req, res, next);
};
