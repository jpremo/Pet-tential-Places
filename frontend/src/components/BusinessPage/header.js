import { useEffect } from 'react'
import { useSelector } from 'react-redux'

function Header() {
    const tt = window.tt
    let { businessInfo, allImages } = useSelector(state => {
        return ({
            businessInfo: state.business.businessInfo,
            allImages: state.business.allImages
        })
    })

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
            const el = document.getElementById(`point-${ind}`)
            popup._onMouseUp(() => console.log('test'))
            marker.setPopup(popup)
            // marker.togglePopup()
        })

        return map
    }

    const setMap = () => {
        const point = { position: { lng: businessInfo.coordinates.lng, lat: businessInfo.coordinates.lat }, zoom: businessInfo.coordinates.zoom, name: businessInfo.name, address: businessInfo.address }
        makeMap(point, false, null, point)
    }

    useEffect(() => {
        if (businessInfo) {
            setMap()
        }
    })
    if (businessInfo) {
        let arr1 = []
        let arr2 = []
        allImages.forEach((el) => {
            if (el.userId === businessInfo.userId) {
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
        console.log('info', businessInfo, allImages)
        const reviewTotal = (businessInfo.reviewNumber === 1) ? `1 Review` : `${businessInfo.reviewNumber} Reviews`
        const pictureTotal = (allImages.length === 1) ? `View 1 Picture` : `View ${allImages.length} Pictures`
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
                    <button id='picture-button'>
                        {pictureTotal}
                    </button>
                    <div id='picture-box'>
                        {allImages.slice(0, 5).map((el, ind) => {
                            return (
                                <img src={el.url} className='picture-box-content' key={ind} />
                            )
                        })}
                    </div>
                </div>
                <div id='information'>
                    <h2 className='information-header'>About Us</h2>
                    <h2 className='information-header'>Where to Find Us</h2>
                    <p id='description'>{businessInfo.description}</p>
                    <div id='map' className='map'>map</div>
                </div>
            </>
        )
    } else {
        return (
            <h1>Loading...</h1>
        )
    }
}

export default Header
