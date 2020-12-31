import { useState } from 'react'
const ImageUpload = ({ uploadedImages, maxSize, setUploadedImages }) => {

    const [uploadUrl, setUploadUrl] = useState('')
    const [uploadTitle, setUploadTitle] = useState('')

    const flipUrlInput = () => {
        const val = document.querySelector('#urlInput')
        if (val.classList.contains('hidden')) {
            val.classList.remove('hidden')
        } else {
            val.classList.add('hidden')
        }
    }

    const submitUrl = (e) => {
        if (uploadedImages.length < maxSize) {
            const uploadCopy = [...uploadedImages]
            uploadCopy.push([uploadUrl, uploadTitle])
            setUploadedImages(uploadCopy)
            setUploadUrl('')
            setUploadTitle('')
            flipUrlInput()
        }
        e.preventDefault()
    }

    const removePhoto = (e) => {
        const id = e.target.id.split('-')[1]
        const uploadCopy = [...uploadedImages]
        uploadCopy.splice(Number(id), 1)
        setUploadedImages(uploadCopy)
    }

    const imageBoxCheck = () => {
        if (uploadedImages.length === 0) return
        return (
            <div className='review-image-container'>
                {uploadedImages.map((el, ind) => {
                    // if (ind >= 1) return (<></>)
                    return (
                        <div className='review-image-position'>
                            <img className='review-image' onError={imageError} src={el[0]} alt={el[1]} key={ind} id={`newReviewPhoto-${ind}`} />
                            <i className="fas fa-times-circle fa-1x x-button-3" id={`newReviewPhotoX-${ind}`} style={{ color: 'white', background: 'black', borderRadius: '200px' }} onClick={removePhoto}></i>
                        </div>
                    )
                })}
            </div>
        )
    }

    const imageError = (event) => {
        event.target.src = "https://image.freepik.com/free-vector/404-error-web-template-with-mad-cat_23-2147763345.jpg";
    }

    const imageControls = () => {
        if (uploadedImages.length >= maxSize) return
        return (
            <div id='image-controls'>
                <div className='review-page-link'>Upload Image</div>
                <div className='review-page-link' onClick={flipUrlInput}>Link Image</div>
            </div>
        )
    }

    return (
        <div id='image-control-box'>
            {imageControls()}
            <div className='hidden' id='urlInput'>
                <div>
                    <div className='url-label'>Image Title</div>
                    <input value={uploadTitle} onChange={(e) => setUploadTitle(e.target.value)} />
                </div>
                <div>
                    <div className='url-label'>Url</div>
                    <input value={uploadUrl} onChange={(e) => setUploadUrl(e.target.value)} />
                </div>
                <button onClick={submitUrl}>Submit</button>
            </div>
            {imageBoxCheck()}
        </div>
    )
}

export default ImageUpload
