import { useSelector } from 'react-redux'

function Posts() {
    const posts = useSelector(state => state.business.posts)
    return (
        <h1>Posts</h1>
    )
}

export default Posts
