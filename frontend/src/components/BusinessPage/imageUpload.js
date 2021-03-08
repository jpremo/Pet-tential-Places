import { useState } from 'react'
const ImageUpload = ({ uploadedImages, maxSize, setUploadedImages }) => {

    const [uploadUrl, setUploadUrl] = useState('')
    const [uploadTitle, setUploadTitle] = useState('')
    const [imageFileTitle, setImageFileTitle] = useState('')
    const [uploadFile, setUploadFile] = useState(null)

    const flipUrlInput = () => {
        const val = document.querySelector('#urlInput')
        const val2 = document.querySelector('#uploadInput')
        if (val.classList.contains('hidden')) {
            val.classList.remove('hidden')
        } else {
            val.classList.add('hidden')
        }
        val2.classList.add('hidden')
    }

    const flipUploadInput = () => {
        const val = document.querySelector('#uploadInput')
        const val2 = document.querySelector('#urlInput')
        if (val.classList.contains('hidden')) {
            val.classList.remove('hidden')
        } else {
            val.classList.add('hidden')
        }
        val2.classList.add('hidden')
    }

    const submitUrl = () => {
        if (uploadedImages.length < maxSize) {
            const uploadCopy = [...uploadedImages]
            uploadCopy.push([uploadUrl, uploadTitle])
            setUploadedImages(uploadCopy)
            setUploadUrl('')
            setUploadTitle('')
            flipUrlInput()
        }
    }

    const submitFile = (link) => {
        if (uploadedImages.length < maxSize) {
            const uploadCopy = [...uploadedImages]
            uploadCopy.push([link, uploadTitle])
            setUploadedImages(uploadCopy)
            setUploadUrl('')
            setUploadTitle('')
            setUploadFile(null)
            setImageFileTitle('')
            flipUploadInput()
        }
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
                    return (
                        <div className='review-image-position' key={ind}>
                            <img className='review-image' onError={imageError} src={el[0]} alt={el[1]} id={`newReviewPhoto-${ind}`} />
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
                <div className='review-page-link' onClick={flipUploadInput}>Upload Image</div>
                <div className='review-page-link' onClick={flipUrlInput}>Link Image</div>
            </div>
        )
    }

    const uploadAWS = async () => {
        let url
        if(!uploadFile){
            setUploadUrl("https://image.freepik.com/free-vector/404-error-web-template-with-mad-cat_23-2147763345.jpg")
            url = "https://image.freepik.com/free-vector/404-error-web-template-with-mad-cat_23-2147763345.jpg"
        } else {
            let response = await fetch(`/api/users/photos`, {
                method: "POST",
                body: uploadFile
            })
            response = await response.json()
            setUploadUrl(response.link)
            url = response.link
        }
        submitFile(url)
    }

    const changeUploadInfo = (e) => {
        let formData = new FormData();
        formData.append("photo", e.target.files[0], e.target.files[0].name);

        setImageFileTitle(e.target.files[0].name)
        setUploadFile(formData)
    }

    const openUpload = (e) => {
        e.preventDefault();
        const uploader = document.createElement('input');
        uploader.type = 'file';
        uploader.accept = '.png, .jpeg, .jpg, .gif';
        uploader.onchange = changeUploadInfo;
        uploader.click();
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
                <div className='review-page-link' onClick={submitUrl}>Submit</div>
            </div>
            <div className='hidden' id='uploadInput'>
                <div>
                    <div className='url-label'>Image Title</div>
                    <input value={uploadTitle} onChange={(e) => setUploadTitle(e.target.value)} />
                </div>
                <div>{imageFileTitle}</div>
                <div className='review-button-wrapper'>
                    <div className='review-page-link' onClick={openUpload}>Attach</div>
                    <div className='review-page-link' onClick={uploadAWS}>Submit</div>
                </div>
            </div>
            {imageBoxCheck()}
        </div>
    )
}

export default ImageUpload
