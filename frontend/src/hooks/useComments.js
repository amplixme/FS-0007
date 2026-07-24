import { useCallback, useEffect, useState } from "react";
import {
  getCommentByPostId,
  createComment as createCommentService,
  updateComment as updateCommentService,
  deleteComment as deleteCommentService,
} from "../services/comment.service";

export default function useComments(postId) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loadComments = useCallback(async () => {
    if (!postId) return;

    try {
      setIsLoading(true);

      const response = await getCommentByPostId(postId);

      setComments(response.data || []);
    } catch (err) {
      setError(err.message || "No se pudieron cargar los comentarios.");
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const createComment = async (data) => {
    try {
      await createCommentService(postId, data);
      await loadComments();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateComment = async (id, data) => {
    try {
      await updateCommentService(id, data);
      await loadComments();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteComment = async (id) => {
    try {
      await deleteCommentService(id);
      await loadComments();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    comments,
    isLoading,
    error,
    loadComments,
    createComment,
    updateComment,
    deleteComment,
  };
}
