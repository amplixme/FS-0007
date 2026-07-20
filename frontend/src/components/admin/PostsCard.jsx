import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

const PostsCard = ({ posts }) => {
    if (!posts || posts.length === 0) return <div className="text-on-surface-variant">No hay publicaciones recientes.</div>;
    console.log(posts);
    const eliminarpost = (id) => {
        console.log(`Eliminar post con ID: ${id}`);
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
                        {posts.data.map((p) => (
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
                                        onClick={() => eliminarpost(p.id)}>
                                        <span className="material-symbols-outlined" data-icon="delete">delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default PostsCard;