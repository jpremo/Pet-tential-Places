import './ProfilePage.css';
import {useEffect} from 'react'
import BusinessForm from './BusinessForm'
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'
import { getProfileBusinesses } from '../../store/business'
import BusinessList from '../HomePage/BusinessList'

function ProfilePage() {
    const session = useSelector(state => state.session)
    const history = useHistory()
    const dispatch = useDispatch();
    const userInfo = session.user
    useEffect(() => {
        if (!session.user) {
            history.push('/')
            return (
                <div></div>
            )
        } else {
            dispatch(getProfileBusinesses(userInfo.id))
        }
    }, [dispatch])
    const businessList = useSelector(state => state.business.businessList)
    const ownedBusinesses = useSelector(state => state.business.ownedBusinesses)
    if (!businessList || !ownedBusinesses) return (
        <>
            <h1>Loading...</h1>
        </>
    )

    return (
        <>
            <h1>Hello {userInfo.username}!</h1>
            <BusinessForm userInfo={userInfo}></BusinessForm>
            <div id='content-wrapper'>
                <BusinessList businessList={businessList} name={'Reviewed Businesses'} />
                <BusinessList businessList={ownedBusinesses} name={'Owned Businesses'} />
            </div>
        </>
    )
}

export default ProfilePage
