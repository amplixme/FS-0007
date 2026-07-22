import { Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export default function PostCard({ post, onClickCat }) {
  const navigate = useNavigate();

  const extracto =
    post.content?.length > 150
      ? `${post.content.slice(0, 150)}...`
      : post.content;

  const visibleCategories = post.categories?.slice(0, 3) || [];
  const hiddenCount = (post.categories?.length || 0) - visibleCategories.length;

  const goToAuthorProfile = () => {
    navigate(`/profile/${post.authorId}`);
  };

  return (
    <article className="overflow-hidden rounded-lg border transition hover:shadow-md">
      {post.coverImage ? (
        <Link to={`/posts/${post.id}`} aria-label={`Ver publicación: ${post.title}`}>
          <img
            src={post.coverImage}
            alt={`Portada de la publicación ${post.title}`}
            loading="lazy"
            className="aspect-video w-full object-cover"
          />
        </Link>
      ) : (
        <Link
          to={`/posts/${post.id}`}
          aria-label={`Ver publicación: ${post.title}`}
          className="block aspect-video w-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400"
        />
      )}

      <div className="p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {visibleCategories.map((category) => (
            <button
              key={category.slug}
              type="button"
              className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => onClickCat(category.slug)}
            >
              {category.name}
            </button>
          ))}

          {hiddenCount > 0 && (
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
              +{hiddenCount}
            </span>
          )}
        </div>

        <h2 className="mb-1 text-lg font-semibold">
          <Link
            to={`/posts/${post.id}`}
            className="text-slate-900 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {post.title}
          </Link>
        </h2>

        <p className="mb-3 text-sm text-gray-700">{extracto}</p>

        <div className="flex items-center justify-between border-t border-surface-container pt-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 overflow-hidden rounded-full bg-secondary-fixed">
              <img
                alt={`Avatar de ${post.author?.name || "autor desconocido"}`}
                className="h-full w-full object-cover"
                src={
                  post.author?.avatarUrl
                    ? post.author.avatarUrl
                    : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                }
              />
            </div>

            <div>
              <button
                type="button"
                className="text-left text-xs font-bold text-slate-900 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={goToAuthorProfile}
              >
                {post.author?.name || "Autor desconocido"}
              </button>

              <p className="text-[10px] text-slate-600">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                  locale: es,
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-slate-600">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              forum
            </span>
            <span className="text-xs font-medium">
              {post._count?.comments || 0}
            </span>
            <span className="sr-only">comentarios</span>
          </div>
        </div>
      </div>
    </article>
  );
}