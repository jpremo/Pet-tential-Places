import './HomePage.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getTenBusinesses } from '../../store/business'
import BusinessList from './BusinessList'
function HomePage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTenBusinesses())
    }, [dispatch])
    const businessList = useSelector(state => state.business.businessList)
    const popularBusinessList = useSelector(state => state.business.popularBusinessList)
    if (!businessList || !popularBusinessList) return (
        <>
            <h1>Loading...</h1>
        </>
    )

    return (
        <>
            <div id='content-wrapper'>
                <BusinessList businessList={businessList} name={'New and Trendy Businesses'}/>
                <BusinessList businessList={popularBusinessList} name={'Most Popular Businesses'}/>
            </div>
        </>
    )
}

export default HomePage
