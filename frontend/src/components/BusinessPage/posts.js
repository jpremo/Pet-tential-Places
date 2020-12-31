import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { postReview } from '../../store/business'
import ImageUpload from './imageUpload'
function Posts({ setShowModal, showModal, name, openPhoto }) {
    const posts = useSelector(state => state.business.posts)
    const businessInfo = useSelector(state => state.business)
    const userInfo = useSelector(state => state.session.user)
    const [page, setPage] = useState(1)
    const [showReview, setShowReview] = useState(false)
    const [rating, setRating] = useState(1)
    const [showRating, setShowRating] = useState(1)
    const [body, setBody] = useState('')
    const [title, setTitle] = useState('')
    const [uploadedImages, setUploadedImages] = useState([])
    const [uploadUrl, setUploadUrl] = useState('')
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
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
                        <img className='review-image' src={el.url} alt={el.title} key={el.id} id={`reviewPhoto-${el.id}`} onClick={openPhoto} />
                    )
                })}
            </div>
        )
    }

    const flipUrlInput = () => {
        const val = document.querySelector('#urlInput')
        if (val.classList.contains('hidden')) {
            val.classList.remove('hidden')
        } else {
            val.classList.add('hidden')
        }
    }

    const submitUrl = (e) => {
        const uploadCopy = [...uploadedImages]
        uploadCopy.push(uploadUrl)
        setUploadedImages(uploadCopy)
        e.preventDefault()
    }

    const imageBox2 = () => {
        if (uploadedImages.length === 0) return (
            <>
                <div id='image-controls'>
                    <div className='review-page-link'>Upload Image</div>
                    <div className='review-page-link' onClick={flipUrlInput}>Link Image</div>
                </div>
                <div className='hidden' id='urlInput'>
                    <span>Url:</span>
                    <input value={uploadUrl} onChange={(e) => setUploadUrl(e.target.value)} />
                    <button onClick={submitUrl}>Submit</button>
                </div>
            </>
        )
        return (
            <div id='image-control-box'>
                <div id='image-controls'>
                    <div className='review-page-link'>Upload Image</div>
                    <div className='review-page-link' onClick={flipUrlInput}>Link Image</div>
                </div>
                <div className='hidden' id='urlInput'>
                    <span>Url:</span>
                    <input value={uploadUrl} onChange={(e) => setUploadUrl(e.target.value)} />
                    <button onClick={submitUrl}>Submit</button>
                </div>
                <div className='review-image-container'>
                    {uploadedImages.map((el, ind) => {
                        // if (ind >= 1) return (<></>)
                        return (
                            <img className='review-image' src={el} alt='Uploaded Image' key={ind} id={`newReviewPhoto-${ind}`} />
                        )
                    })}
                </div>
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

    const starGenerateInteractive = () => {
        const hoverStar = (event) => {
            const id = event.target.id.split('-')[1]
            setShowRating(Number(id))
        }

        const hoverStarReset = (event) => {
            if (event.target.nodeName === 'DIV') setShowRating(rating)
        }

        const hoverStarSet = (event) => {
            const id = event.target.id.split('-')[1]
            setRating(Number(id))
            setShowRating(Number(id))
        }
        const arr = []
        const points = showRating;
        for (let i = 0; i < 5; i++) {
            if (i <= points - 1) {
                arr.push('star-filled')
            } else {
                arr.push('')
            }
        }
        return (
            <div className='new-review-star-container' name='rating'>
                <div className={`star-small-new-review ${arr[0]}`} id='star-1' onClick={hoverStarSet} onMouseEnter={hoverStar} onMouseLeave={hoverStarReset}>
                    <i className="fas fa-star fa-xs" id='innerstar-1' style={{ color: 'white', paddingBottom: '1px', paddingRight: '1px', opacity: '1' }}></i>
                </div>
                <div className={`star-small-new-review ${arr[1]}`} id='star-2' onClick={hoverStarSet} onMouseEnter={hoverStar} onMouseLeave={hoverStarReset}>
                    <i className="fas fa-star fa-xs" id='innerstar-2' style={{ color: 'white', paddingBottom: '1px', paddingRight: '1px', opacity: '1' }}></i>
                </div>
                <div className={`star-small-new-review ${arr[2]}`} id='star-3' onClick={hoverStarSet} onMouseEnter={hoverStar} onMouseLeave={hoverStarReset}>
                    <i className="fas fa-star fa-xs" id='innerstar-3' style={{ color: 'white', paddingBottom: '1px', paddingRight: '1px', opacity: '1' }}></i>
                </div>
                <div className={`star-small-new-review ${arr[3]}`} id='star-4' onClick={hoverStarSet} onMouseEnter={hoverStar} onMouseLeave={hoverStarReset}>
                    <i className="fas fa-star fa-xs" id='innerstar-4' style={{ color: 'white', paddingBottom: '1px', paddingRight: '1px', opacity: '1' }}></i>
                </div>
                <div className={`star-small-new-review ${arr[4]}`} id='star-5' onClick={hoverStarSet} onMouseEnter={hoverStar} onMouseLeave={hoverStarReset}>
                    <i className="fas fa-star fa-xs" id='innerstar-5' style={{ color: 'white', paddingBottom: '1px', paddingRight: '1px', opacity: '1' }}></i>
                </div>
            </div>
        )
    }

    const postForm = (e) => {
        const data = {
            title: title,
            body: body,
            images: uploadedImages,
            rating: rating,
            locationId: businessInfo.businessInfo.id,
            userId: userInfo.id
        }
        dispatch(postReview(data)).then((e) => {
            setShowReview(false)
            setErrors([]);
        }).catch(
            (res) => {
                if (res.data && res.data.errors) {
                    console.log(res.data.errors)
                    setErrors(res.data.errors);
                }

            }
        );
    }

    const createReview = () => {
        let text = 'Write a Review'

        let clickEvent
        if (userInfo) {
            clickEvent = () => {
                return (
                    setShowReview(true)
                )
            }
        } else {
            clickEvent = () => {
                setShowModal(true)
            }
        }

        if (showReview) {
            return (
                <form id="new-review-form">
                    <ul id='error-list'>
                        {errors.map((el, ind) => {
                            return(
                                <li key={ind}>{el}</li>
                            )
                        })}
                    </ul>
                    <div className='label-box'>
                        <label for='title'>Title</label>
                        <input name='title' className='titlebox' placeholder='Write a snazzy title here...' value={title} onChange={(e) => setTitle(e.target.value.slice(0, 50))} />
                    </div>
                    <div className='label-box'>
                        <label for='body'>Review</label>
                        <textarea className='textbox' name='body' placeholder='Write your review here...' value={body} onChange={(e) => setBody(e.target.value.slice(0, 1000))}> </textarea>
                    </div>

                    {/* {imageBox2()} */}
                    <div id='body-counter'>{body.length}/1000</div>
                    <ImageUpload uploadedImages={uploadedImages} maxSize={5} setUploadedImages={setUploadedImages} />
                    <div className='label-box-2'>
                        {starGenerateInteractive()}
                    </div>
                    <div className='review-page-link submit-form' onClick={postForm}>Post</div>
                </form>
            )
        } else {
            return (
                <div className='review-page-link' onClick={clickEvent}>{text}</div>
            )
        }
    }

    if (posts) {
        const pagePosts = posts.slice((page - 1) * 10, page * 10)
        return (
            <>

                <div id='review-wrapper'>
                    <h1>Reviews for {name}</h1>
                    {createReview()}
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
