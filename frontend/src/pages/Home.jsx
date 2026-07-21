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
const SEARCH_DEBOUNCE_TIME = 300;

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeSlug = searchParams.get("category");
  const currentPage = Number(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || undefined;
  const search = searchParams.get("search") || "";

  const [posts, setPosts] = useState([]);
  const [searchInput, setSearchInput] = useState(search);
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
      search: search || undefined,
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

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const updateSearchParams = useCallback(
    (updates) => {
      const nextParams = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          nextParams.set(key, value);
        } else {
          nextParams.delete(key);
        }
      });

      setSearchParams(nextParams);
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    const normalizedSearch = searchInput.trim();

    if (normalizedSearch === search) {
      return;
    }

    const timeoutId = setTimeout(() => {
      updateSearchParams({
        search: normalizedSearch,
        page: "1",
      });
    }, SEARCH_DEBOUNCE_TIME);

    return () => clearTimeout(timeoutId);
  }, [searchInput, search, updateSearchParams]);

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

  const handleClearSearch = () => {
    setSearchInput("");
    updateSearchParams({
      search: "",
      page: "1",
    });
  };

  return (
    <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-[260px_1fr] md:p-8">
      <aside className="rounded-2xl bg-white md:sticky md:top-8 md:self-start md:py-4 md:shadow-sm">
        <CategoryFilter activeSlug={activeSlug} onChange={handleCategoryChange} />
      </aside>

      <main>
        <div className="mb-6">
          <label
            htmlFor="post-search"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Buscar publicaciones
          </label>

          <div className="relative">
            <input
              id="post-search"
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Buscar por título o contenido..."
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 pr-10 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />

            {searchInput && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500 hover:text-slate-800"
                aria-label="Limpiar búsqueda"
              >
                X
              </button>
            )}
          </div>
        </div>

        {loading && <Spinner />}

        {!loading && error && (
          <ErrorMessage message={error} onRetry={loadPosts} />
        )}

        {!loading && !error && !posts.length && (
          <EmptyState message="No se encontraron publicaciones." />
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