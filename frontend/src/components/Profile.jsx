import {useAuth} from '../context/AuthContext.jsx'
const Profile = ({ profile, onClickEdit }) => {
    const {user} = useAuth()
    console.log(user)
    return (
        <section className="max-w-[900px] mx-auto mb-12">
            <div
                className="bg-surface-container-lowest rounded-[16px] p-8 md:p-12 shadow-[0_20px_40px_rgba(17,24,39,0.05)] flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10 transition-all duration-300"
            >
                {/* <!-- Avatar --> */}
                <div className="relative flex-shrink-0">
                    <div
                        className="w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-surface-container-low"
                    >
                        <img
                            alt={`${profile.name} profile`}
                            className="w-full h-full object-cover"
                            src={profile.avatarUrl 
                                ? profile.avatarUrl
                                : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
                        />
                    </div>
                </div>
                {/* <!-- Info --> */}
                <div className="flex-grow text-center md:text-left space-y-4">
                    <div>
                        <h1
                            className="text-[28px] font-extrabold text-on-surface tracking-tight leading-tight"
                        >
                            {profile.name}
                        </h1>
                        <p
                            className="text-[1.125rem] text-on-surface-variant font-medium mt-1"
                        >
                            {profile.bio ? profile.bio : "-"}
                        </p>
                    </div>
                    <div
                        className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-medium text-slate-500"
                    >
                        <span className="flex items-center gap-1.5">
                            <span
                                className="material-symbols-outlined text-[18px]"
                                data-icon="article">
                                article
                            </span>
                            {profile._count.posts == 1 ? `${profile._count.posts} Publicación` : `${profile._count.posts} Publicaciones` } 
                        </span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span className="flex items-center gap-1.5">
                            <span
                                className="material-symbols-outlined text-[18px]"
                                data-icon="calendar_today">
                                calendar_today
                            </span>
                            Miembro desde {new Intl.DateTimeFormat("es-ES", {month: "long", year: "numeric",}).format(new Date(profile.createdAt))}
                        </span>
                    </div>
                    {user && user.id === profile.id && 
                        <div className="pt-2">
                            <button
                                className="px-6 py-2.5 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary/5 active:scale-95 transition-all duration-200"
                                onClick={onClickEdit}
                            >
                                Editar perfil
                            </button>
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}
export default Profile