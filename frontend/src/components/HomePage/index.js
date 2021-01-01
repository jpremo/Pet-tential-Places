import './HomePage.css'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react';
import {getTenBusinesses} from '../../store/business'
import BusinessBox from './BusinessBox'
function HomePage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTenBusinesses())
    }, [dispatch])
    const businessList = useSelector(state => state.business.businessList)

    if(!businessList) return (
        <>
            <h1>Loading...</h1>
        </>
    )

    return (
        <>
            <h1>New and Trendy Businesses</h1>
            {businessList.map((el, ind) => {
                return(
                    <BusinessBox business={el} key={ind}/>
                )
            })}
        </>
    )
}

export default HomePage
