import Profile from "../components/Profile"
import { useProfile } from '../hooks/useProfile.js'
import { useParams } from 'react-router-dom';
import EmptyState from "../components/common/EmptyState.jsx";
import Spinner from "../components/common/Spinner.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import { usePosts } from "../hooks/usePosts.js";
import PostCard from "../components/PostCard.jsx";

const ProfilePublic = () => {
  const { id } = useParams()
  const { profile, isLoading, error, loadProfile } = useProfile(id)
  const { posts, isLoadingPost, errorPost, reloadPost } = usePosts({authorId:id})
  return (
    <main className="pt-5 pb-20 px-6 max-w-7xl mx-auto">
      {/* <!-- Profile Card Header --> */}
      {isLoading && <Spinner />}

      {!isLoading && error && (
        <ErrorMessage message={error} onRetry={loadProfile} />
      )}

      {!isLoading && !error && profile && (
        <Profile profile={profile} onClickEdit={() => { console.log('editando') }} />
      )}
      {/* <!-- Tabs Navigation --> */}
      <section
        className="max-w-[900px] mx-auto mb-10 border-b border-surface-container-highest flex gap-8"
      >
        <button
          className="pb-4 text-blue-700 dark:text-blue-400 font-bold border-b-2 border-blue-700 dark:border-blue-400"
        >
          Publicaciones
        </button>
        <button
          className="pb-4 text-slate-600 dark:text-slate-400 font-medium hover:text-blue-600 transition-colors"
        >
          Comentarios
        </button>
      </section>
      {/* <!-- Posts Grid --> */}
      <section
        className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-1 gap-8"
      >
        {isLoadingPost && <Spinner />}

        {!isLoadingPost && errorPost && (
          <ErrorMessage message={errorPost} onRetry={reloadPost} />
        )}

        {!isLoadingPost && !errorPost && !posts.length && (
          <EmptyState message="Todavía no existen publicaciones." />
        )}

        {!isLoadingPost && !errorPost && posts.length > 0 && (
          <div className="flex-1">
            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} onClickCat={() => { console.log('categoria') }} />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default ProfilePublic