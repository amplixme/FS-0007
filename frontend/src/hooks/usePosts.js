import { useState, useEffect, useCallback } from "react";
import { getPosts } from "../services/post.service";

export const usePosts = ({ category, authorId }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getPosts({ category, authorId });
      setPosts(data.data);
    } catch (error) {
      setError("Error al cargar las publicaciones");
    } finally {
      setIsLoading(false);
    }
  }, [category, authorId]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return {
    posts,
    isLoadingPost: isLoading,
    errorPost: error,
    reloadPosts: loadPosts,
  };
};
