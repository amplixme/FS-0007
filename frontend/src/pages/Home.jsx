import { useCallback, useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import CategoryFilter from "../components/CategoryFilter";
import Pagination from "../components/common/Pagination";
import { getPosts } from "../services/post.service";
import Spinner from "../components/common/Spinner";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";

const POSTS_LIMIT = 10;
const SEARCH_DEBOUNCE_TIME = 300;

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
    [searchParams, setSearchParams]
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

  const handleSortChange = (event) => {
    updateSearchParams({
      sort: event.target.value,
      page: "1",
    });
  };

  return (
    <>
      <section className="mb-16">
        <div className="relative p-6 sm:p-8 md:p-12 rounded-3xl overflow-hidden bg-gradient-to-br from-primary/5 to-primary-container/10 flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          <div className="relative z-10 w-full md:max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-on-surface mb-4 sm:mb-6 tight-tracking leading-tight">
              Últimas publicaciones
            </h1>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-outline">search</span>
              <input
                className="w-full pl-12 pr-6 py-3 sm:py-4 bg-surface-container-lowest border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-primary/20 transition-all text-base sm:text-lg placeholder:text-outline/50"
                placeholder="Buscar artículos..."
                type="text"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end w-full md:w-auto" style={{ marginTop: "auto" }}>
            <div className="relative w-full sm:w-56">
              <select
                value={sort}
                onChange={handleSortChange}
                className="w-full appearance-none pl-4 pr-10 py-3 sm:py-4 bg-surface-container-lowest border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-primary/20 transition-all text-base sm:text-lg text-on-surface"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline">
                expand_more
              </span>
            </div>
          </div>
        </div>
      </section>
      <div className="flex gap-12">
        <CategoryFilter activeSlug={activeSlug} onChange={handleCategoryChange} />

        {loading && <Spinner />}

        {!loading && error && <ErrorMessage message={error} onRetry={loadPosts} />}

        {!loading && !error && !posts.length && (
          <EmptyState message="No se encontraron publicaciones." />
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="flex-1">
            <div className="grid gap-8 md:grid-cols-2">
              {posts.map((post) => (
                <NavLink key={post.id} to={`/posts/${post.id}`}>
                  <PostCard key={post.id} post={post} onClickCat={handleCategoryChange} />
                </NavLink>
              ))}
            </div>

            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </>
  );
}
