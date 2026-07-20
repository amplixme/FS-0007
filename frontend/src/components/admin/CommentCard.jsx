const CommentCards = ({ comentarios }) => {
    if (!comentarios || comentarios.length === 0) return <div className="text-on-surface-variant">No hay comentarios recientes.</div>;

    const eliminarcomentario = (id) => {
        console.log(`Eliminar comentario con ID: ${id}`);
    }

    return (
        <section className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="p-6 flex items-center justify-between border-b border-surface-container-low">
                <h2 className="text-xl font-bold">Comentarios recientes</h2>
            </div>
            <div className="p-6 flex flex-col gap-4 flex-grow">
                {comentarios.map((c) => (
                    <div className="flex flex-col gap-2 pb-4 border-b border-surface-container-low last:border-0" key={c.id}>
                        <p className="text-sm line-clamp-2 text-on-surface italic">{c.text}</p>
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold">@{c.auth}</span>
                                <span className="text-[10px] text-on-surface-variant">En: {c.post}</span>
                            </div>
                            <button className="text-error p-1 rounded-full hover:bg-error-container/20 transition-colors"
                                onClick={() => eliminarcomentario(c.id)}>
                                <span className="material-symbols-outlined text-[18px]" data-icon="delete">delete</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default CommentCards;