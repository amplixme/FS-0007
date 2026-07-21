import { useEffect, useState } from "react";
import { deleteAdminUser, getAdminUsers, toggleAdminUserRole } from "../../services/admin.service";
import ConfirmModal from "../common/ConfirmModal";
import { ModalEditUser } from "./EditModal";

const UserCards = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenChangeRole, setIsModalOpenChangeRole] = useState(false);
    const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);

    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [userIdToChangeRole, setUserIdToChangeRole] = useState(null);
    const [userToUpdate, setUserToUpdate] = useState(null);

    const [toast, setToast] = useState({
        show: false, message: "", type: "success",
    });

    const loadUserData = async () => {
        try {
            setIsLoading(true);
            const usersData = await getAdminUsers();
            setUsers(usersData.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.error?.message || "Error al cargar el panel");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    const cambiarRol = async () => {
        setIsModalOpenChangeRole(false);
        const res = await toggleAdminUserRole(userIdToChangeRole);
        console.log(res);
        loadUserData()
    }

    const eliminarUsuario = async () => {
        try {
            setIsModalOpenDelete(false);
            await deleteAdminUser(userIdToDelete);
            setToast({
                show: true,
                message: "¡Usuario eliminado con éxito!",
                type: "success",
            });
        } catch (err) {
            setToast({
                show: true,
                message: err.message || "Hubo un error al intentar eliminar el usuario",
                type: "error",
            });
        }
        loadUserData()
    }

    if (isLoading) {
        return (
            <section className="xl:col-span-2 bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
                <div className="p-6 flex items-center justify-between border-b border-surface-container-low">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold">Usuarios</h2>
                    </div>
                </div>
                <div className="p-6">
                    <p className="text-on-surface-variant">Cargando usuarios...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="xl:col-span-2 bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
                <div className="p-6 flex items-center justify-between border-b border-surface-container-low">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold">Usuarios</h2>
                        <span
                            className="bg-error/10 text-error px-2.5 py-0.5 rounded-full text-xs font-bold">Error</span>
                    </div>
                </div>
                <div className="p-6">
                    <p className="text-on-surface-variant">Error al cargar usuarios.</p>
                </div>
            </section>
        );
    }

    const openModalDelete = (userId) => {
        setUserIdToDelete(userId);
        setIsModalOpenDelete(true);
    }
    const openModalChangeRole = (userId) => {
        setUserIdToChangeRole(userId);
        setIsModalOpenChangeRole(true);
    }

    const openModalUpdate = (user) => {
        setUserToUpdate(user);
        setIsModalOpenUpdate(true);
    }

    const openModalCreate = () => {
        setUserToUpdate(null);
        setIsModalOpenUpdate(true);
    }
    const closeModalUpdate = () => {
        setUserToUpdate(null);
        setIsModalOpenUpdate(false);
        loadUserData();
    }

    return (
        <section className="xl:col-span-2 bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
            <div className="p-6 flex items-center justify-between border-b border-surface-container-low">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold">Usuarios</h2>
                    <span
                        className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-xs font-bold">{users.length || 0}</span>
                </div>
                <button className="text-primary text-sm font-semibold hover:underline" onClick={openModalCreate}>
                    Crear nuevo usuario
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
                                        onClick={() => openModalChangeRole(u.id)}
                                    >
                                        Cambiar rol
                                    </button>
                                    <button
                                        className="text-error hover:bg-error-container/20 p-1 rounded-full transition-colors inline-flex align-middle"
                                        onClick={() => openModalUpdate(u)}
                                    >
                                        <span className="material-symbols-outlined text-[18px]"
                                            data-icon="edit">edit</span>
                                    </button>
                                    <button
                                        className="text-error hover:bg-error-container/20 p-1 rounded-full transition-colors inline-flex align-middle"
                                        onClick={() => openModalDelete(u.id)}
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
                isOpen={isModalOpenDelete}
                onClose={() => setIsModalOpenDelete(false)}
                onConfirm={eliminarUsuario}
                title="¿Estás seguro de que deseas eliminar este Usuario?"
                message="Esta acción no se puede deshacer y eliminará el usuario permanentemente."
            />
            <ConfirmModal
                isOpen={isModalOpenChangeRole}
                onClose={() => setIsModalOpenChangeRole(false)}
                onConfirm={cambiarRol}
                title="¿Estás seguro de que deseas cambiar el rol de este Usuario?"
                message="Esta acción no se puede deshacer y cambiará el rol del usuario permanentemente."
            />
            <ModalEditUser
                isOpen={isModalOpenUpdate}
                onClose={closeModalUpdate}
                user={userToUpdate}
            />


        </section>
    )
}

export default UserCards;