import { useSelector } from "react-redux"
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { fetch } from '../../store/csrf'
import ImageUpload from '../BusinessPage/imageUpload'
function BusinessForm({ userInfo }) {
    const tt = window.tt
    const [formPage, setFormPage] = useState(0)
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [mapFilled, setMapFilled] = useState(false)
    const [position, setPosition] = useState({})
    const [uploadedImages, setUploadedImages] = useState([])
    const history = useHistory()
    const submitForm = async (e) => {
        hidden = 'hidden'
        setFormPage(0)
        const data = {
            name,
            address,
            description,
            position,
            userId: userInfo.id,
            images: uploadedImages
        }
        console.log('data', data)
        const res = await fetch(`/api/business`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        history.push(`/business/${res.data.id}`)
        e.preventDefault()
    }
    const updateName = (e) => {
        setName(e.target.value.slice(0, 100))
    }
    const updateAddress = (e) => {
        setAddress(e.target.value.slice(0, 255))
    }
    const updateDescription = (e) => {
        setDescription(e.target.value.slice(0, 2000))
    }

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

        // let marker = new tt.Marker().setLngLat(center.position).addTo(map);
        return { map }//, marker}
    }

    const addressPosition = true;
    let hidden = 'hidden'
    // let setCenter = () => {
    //     debugger
    //     if(marker.setCenter) {
    //         marker.setCenter()
    //     }
    // }
    useEffect(async () => {
        if (addressPosition && !mapFilled && formPage === 2) {
            const res = await tt.services.fuzzySearch({
                key: 'g0ZS3ih3olA15iG2cSglfY1YrEJO8DKR',
                query: address
            }).go()

            const point = { position: res.results[0].position, zoom: 17 }

            const mapObj = makeMap(point, false, null, null)
            const map = mapObj.map;
            const marker = mapObj.marker

            setInterval(() => {
                const pos = map.getCenter()
                const zoom = map.getZoom()
                setPosition({ lng: pos.lng, lat: pos.lat, zoom: zoom })
                // console.log('map bounds', map.getBounds())
            }, 100)
            setMapFilled(true)
        }
    }, [formPage])

    const getPosition = (e) => {
        setFormPage(2)
        e.preventDefault()
    }
    const formDetermine2 = () => {
        if (formPage === 2) {
        return (
            <form>
                <button className='login-button' onClick={submitForm}>Submit</button>
                <button className='login-button' onClick={(e) => { setFormPage(0); e.preventDefault() }}>Cancel</button>
            </form>
        )
        }
    }
    const formDetermine = () => {


        if (formPage === 2) {
            hidden = ''
            return (
                <>
                    <h2>Business Information</h2>
                    <h4>Please center the map so that the point aligns with your business' exact location</h4>
                    <h5>Additionally, please zoom in to the desired level</h5>

                </>
            )
        } else if (formPage === 1) {
            hidden = 'hidden'
            return (
                <>
                    <h2>Business Information</h2>
                    <div className='label-box' >
                        <label htmlFor='name'>Name</label>
                        <input className='titlebox' name='name' value={name} onChange={updateName} />
                    </div>
                    <div className='label-box'>
                        <label htmlFor='address'>Address</label>
                        <textarea className='textbox' name='address' value={address} onChange={updateAddress}></textarea>
                    </div>
                    <div className='label-box'>
                        <label htmlFor='description'>Description</label>
                        <textarea className='textbox' name='description' value={description} onChange={updateDescription}></textarea>
                    </div>
                    <div> {description.length}/2000</div>
                    <ImageUpload uploadedImages={uploadedImages} maxSize={5} setUploadedImages={setUploadedImages} ></ImageUpload>
                    <div>
                        <button className='login-button' onClick={getPosition}>Next</button>
                        <button className='login-button' onClick={(e) => { setFormPage(0); e.preventDefault() }}>Cancel</button>
                    </div>
                </>
            )
        } else {
            hidden = 'hidden'
            return (
                <>
                    <button className='login-button' onClick={() => setFormPage(1)}>Create a Business</button>
                </>
            )
        }
    }
    return (
        <>
            <div id='form-container'>
                {formDetermine()}

                <div id='map-container' className={hidden}>
                    <div id='map' className='map-form'>
                    </div>
                    <svg className='center-marker' width="30" height="36" fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0, 0, 30, 36" preserveAspectRatio="none"><ellipse cx="15" cy="34" rx="7.661" ry="2" fill="#000000" opacity=".2"></ellipse><path d="M25.6 4.4C22.9 1.7 19.1 0 15 0S7.1 1.7 4.4 4.4C1.7 7.1 0 10.9 0 15s1.7 7.9 4.4 10.6C7.1 28.3 15 34.5 15 34.5s7.9-6.2 10.6-8.9C28.3 22.9 30 19.1 30 15s-1.7-7.9-4.4-10.6z"></path><path d="M25.6 4.4C22.9 1.7 19.1 0 15 0S7.1 1.7 4.4 4.4C1.7 7.1 0 10.9 0 15s1.7 7.9 4.4 10.6C7.1 28.3 15 34.5 15 34.5s7.9-6.2 10.6-8.9C28.3 22.9 30 19.1 30 15s-1.7-7.9-4.4-10.6z"></path><circle class="innerCircle" cx="15" cy="15" r="12" fill="none"></circle></svg>
                </div>
                {formDetermine2()}
            </div>
        </>
    )
}

export default BusinessForm
