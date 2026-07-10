import { createComment } from "../services/comment.service";
import { success } from "../utils/response";

export const createCommentController = async (req, res, next) => {
  try {
    const postId = req.params;
    const content = req.body;

    const authorId = req.user.userId;

    const comment = await createComment(postId, content, authorId);

    success(res, comment, 201);
  } catch (err) {
    next(err);
  }
};
