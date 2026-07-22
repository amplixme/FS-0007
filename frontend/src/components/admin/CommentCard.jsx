import { useEffect, useState } from "react";
import { deleteAdminComment, getAdminComment } from "../../services/admin.service.js";
import ConfirmModal from "../common/ConfirmModal.jsx";
import Pagination from "../common/Pagination.jsx";

const CommentCards = () => {
    const [comentarios, setComentarios] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null);
    const [toast, setToast] = useState({
        show: false, message: "", type: "success",
    });

    const loadCommentData = async (currPage = 1) => {
        try {
            setIsLoading(true);
            const commentData = await getAdminComment({ page: currPage, limit: 5 });
            setComentarios(commentData.data.data);
            setTotalPages(commentData.data.totalPages);

            setError(null);
        } catch (err) {
            setError(err.response?.data?.error?.message || "Error al cargar el panel");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadCommentData(page);
    }, [page]);

    useEffect(() => {
        if (!toast.show) return;
        const timer = setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
        }, 15000);
        return () => clearTimeout(timer);
    }, [toast.show]);

    const eliminarcomentario = async () => {
        try {
            setIsModalOpen(false);
            await deleteAdminComment(postIdToDelete);
            setToast({
                show: true,
                message: "¡Comentario eliminado con éxito!",
                type: "success",
            });
        } catch (err) {
            setToast({
                show: true,
                message: err.message || "Hubo un error al intentar eliminar el comentario",
                type: "error",
            });
        }
        loadCommentData()
    }
    const openModal = (postId) => {
        setPostIdToDelete(postId);
        setIsModalOpen(true);
    }

    if (isLoading) {
        return (
            <section className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col">
                <div className="p-6 flex items-center justify-between border-b border-surface-container-low">
                    <h2 className="text-xl font-bold">Comentarios recientes</h2>
                </div>
                <div className="p-6 flex flex-col gap-4 flex-grow">
                    <p className="text-on-surface-variant">Cargando comentarios...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col">
                <div className="p-6 flex items-center justify-between border-b border-surface-container-low">
                    <h2 className="text-xl font-bold">Comentarios recientes</h2>
                    <span
                        className="bg-error/10 text-error px-2.5 py-0.5 rounded-full text-xs font-bold">Error</span>
                </div>
                <div className="p-6 flex flex-col gap-4 flex-grow">
                    <p className="text-on-surface-variant">Error al cargar comentarios.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="p-6 flex items-center justify-between border-b border-surface-container-low">
                <h2 className="text-xl font-bold">Comentarios recientes</h2>
                <span className="bg-surface-container-low text-on-surface-variant px-2.5 py-0.5 rounded-full text-xs font-bold">
                    {comentarios.length}
                </span>
            </div>
            <div className="p-6 flex flex-col gap-4 flex-grow">
                {(comentarios.length === 0) ? (
                    <p className="text-on-surface-variant">No hay comentarios recientes.</p>
                ) : (comentarios.map((c) => (
                    <div className="flex flex-col gap-2 pb-4 border-b border-surface-container-low last:border-0" key={c.id}>
                        <p className="text-sm line-clamp-2 text-on-surface italic">{c.content}</p>
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold">@{c.author.name}</span>
                                <span className="text-[10px] text-on-surface-variant">En: {c.post.title}</span>
                            </div>
                            <button className="text-error p-1 rounded-full hover:bg-error-container/20 transition-colors"
                                onClick={() => openModal(c.id)}>
                                <span className="material-symbols-outlined text-[18px]" data-icon="delete">delete</span>
                            </button>
                        </div>
                    </div>
                )))}
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
                onConfirm={eliminarcomentario}
                title="¿Estás seguro de que deseas eliminar este Comentario?"
                message="Esta acción no se puede deshacer y eliminará el comentario permanentemente."
            />
        </section>
    )
}

export default CommentCards;