import { useNavigate } from 'react-router-dom'

export default function PostCard({ post }) {
    const navigate = useNavigate()
    const extracto = post.content?.length > 150
        ? post.content.slice(0, 150) + '...'
        : post.content

    return (
        <div
            onClick={() => navigate(`/posts/${post.id}`)}
            className="cursor-pointer border rounded-lg p-4 hover:shadow-md transition"
        >
            <h2 className="text-lg font-semibold mb-1">{post.title}</h2>
            <p className="text-sm text-gray-600 mb-3">{extracto}</p>
            <div className="text-xs text-gray-400 flex justify-between">
                <span>{post.author?.username}</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
        </div>
    )
}