import { useCallback, useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { getPosts } from "../services/post.service";
import Spinner from "../components/common/Spinner";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getPosts();
      setPosts(response.data);
    } catch {
      setError("Error al cargar las publicaciones");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  if (loading) return <Spinner />;

  if (error) {
    return <ErrorMessage message={error} onRetry={loadPosts} />;
  }

  if (!posts.length) {
    return <EmptyState message="Todavía no existen publicaciones." />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}