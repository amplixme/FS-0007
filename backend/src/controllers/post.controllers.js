import { create } from "../services/post.service.js";
import { success } from "../utils/response.js";

export const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user.userId;

    const result = await create(title, content, authorId);
    
    success(res, result, 201); 
  } catch (err) {
    next(err);
  }
};