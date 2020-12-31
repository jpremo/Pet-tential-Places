import { useState } from 'react'
const ImageUpload = ({ uploadedImages, maxSize, setUploadedImages }) => {

    const [uploadUrl, setUploadUrl] = useState('')

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
            uploadCopy.push(uploadUrl)
            setUploadedImages(uploadCopy)
            setUploadUrl('')
        }
        e.preventDefault()
    }

    const removePhoto = (e) => {
        const id = e.target.id.split('-')[1]
        const uploadCopy = [...uploadedImages]
        uploadCopy.splice(Number(id), 1)
        setUploadedImages(uploadCopy)
    }

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
                        <div className='review-image-position'>
                            <img className='review-image' src={el} alt='Uploaded Image' key={ind} id={`newReviewPhoto-${ind}`} />
                            <i className="fas fa-times-circle fa-1x x-button-3" id={`newReviewPhotoX-${ind}`} style={{ color: 'white', background: 'black', borderRadius: '200px' }} onClick={removePhoto}></i>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ImageUpload
