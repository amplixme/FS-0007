const UserCards = ({ users }) => {
    if (!users) return <div className="text-on-surface-variant">Cargando Usuarios...</div>;

    const verTodos = () => {
        console.log("Ver todos los usuarios");
    }

    const cambiarRol = (id) => {
        console.log(`Cambiar rol del usuario con ID: ${id}`);
    }

    const eliminarUsuario = (id) => {
        console.log(`Eliminar usuario con ID: ${id}`);
    }

    return (
        <section className="xl:col-span-2 bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
            <div className="p-6 flex items-center justify-between border-b border-surface-container-low">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold">Usuarios</h2>
                    <span
                        className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-xs font-bold">1,240</span>
                </div>
                <button className="text-primary text-sm font-semibold hover:underline" onClick={verTodos}>
                    Ver todos
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead
                        className="bg-surface-container-low text-on-surface-variant uppercase text-[11px] font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Nombre</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Rol</th>
                            <th className="px-6 py-4">Fecha de registro</th>
                            <th className="px-6 py-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container-low">
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td className="px-6 py-4 font-medium">{u.name}</td>
                                <td className="px-6 py-4 text-on-surface-variant">{u.email}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase ${u.role === 'ADMIN' ? 'bg-[#3A6BFF]' : 'bg-[#3AFFA5]'}`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-on-surface-variant">{new Date(u.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button
                                        className="px-3 py-1 border border-outline-variant rounded-full text-xs hover:bg-surface-container-low transition-colors"
                                        onClick={() => cambiarRol(u.id)}
                                    >
                                        Cambiar rol
                                    </button>
                                    <button
                                        className="text-error hover:bg-error-container/20 p-1 rounded-full transition-colors inline-flex align-middle"
                                        onClick={() => eliminarUsuario(u.id)}
                                    >
                                        <span className="material-symbols-outlined text-[18px]"
                                            data-icon="delete">delete</span>
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

export default UserCards;