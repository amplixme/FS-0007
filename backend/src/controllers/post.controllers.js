import {
  create,
  getAllPublishedPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../services/post.service.js";
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

export const updatePostController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await updatePost(id, title, content, req.user);
    success(res, post, 200);
  } catch (err) {
    next(err);
  }
};

export const deletePostController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deletePost(id, req.user);
    success(res, { message: "Post eliminado correctamente" });
  } catch (err) {
    next(err);
  }
};
