import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import CategoryFilter from "../components/CategoryFilter";
import { getPosts } from "../services/post.service";
import Spinner from "../components/common/Spinner";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSlug = searchParams.get("category");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPosts = useCallback(() => {
    setLoading(true);
    setError(null);

    getPosts(activeSlug)
      .then((data) => setPosts(data.data))
      .catch(() => setError("Error al cargar las publicaciones"))
      .finally(() => setLoading(false));
  }, [activeSlug]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleCategoryChange = (slug) => {
    setSearchParams(slug ? { category: slug } : {});
  };

  return (
    <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-[260px_1fr] md:p-8">
      <aside className="rounded-2xl bg-white md:sticky md:top-8 md:self-start md:py-4 md:shadow-sm">
        <CategoryFilter activeSlug={activeSlug} onChange={handleCategoryChange} />
      </aside>

      <main>
        {loading && <Spinner />}

        {!loading && error && (
          <ErrorMessage message={error} onRetry={loadPosts} />
        )}

        {!loading && !error && !posts.length && (
          <EmptyState message="Todavía no existen publicaciones." />
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="flex-1">
            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} onClickCat={handleCategoryChange} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}