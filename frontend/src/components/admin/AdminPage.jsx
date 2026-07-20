import { useEffect, useState } from "react";
import { getAdminStats, getAdminUsers } from "../../services/admin.service";
import StatsCards from "./StatsCards"
import UserCards from "./UserCards";
import CommentCards from "./CommentCard";
import PostsCard from "./PostsCard";
import { getAll } from "../../services/post.service";

const AdminPage = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);
    const [comentarios, setComentarios] = useState([]);

    const loadDashboardData = async () => {
        try {
            setIsLoading(true);
            const [statsData, usersData, postsData] = await Promise.all([
                getAdminStats(),
                getAdminUsers(),
                getAll({ limit: 3, sort: "desc" }),
            ]);
            setStats(statsData);
            setUsers(usersData);
            setPosts(postsData);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.error?.message || "Error al cargar el panel");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadDashboardData();
    }, []);

    if (isLoading) {
        return (
            <main className="pt-24 pb-16 px-8 max-w-7xl mx-auto w-full">
                <p className="text-on-surface-variant">Cargando panel...</p>
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
        <main className="pt-24 pb-16 px-8 max-w-7xl mx-auto w-full">
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Panel de Administración</h1>
                <p className="text-on-surface-variant">Bienvenido de nuevo. Aquí tienes un resumen del estado de TuProyecto.</p>
            </div>

            <StatsCards stats={stats} />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* <!-- Users Section (Table) --> */}
                <UserCards users={users} />

                {/* <!-- Recent Comments Section --> */}

                <CommentCards comentarios={comentarios} />
            </div>
            {/* <!-- Recent Posts Section (Table) --> */}
            <PostsCard posts={posts} />
        </main>
    );
};

export default AdminPage;