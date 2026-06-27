import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createPost } from "../services/post.service";

export default function CreatePost() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [published, setPublished] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = "TuProyecto - Crear publicación";
    }, []);

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            setError("El título y el contenido son obligatorios");
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const post = await createPost({ title, content, published, authorId: user.id });
            navigate(`/posts/${post.data.id}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="pt-32 pb-40 px-6 max-w-[800px] mx-auto">
            <section className="mb-8">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-transparent border-none p-0 text-[3.5rem] font-extrabold tracking-tight placeholder:text-on-surface-variant/30 focus:ring-0 leading-[1.1] text-on-surface"
                    placeholder="Título del artículo"
                    type="text"
                />
            </section>

            <article className="min-h-[400px] mb-12">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full min-h-[400px] bg-transparent border-none p-0 text-[1.125rem] leading-[1.75] text-on-surface placeholder:text-outline/40 focus:outline-none resize-none"
                    placeholder="Escribe tu artículo aquí..."
                />
            </article>

            {error && <p className="text-error text-sm mb-4">{error}</p>}

            <section className="mt-20 pt-12 border-t border-outline-variant/15">
                <div className="flex items-center justify-between p-6 bg-surface-container-low rounded-xl">
                    <div>
                        <h4 className="font-bold text-on-surface">Visibilidad y Programación</h4>
                        <p className="text-sm text-on-surface-variant">
                            Configura cuándo será visible este artículo para tus lectores.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-on-surface">
                            {published ? "Publicar ahora" : "Guardar borrador"}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                checked={published}
                                onChange={(e) => setPublished(e.target.checked)}
                                className="sr-only peer"
                                type="checkbox"
                            />
                            <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                        </label>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="mt-6 w-full py-3 bg-primary text-on-primary font-semibold rounded-xl hover:opacity-90 transition disabled:opacity-50"
                >
                    {loading ? "Publicando..." : published ? "Publicar" : "Guardar borrador"}
                </button>
            </section>
        </main>
    );
}