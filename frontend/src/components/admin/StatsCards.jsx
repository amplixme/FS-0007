const StatsCards = ({ stats }) => {
    if (!stats) return <div className="text-on-surface-variant">Cargando estadísticas...</div>;

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* <!-- Total Usuarios --> */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <span className="text-on-surface-variant font-medium label-md">Usuarios</span>
                    <span className="material-symbols-outlined text-primary" data-icon="people">people</span>
                </div>
                <div className="text-[36px] font-bold leading-tight">{stats.totalUsers || 0}</div>
                {/* <div className="text-xs text-secondary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]" data-icon="trending_up">trending_up</span>
                    <span>12% este mes</span>
                </div> */}
            </div>
            {/* <!-- Total Publicaciones --> */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <span className="text-on-surface-variant font-medium label-md">Posts</span>
                    <span className="material-symbols-outlined text-primary" data-icon="description">description</span>
                </div>
                <div className="text-[36px] font-bold leading-tight">{stats.totalPosts || 0}</div>
                {/* <div className="text-xs text-secondary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]" data-icon="add">add</span>
                    <span>4 nuevos hoy</span>
                </div> */}
            </div>
            {/* <!-- Total Comentarios --> */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <span className="text-on-surface-variant font-medium label-md">Comentarios</span>
                    <span className="material-symbols-outlined text-primary" data-icon="chat">chat</span>
                </div>
                <div className="text-[36px] font-bold leading-tight">{stats.totalComments || 0}</div>
                {/* <div className="text-xs text-secondary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]" data-icon="history">history</span>
                    <span>Actualizado hace 5m</span>
                </div> */}
            </div>
            {/* <!-- Posts esta semana --> */}
            {/* <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <span className="text-on-surface-variant font-medium label-md">Esta semana</span>
                    <span className="material-symbols-outlined text-primary"
                        data-icon="calendar_today">calendar_today</span>
                </div>
                <div className="text-[36px] font-bold leading-tight">12</div>
                <div className="text-xs text-secondary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]" data-icon="check_circle">check_circle</span>
                    <span>Objetivo cumplido</span>
                </div>
            </div> */}
        </section>
    );
};

export default StatsCards;