import { useSelector } from 'react-redux'
import { useState } from 'react'
function Posts(props) {
    const posts = useSelector(state => state.business.posts)
    const [page, setPage] = useState(1)

    const imageError = (event) => {
        event.target.src = "http://simpleicon.com/wp-content/uploads/user1.png";
    }
    const imageBox = (post) => {
        if (post.images.length === 0) return
        return (
            <div className='review-image-container'>
                {post.images.map((el, ind) => {
                    // if (ind >= 1) return (<></>)
                    return (
                        <img className='review-image' src={el.url} alt={el.title} key={el.id} id={`reviewPhoto-${el.id}`} onClick={props.openPhoto} />
                    )
                })}
            </div>
        )
    }

    const pageBar = (reviewNumber, currentPage) => {
        const totalPages = Math.ceil(reviewNumber / 10)
        const changePage = (event) => {
            const newPage = event.target.id.split('-')[1]
            if (newPage !== page) {
                switch (newPage) {
                    case 'Prev': setPage(page - 1); break;
                    case 'Next': setPage(page + 1); break;
                    case 'First': setPage(1); break;
                    case 'Last': setPage(totalPages); break;
                    default: setPage(Number(newPage))
                }

            }
        }
        if (totalPages > 1) {
            const arr = []
            if (currentPage !== 1) arr.push('First', 'Prev')
            let starter = currentPage
            if (currentPage + 2 > totalPages) starter = totalPages - 4;
            if (currentPage - 2 < 1) starter = 1;
            for (let i = starter; i < starter + 5; i++) {
                if (i <= totalPages) arr.push(`${i}`)
            }
            if (currentPage !== totalPages) arr.push('Next', 'Last')
            console.log('arr', arr)
            return (
                <>
                    <div id='review-page-bar'>
                        {arr.map((el) => {
                            if (el == currentPage) {
                                return (
                                    <div className='review-page-link review-page-link--current' id={`page-${el}`} key={el} onClick={changePage}>{el}</div>
                                )
                            }
                            return (
                                <div className='review-page-link' id={`page-${el}`} key={el} onClick={changePage}>{el}</div>
                            )
                        })}
                    </div>
                    <div>{totalPages} Pages Total</div>
                </>
            )
        }
        if (totalPages === 0) return (<h1>There are no reviews for this business yet!</h1>)
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
                    <i className="fas fa-star fa-xs" style={{ color: 'white', paddingBottom: '1px', paddingRight: '1px', opacity: '1' }}></i>
                </div>
                <div className={`star-small ${arr[1]}`}>
                    <i className="fas fa-star fa-xs" style={{ color: 'white', paddingBottom: '1px', paddingRight: '1px', opacity: '1' }}></i>
                </div>
                <div className={`star-small ${arr[2]}`}>
                    <i className="fas fa-star fa-xs" style={{ color: 'white', paddingBottom: '1px', paddingRight: '1px', opacity: '1' }}></i>
                </div>
                <div className={`star-small ${arr[3]}`}>
                    <i className="fas fa-star fa-xs" style={{ color: 'white', paddingBottom: '1px', paddingRight: '1px', opacity: '1' }}></i>
                </div>
                <div className={`star-small ${arr[4]}`}>
                    <i className="fas fa-star fa-xs" style={{ color: 'white', paddingBottom: '1px', paddingRight: '1px', opacity: '1' }}></i>
                </div>
            </div>
        )
    }

    if (posts) {
        const pagePosts = posts.slice((page - 1) * 10, page * 10)
        return (
            <>

                <div id='review-wrapper'>
                    <h1>Reviews for {props.name}</h1>
                    {pagePosts.map((post) => {
                        if (post.user.profileImage === null) post.user.profileImage = 'create-error'
                        return (
                            <div className='review-container' key={post.id}>
                                <div className='review-header'>
                                    <img className='user-icon' src={post.user.profileImage} onError={imageError} alt="User Icon" />
                                    <h2 className='review-title'>{post.title}</h2>
                                    <div className='review-timestamp'>-Posted by {post.user.username} {post.timeStamp}</div>
                                </div>
                                {starGenerate(post.rating)}
                                <p className='review-body'>{post.body}</p>
                                {imageBox(post)}
                            </div>
                        )
                    })}
                    {pageBar(posts.length, page)}
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
