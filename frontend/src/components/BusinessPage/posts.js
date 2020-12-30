import { useSelector } from 'react-redux'

function Posts(props) {
    // console.log('props', props)
    const posts = useSelector(state => state.business.posts)
    const imageError = (event) => {
        event.target.src = "http://simpleicon.com/wp-content/uploads/user1.png";
    }

    const starGenerate = (points) => {
        const arr = []
        for (let i = 0; i < 5; i++) {
            if (i <= points - 1) {
                arr.push('star-filled')
            } else {
                arr.push('')
            }
        }
        return (
            <div className='review-star-container'>
                <div className={`star-small ${arr[0]}`}>
                    <i className="fas fa-star fa-xs" style={{ color: 'white', paddingBottom: '1px', opacity: '1' }}></i>
                </div>
                <div className={`star-small ${arr[1]}`}>
                    <i className="fas fa-star fa-xs" style={{ color: 'white', paddingBottom: '1px', opacity: '1' }}></i>
                </div>
                <div className={`star-small ${arr[2]}`}>
                    <i className="fas fa-star fa-xs" style={{ color: 'white', paddingBottom: '1px', opacity: '1' }}></i>
                </div>
                <div className={`star-small ${arr[3]}`}>
                    <i className="fas fa-star fa-xs" style={{ color: 'white', paddingBottom: '1px', opacity: '1' }}></i>
                </div>
                <div className={`star-small ${arr[4]}`}>
                    <i className="fas fa-star fa-xs" style={{ color: 'white', paddingBottom: '1px', opacity: '1' }}></i>
                </div>
            </div>
        )
    }

    if (posts) {


        const post = posts[0]
        if (post.user.profileImage === null) post.user.profileImage = 'create-error'
        console.log('posts', posts)
        return (
            <>
                <h1>Reviews</h1>
                <div id='review-wrapper'>
                    <div className='review-container'>
                        <div className='review-header'>
                            <img className='user-icon' src={post.user.profileImage} onError={imageError} alt="User Icon" />
                            <h2 className='review-title'>{post.title}</h2>
                            <div className='review-timestamp'>-Posted by {post.user.username} {post.timeStamp}</div>
                        </div>
                        {starGenerate(post.rating)}
                        <p className='review-body'>{post.body}</p>
                        <div className='review-image-container'>
                            {post.images.map((el, ind) => {
                                return(
                                    <img className='review-image' src={el.url} alt={el.title} key={el.id} id={`reviewPhoto-${el.id}`} onClick={props.openPhoto}/>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    }
}

export default Posts
