import { useSelector } from 'react-redux'

function Posts() {
    const info = useSelector(state => state.business.posts)
    console.log('post info', info)
    return (
        <h1>Posts</h1>
    )
}

export default Posts
