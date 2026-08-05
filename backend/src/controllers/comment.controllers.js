import {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} from "../services/comment.service.js";
import { success } from "../utils/response.js";

export const createCommentController = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const authorId = req.user.userId;

    const comment = await createComment(postId, content, authorId);

    success(res, comment, 201);
  } catch (err) {
    next(err);
  }
};

export const getCommentsByPostController = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const comments = await getCommentsByPost(postId);

    success(res, comments, 200);
  } catch (err) {
    next(err);
  }
};

export const updateCommentController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const data = req.body;

    const comment = await updateComment(id, userId, data);

    success(res, comment);
  } catch (err) {
    next(err);
  }
};

export const deleteCommentController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;

    await deleteComment(id, user);

    success(res, { message: "Comentario eliminado" });
  } catch (err) {
    next(err);
  }
};
