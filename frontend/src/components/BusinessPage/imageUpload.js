import {useState} from 'react'
const ImageUpload = ({uploadedImages, maxSize, setUploadedImages}) => {

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
        const uploadCopy = [...uploadedImages]
        uploadCopy.push(uploadUrl)
        setUploadedImages(uploadCopy)
        e.preventDefault()
    }

    if (uploadedImages.length === 0) return (
        <>
            <div id='image-controls'>
                <div className='review-page-link'>Upload Image</div>
                <div className='review-page-link' onClick={flipUrlInput}>Link Image</div>
            </div>
            <div className='hidden' id='urlInput'>
                <span>Url:</span>
                <input value={uploadUrl} onChange={(e) => setUploadUrl(e.target.value)}/>
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
                <input value={uploadUrl} onChange={(e) => setUploadUrl(e.target.value)}/>
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

export default ImageUpload
