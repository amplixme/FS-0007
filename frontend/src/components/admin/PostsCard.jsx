import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";
import { getPosts } from "../../services/post.service";
import { deleteAdminPost } from "../../services/admin.service";
import ConfirmModal from "../common/ConfirmModal";
import Pagination from "../common/Pagination";

const PostsCard = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null);
    const [toast, setToast] = useState({
        show: false, message: "", type: "success",
    });

    const loadPostsData = async (currPage = 1) => {
        try {
            setIsLoading(true);
            const postsData = await getPosts({ page: currPage, limit: 10, sort: "desc" });
            setPosts(postsData.data);
            setTotalPages(postsData.totalPages);
            setError(null);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error?.message || "Error al cargar el panel");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadPostsData(page);
    }, [page]);

    useEffect(() => {
        if (!toast.show) return;
        const timer = setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
        }, 15000);
        return () => clearTimeout(timer);
    }, [toast.show]);

    const eliminarpost = async () => {
        try {
            setIsModalOpen(false);
            await deleteAdminPost(postIdToDelete);
            setToast({
                show: true,
                message: "¡Publicación eliminada con éxito!",
                type: "success",
            });
        } catch (err) {
            setToast({
                show: true,
                message: err.message || "Hubo un error al intentar eliminar el post",
                type: "error",
            });
        }
        loadPostsData(page);
    }

    const openModal = (postId) => {
        setPostIdToDelete(postId);
        setIsModalOpen(true);
    }

    if (isLoading) {
        return (
            <main className="pt-24 pb-16 px-8 max-w-7xl mx-auto w-full">
                <p className="text-on-surface-variant">Cargando publicaciones...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="pt-24 pb-16 px-8 max-w-7xl mx-auto w-full">
                <p className="text-error font-medium">{error}</p>
            </main>
        );
    }

    return (
        <section className="mt-8 bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-surface-container-low">
                <h2 className="text-xl font-bold">Publicaciones recientes</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead
                        className="bg-surface-container-low text-on-surface-variant uppercase text-[11px] font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Título</th>
                            <th className="px-6 py-4">Autor</th>
                            <th className="px-6 py-4">Categorías</th>
                            <th className="px-6 py-4">Fecha</th>
                            <th className="px-6 py-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container-low">
                        {posts.map((p) => (
                            <tr key={p.id}>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded bg-slate-200 overflow-hidden flex-shrink-0">
                                            <img className="w-full h-full object-cover"
                                                data-alt="minimalist workspace with a laptop and coffee cup on a clean white desk with natural light"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaSv0-_EhZ5sZwLXxvYZkAuvMoqsn4xBKiS9VU-8kvqG4T7VUxvrvDleGoCXpYDcTW0NPri9kZLNAgCHu_sepGfhQvpExJ789tHoHYOVfANzy91Zx6Ln_72Q0Faz9tla9aDtT-y3sqMYCGosqIETixr38cgc5nKHrWb6nb6eZ9nUEpk2geJG1-RDqNv4Q2qBjqX6ZwWsjD7vYCljKe4u_XF-AB4EeAP5th39_uBUyOvyQEILRPPMHvASiuIYTUmP3Ixwrg2c2J4mjV" />
                                        </div>
                                        <span className="font-semibold line-clamp-1">{p.title}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{p.author.name}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-1">
                                        {p.categories.map((cat, index) => (
                                            <span
                                                key={index}
                                                className="bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] px-2 py-0.5 rounded-full font-medium"
                                            >
                                                {cat.name}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-on-surface-variant">{formatDistanceToNow(new Date(p.createdAt), { addSuffix: true, locale: es })}</td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        className="text-error hover:bg-error-container/20 p-2 rounded-full transition-colors inline-flex align-middle"
                                        onClick={() => openModal(p.id)}>
                                        <span className="material-symbols-outlined" data-icon="delete">delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-4">
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </div>
            {toast.show && (
                <div
                    className={`fixed top-6 right-6 z-50 flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-300 ${toast.type === "success"
                        ? "bg-emerald-50 text-emerald-800"
                        : "bg-red-50 text-red-800"
                        }`}
                >
                    <span
                        className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs text-white ${toast.type === "success" ? "bg-emerald-600" : "bg-red-600"
                            }`}
                    >
                        {toast.type === "success" ? "✓" : "✕"}
                    </span>
                    <p className="text-sm font-medium">{toast.message}</p>
                </div>
            )}
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={eliminarpost}
                title="¿Estás seguro de que deseas eliminar este artículo?"
                message="Esta acción no se puede deshacer y eliminará el post permanentemente."
            />
        </section >
    )
}

export default PostsCard;