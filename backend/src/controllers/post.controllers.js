import { create, getAllPublishedPosts, getPostById } from "../services/post.service.js";
import { success } from "../utils/response.js";

export const createPost = async (req, res, next) => {
  try {
    const { title, content, published } = req.body;
    const authorId = req.user.userId;

    const result = await create(title, content, authorId, published);

    success(res, result, 201);
  } catch (err) {
    next(err);
  }
};

export const getPostsController = async (req, res, next) => {
  try {
    const posts = await getAllPublishedPosts();
    success(res, posts, 200);
  } catch (err) {
    next(err);
  }
};

export const getPostByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await getPostById(id);
    success(res, post, 200);
  } catch (err) {
    next(err);
  }
};