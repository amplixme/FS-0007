import StatsCards from "./StatsCards";
import UserCards from "./UserCards";
import CommentCards from "./CommentCard";
import PostsCard from "./PostsCard";

const AdminPage = () => {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">
          Panel de Administración
        </h1>
        <p className="text-on-surface-variant">
          Bienvenido de nuevo. Aquí tienes un resumen del estado de TuProyecto.
        </p>
      </div>
      <StatsCards />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <UserCards />
        <CommentCards />
      </div>
      <PostsCard />
    </>
  );
};

export default AdminPage;