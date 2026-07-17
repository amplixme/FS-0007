import { useNavigate } from "react-router-dom";
//import { formatRelativeTime } from "../utils/time";
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
        <div className="flex flex-wrap gap-2 mb-3">
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
        <h2 className="mb-1 text-lg font-semibold">{post.title}</h2>

        <p className="mb-3 text-sm text-gray-600">{extracto}</p>

        <div className="flex items-center justify-between pt-6 border-t border-surface-container">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary-fixed overflow-hidden">
              <img alt="Author" className="w-full h-full object-cover"
                data-alt="friendly woman with artistic style smiling, bright studio portrait with warm tones"
                src={post.author?.avatarUrl 
                      ? post.author?.avatarUrl
                      : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                    }
              />
            </div>
            <div>
              <p
                className="text-xs font-bold"
                onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/profile/${post.authorId}`)
                  }
                }
              >
                {post.author?.name || "Autor desconocido"}
              </p>
              <p className="text-[10px] text-outline">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: es })}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-outline">
            <span className="material-symbols-outlined text-sm">forum</span>
            <span className="text-xs font-medium">{post._count.comments || 0}</span>
          </div>
        </div>
      </div>
    </article >
  );
}