import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Posts from './posts'

function Header({ setShowModal, showModal }) {
    const [imageBoxWidth, setImageBoxWidth] = useState(200)
    const tt = window.tt
    let { businessInfo, allImages } = useSelector(state => {
        return ({
            businessInfo: state.business.businessInfo,
            allImages: state.business.allImages
        })
    })

    const imageBoxError = (event) => {
        event.target.src = "https://image.freepik.com/free-vector/404-error-web-template-with-mad-cat_23-2147763345.jpg";
    }
    //history is the history object that allows linking
    const makeMap = (center, useLinks = true, history = null, ...points) => {
        let map = tt.map({
            key: 'g0ZS3ih3olA15iG2cSglfY1YrEJO8DKR',
            container: 'map',
            style: 'tomtom://vector/1/basic-main',
            zoom: center.zoom,
            center: center.position
        });

        map.addControl(new tt.FullscreenControl());
        map.addControl(new tt.NavigationControl());

        var popupOffsets = {
            top: [0, 0],
            bottom: [0, -70],
            'bottom-right': [0, -70],
            'bottom-left': [0, -70],
            left: [25, -35],
            right: [-25, -35]
        }

        points.forEach((point, ind) => {
            const marker = new tt.Marker().setLngLat(center.position).addTo(map);
            const link = 'fill-this-in-later';
            let popup
            if (useLinks) {
                popup = new tt.Popup({ offset: popupOffsets }).setHTML(`<a id="point-${ind}" href="${link}"><b>${point.name}</b></a><br/>${point.address}`);
            } else {
                popup = new tt.Popup({ offset: popupOffsets }).setHTML(`<b>${point.name}</b><br/>${point.address}`);
            }
            popup._onMouseUp(() => console.log('test'))
            marker.setPopup(popup)
        })

        return map
    }

    const setMap = () => {
        const point = { position: { lng: businessInfo.coordinates.lng, lat: businessInfo.coordinates.lat }, zoom: businessInfo.coordinates.zoom, name: businessInfo.name, address: businessInfo.address }
        makeMap(point, false, null, point)
    }

    const [popup, setPopup] = useState(false);
    const [mapFilled, setMapFilled] = useState(false);
    const [photoSelected, setPhotoSelected] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(0);

    useEffect(() => {
        if (businessInfo && !mapFilled) {
            setMap()
            setMapFilled(true)
        }
        if (!businessInfo) setMapFilled(false)
    }, [businessInfo, mapFilled])

    useEffect(() => {
        if (mapFilled) {
            const body = document.querySelector('body')
            const control = document.querySelector('.mapboxgl-ctrl-top-right')
            const picturePopup = document.querySelector('#picture-popup-container')
            if (popup) {
                control.className = "mapboxgl-ctrl-top-right hidden"
                body.className = 'load'
                picturePopup.className = ''
            } else {
                body.className = ''
                control.className = "mapboxgl-ctrl-top-right"
                picturePopup.className = 'hidden'
            }
        }
    }, [popup])

    useEffect(() => {
        if (mapFilled) {
            const photoSet = document.querySelector('#photo-list')
            const photoWrap = document.querySelector('#selected-photo-wrapper')
            if (!photoSelected) {
                photoSet.className = ''
                photoWrap.className = 'hidden'
            } else {
                photoSet.className = 'hidden'
                photoWrap.className = ''
            }
        }
    }, [photoSelected])

    useEffect(() => {
        if (mapFilled) {
            const leftArrow = document.querySelector('#left-arrow')
            const rightArrow = document.querySelector('#right-arrow')
            if (selectedPhoto === 0) {
                leftArrow.classList.add('hidden')
            } else {
                leftArrow.classList.remove('hidden')
            }

            if (selectedPhoto === allImages.length - 1) {
                rightArrow.classList.add('hidden')
            } else {
                rightArrow.classList.remove('hidden')
            }
        }
    }, [selectedPhoto])

    const pictureClick = () => {
        setPopup(!popup)
        setPhotoSelected(false)
    }

    const selectPhoto = (event) => {
        const index = event.target.id.split('-')[1];
        setSelectedPhoto(Number(index))
        setPhotoSelected(!photoSelected)
    }

    const toggleSelectedPhoto = () => {
        setPhotoSelected(!photoSelected)
    }

    function openPhoto(event) {
        const id = event.target.id.split('-')[1];
        const im = allImages.find((el) => el.id == id)
        const ind = allImages.indexOf(im)
        setSelectedPhoto(Number(ind))
        setPhotoSelected(true)
        setPopup(true)
    }

    const incrementIndex = () => {
        if (selectedPhoto < allImages.length - 1) setSelectedPhoto(selectedPhoto + 1)
    }

    const decrementIndex = () => {
        if (selectedPhoto > 0) setSelectedPhoto(selectedPhoto - 1)
    }

    if (businessInfo) {
        let arr1 = []
        let arr2 = []
        allImages.forEach((el) => {
            if (el.userId === businessInfo.userId) {
                el.username = 'Owner'
                arr1.push(el)
            } else {
                arr2.push(el)
            }
        })
        allImages = [...arr1, ...arr2]

        let stars = Math.round(businessInfo.averageRating * 2)
        const starsArr = []
        for (let i = 0; i < 5; i++) {
            if (stars <= 0) {
                starsArr.push('')
            } else if (stars === 1) {
                starsArr.push('star-half-filled')
            } else {
                starsArr.push('star-filled')
            }
            stars -= 2;
        }
        const reviewTotal = (businessInfo.reviewNumber === 1) ? `1 Review` : `${businessInfo.reviewNumber} Reviews`
        const pictureTotal = (allImages.length === 1) ? `View 1 Picture` : `View ${allImages.length} Pictures`
        const imageSelected = (allImages.length >= 1) ? allImages[selectedPhoto] : {}
        const topImages = []
        let iIndex = 0;
        for (let i = 0; i < 5; i++) {

            if (!allImages || allImages.length === 0) {
                topImages.push('https://images.dog.ceo/breeds/spaniel-welsh/n02102177_453.jpg')
            } else {
                if (iIndex >= allImages.length) iIndex = 0;
                if (allImages[iIndex]) {
                    topImages.push(allImages[iIndex].url)
                } else {
                    topImages.push('https://images.dog.ceo/breeds/spaniel-welsh/n02102177_453.jpg')
                }
            }
            iIndex++
        }
        return (
            <>
                <div id='banner'>
                    <div id='info'>
                        <h1 id='name'>{businessInfo.name}</h1>
                        <h3 id='address'>{businessInfo.address}</h3>
                        <div id='star-container'>
                            {starsArr.map((el, ind) => {
                                return (
                                    <div className={`star ${el}`} key={ind}>
                                        <i className="fas fa-star" style={{ color: 'white', paddingBottom: '1px', opacity: '1' }}></i>
                                    </div>)
                            })}
                            <div id='review-number'>{reviewTotal}</div>
                        </div>
                    </div>
                    <button id='picture-button' onClick={pictureClick}>
                        {pictureTotal}
                    </button>
                    <div id='picture-box'>
                        {topImages.slice(0, 5).map((url, ind) => {
                            return (
                                <img src={url} alt='header image' onError={imageBoxError} className='picture-box-content' key={ind} />
                            )
                        })}
                    </div>
                </div>
                <div id='information'>
                    <h2 className='information-header'>About Us</h2>
                    <h2 className='information-header'>Where to Find Us</h2>
                    <p id='description'>{businessInfo.description}</p>
                    <div id='map' className='map-business'></div>
                </div>
                <div id='picture-popup-container' className='hidden'>
                    <div id='x-wrapper'>
                        <i className="fas fa-times-circle fa-2x x-button" style={{ color: 'white', background: 'black', borderRadius: '200px' }} onClick={pictureClick}></i>
                        <div id='picture-popup'>
                            {/* <div className='picture-popup-inner-content'> */}
                                <h1 className='picture-popup-header'>Pictures from {businessInfo.name}</h1>
                                <div id='photo-list' >
                                    {allImages.map((el, ind) => {
                                        return (
                                            <div key={el.id} className='photo-list-container'>
                                                <img src={el.url} alt={el.title} className='photo-list-pic' onError={imageBoxError} id={`photo-${ind}`} onClick={selectPhoto} />
                                            </div>
                                        )
                                    })}
                                </div>
                                <div id="selected-photo-wrapper" className='hidden'>
                                    <i className="fas fa-times-circle fa-2x x-button-2" style={{ color: 'white', background: 'black', borderRadius: '200px' }} onClick={toggleSelectedPhoto}></i>
                                    <div id='arrow-container'>
                                        <div className='arrow-div'>
                                            <i className="fas fa-arrow-left fa-4x left-arrow" id='left-arrow' style={{ color: 'white' }} onClick={decrementIndex}></i>
                                        </div>
                                        <div id="selected-photo-container">
                                        <img src={imageSelected.url} alt={imageSelected.title} onLoad={(e) => setImageBoxWidth(e.target.width - 40)} id='selected-photo' onError={imageBoxError} />
                                            <div id='selected-photo-title'>{imageSelected.title} </div>
                                            <div id='selected-photo-username' style={{width: `${imageBoxWidth}px`}}>- Posted by {imageSelected.username} {imageSelected.timeStamp}</div>
                                        </div>
                                        <div className='arrow-div'>
                                            <i className="fas fa-arrow-right fa-4x right-arrow" id='right-arrow' style={{ color: 'white' }} onClick={incrementIndex}></i>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                <Posts openPhoto={openPhoto} name={businessInfo.name} setShowModal={setShowModal} showModal={showModal}></Posts>
            </>
        )
    } else {
        return (
            <h1>Loading...</h1>
        )
    }
}

export default Header
