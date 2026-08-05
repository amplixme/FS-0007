import { Link, NavLink, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export default function PostCard({ post, onClickCat }) {
  const navigate = useNavigate();

  const extracto = post.content?.length > 150 ? `${post.content.slice(0, 150)}...` : post.content;

  const visibleCategories = post.categories?.slice(0, 3) || [];
  const hiddenCount = (post.categories?.length || 0) - visibleCategories.length;

  const goToAuthorProfile = () => {
    navigate(`/profile/${post.authorId}`);
  };
  const colors = ["bg-secondary-container text-on-secondary-container", "bg-tertiary-fixed text-on-tertiary-fixed"];

  return (
    <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {post.coverImage ? (
        <div to={`/posts/${post.id}`} aria-label={`Ver publicación: ${post.title}`} className="aspect-video overflow-hidden">
          <img
            src={post.coverImage}
            alt={`Portada de la publicación ${post.title}`}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <Link
          to={`/posts/${post.id}`}
          aria-label={`Ver publicación: ${post.title}`}
          className="block aspect-video w-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400"
        />
      )}

      <div className="p-8">
        <div className="mb-3 flex flex-wrap gap-2">
          {visibleCategories.map((category, index) => (
            <button
              key={category.slug}
              type="button"
              className={`inline-block px-3 py-1 ${colors[index % colors.length]} text-[10px] font-extrabold uppercase tracking-widest rounded-full mb-4`}
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

        <h2>
          <Link
            to={`/posts/${post.id}`}
            className="text-2xl font-bold text-on-surface mb-3 tight-tracking line-clamp-2 leading-tight group-hover:text-primary transition-colors"
          >
            {post.title}
          </Link>
        </h2>

        <p className="text-on-surface-variant line-clamp-3 leading-relaxed mb-6 text-sm">{extracto}</p>

        <div className="flex items-center justify-between border-t border-surface-container pt-6">
          <NavLink to={`/profile/${post.authorId}`} className="flex items-center gap-3">
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
          </NavLink>


          <div className="flex items-center gap-1 text-slate-600">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              forum
            </span>
            <span className="text-xs font-medium">{post._count?.comments || 0}</span>
            <span className="sr-only">comentarios</span>
          </div>
        </div>
      </div>
    </article >
  );
}
