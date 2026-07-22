import { register, login } from "../services/auth.service.js";
import { success } from "../utils/response.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const result = await register(email, password, name);
    success(res, result, 201);
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    success(res, result, 200);
  } catch (err) {
    next(err);
  }
};
