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

        <div className="flex items-center justify-between pt-6 border-t border-surface-container">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary-fixed overflow-hidden">
              <img alt="Author" className="w-full h-full object-cover"
                data-alt="friendly woman with artistic style smiling, bright studio portrait with warm tones"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxfJ7jX1JeifoJSEDRlUgWY4EG3Oy8QYun6HYH4D2nTuvs82HNMnFI7QjaYEfGbC-TPGTNsriNT9w7CsE6SSyhT9sPeX_yYa1Gk8jXkBAdjKYncivpfdbjIC69pW2HLJgGN3jAJD4I2zq7qZqeUcieNUblltJouIHJhnF-B6ntJi6Dg4jwuTMiDBKFCjcULPynm-XlI0KETN92Y4qL0-ojDewsLIguLPGv7j_Ju_ARqT0gK0ZZOHvASKXPog-r4g3oq1zDJJp5xLeq" />
            </div>
            <span>{post.author?.name || "Autor desconocido"}</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1 text-outline">
            <span className="material-symbols-outlined text-sm">forum</span>
            <span className="text-xs font-medium">{post.commentCount || 0}</span>
          </div>
        </div>
      </div>
    </article >
  );
}