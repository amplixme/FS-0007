import { useNavigate } from "react-router-dom";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  const extracto =
    post.content?.length > 150
      ? `${post.content.slice(0, 150)}...`
      : post.content;

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
      </div>
    </article>
  );
}