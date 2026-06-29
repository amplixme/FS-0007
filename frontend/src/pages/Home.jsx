import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import { getPosts } from '../services/post.service'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getPosts()
      .then(res => setPosts(res.data))
      .catch(() => setError('Error al cargar las publicaciones'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Cargando...</p>
  if (error) return <p>{error}</p>
  if (!posts.length) return <p>No hay publicaciones todavía</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}