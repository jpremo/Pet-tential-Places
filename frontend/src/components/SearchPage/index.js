import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useLayoutEffect } from 'react'
import { searchBusinesses, clearSearchInfo } from '../../store/business'
import BusinessList from '../HomePage/BusinessList'
import './SearchPage.css'
function SearchPage() {
    const location = useLocation()
    const dispatch = useDispatch()
    const [mapFilled, setMapFilled] = useState(false);
    const loc = location.search.slice(location.search.indexOf('location=') + 9)

    let businesses = useSelector(state => state.business.searchResultBusinesses)
    const center = useSelector(state => state.business.searchCenter)

    useEffect(() => {
        const search = async () => {
            dispatch(clearSearchInfo())
            setMapFilled(false)
            await dispatch(searchBusinesses(`/api/search/${location.search}`, loc))
        }
        search()
    }, [dispatch, location])

    const tt = window.tt;

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
            const marker = new tt.Marker().setLngLat(point.position).addTo(map);
            const link = 'fill-this-in-later';
            let popup
            if (useLinks) {
                popup = new tt.Popup({ offset: popupOffsets }).setHTML(`<a id="point-${ind}" href="${link}"><b>${point.name}</b></a><br/>${point.address}`);
            } else {
                popup = new tt.Popup({ offset: popupOffsets }).setHTML(`<b>${point.name}</b><br/>${point.address}`);
            }
            marker.setPopup(popup)
        })
        return map
    }

    const setMap = () => {
        // const point = { position: { lng: businessInfo.coordinates.lng, lat: businessInfo.coordinates.lat }, zoom: businessInfo.coordinates.zoom, name: businessInfo.name, address: businessInfo.address }
        const points = businesses.map(el => {
            return {
                position: { lng: el.coordinates.lng, lat: el.coordinates.lat },
                zoom: el.coordinates.zoom,
                name: el.name,
                address: el.address
            }
        })
        const mapCenter = { position: { lng: center.lng, lat: center.lat }, zoom: 10 }
        makeMap(mapCenter, false, null, ...points)
    }



    useEffect(() => {
        if (businesses && !mapFilled) {
            setMap()
            setMapFilled(true)
        }
    }, [businesses, mapFilled])

    return (
        <>
            <div id='content-wrapper'>
                <BusinessList businessList={businesses} name={'Search Results'}/>
                <div id='map' className='map'></div>
            </div>
        </>
    )
}

export default SearchPage
