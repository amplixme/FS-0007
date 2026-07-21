import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import CategoryFilter from "../components/CategoryFilter";
import Pagination from "../components/common/Pagination";
import { getPosts } from "../services/post.service";
import Spinner from "../components/common/Spinner";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";

const POSTS_LIMIT = 10;

const SORT_OPTIONS = [
  { value: "newest", label: "Más recientes" },
  { value: "oldest", label: "Más antiguos" },
  { value: "comments", label: "Más comentados" },
];

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeSlug = searchParams.get("category");
  const currentPage = Number(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || "newest";
  const search = searchParams.get("search") || undefined;

  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPosts = useCallback(() => {
    setLoading(true);
    setError(null);

    getPosts({
      page: currentPage,
      limit: POSTS_LIMIT,
      category: activeSlug,
      sort,
      search,
    })
      .then((data) => {
        setPosts(data.data || []);
        setPagination({
          total: data.total || 0,
          page: data.page || currentPage,
          totalPages: data.totalPages || 1,
        });
      })
      .catch(() => setError("Error al cargar las publicaciones"))
      .finally(() => setLoading(false));
  }, [activeSlug, currentPage, sort, search]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const updateSearchParams = (updates) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        nextParams.set(key, value);
      } else {
        nextParams.delete(key);
      }
    });

    setSearchParams(nextParams);
  };

  const handleCategoryChange = (slug) => {
    updateSearchParams({
      category: slug,
      page: "1",
    });
  };

  const handlePageChange = (page) => {
    updateSearchParams({
      page: String(page),
    });
  };

  const handleSortChange = (event) => {
    updateSearchParams({
      sort: event.target.value,
      page: "1",
    });
  };

  return (
    <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-[260px_1fr] md:p-8">
      <aside className="rounded-2xl bg-white md:sticky md:top-8 md:self-start md:py-4 md:shadow-sm">
        <CategoryFilter activeSlug={activeSlug} onChange={handleCategoryChange} />
      </aside>

      <main>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Publicaciones</h1>

          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            Ordenar por
            <select
              value={sort}
              onChange={handleSortChange}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {loading && <Spinner />}

        {!loading && error && (
          <ErrorMessage message={error} onRetry={loadPosts} />
        )}

        {!loading && !error && !posts.length && (
          <EmptyState message="Todavía no existen publicaciones." />
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="flex-1">
            <div className="grid gap-8 md:grid-cols-2">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onClickCat={handleCategoryChange}
                />
              ))}
            </div>

            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </main>
    </div>
  );
}