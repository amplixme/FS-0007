import { useNavigate } from "react-router-dom";

export default function PostCard({ post, onClickCat }) {
  const navigate = useNavigate();

  const extracto =
    post.content?.length > 150
      ? `${post.content.slice(0, 150)}...`
      : post.content;

  const visibleCategories = post.categories?.slice(0, 3) || [];
  const hiddenCount = (post.categories?.length || 0) - visibleCategories.length;

  return (
    <article
      onClick={() => navigate(`/posts/${post.id}`)}
      className="cursor-pointer overflow-hidden rounded-lg border transition hover:shadow-md"
    >
      {post.coverImage ? (
        <img
          src={post.coverImage}
          alt={`Portada de ${post.title}`}
          loading="lazy"
          className="aspect-video w-full object-cover"
        />
      ) : (
        <div className="aspect-video w-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400" />
      )}

      <div className="p-4">
        <h2 className="mb-1 text-lg font-semibold">{post.title}</h2>

        <p className="mb-3 text-sm text-gray-600">{extracto}</p>

        <div className="flex justify-between text-xs text-gray-400">
          <span>{post.author?.name || "Autor desconocido"}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex mt-3 flex-wrap gap-2 mb-3">
          {visibleCategories.map((category) => (
            <button
              key={crypto.randomUUID()}
              className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200"
              onClick={(e) => {
                  e.stopPropagation()
                  onClickCat(category.slug)
                }
              }
            >
              {category.name}
            </button>
          ))}

          {hiddenCount > 0 && (
            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
              +{hiddenCount}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}