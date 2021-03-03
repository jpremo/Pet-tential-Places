import './ProfilePage.css';
import { useEffect, useState } from 'react'
import BusinessForm from './BusinessForm'
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'
import { clearProfileBusinesses, getProfileBusinesses } from '../../store/business'
import BusinessList from '../HomePage/BusinessList'

function ProfilePage() {
    const session = useSelector(state => state.session)
    const history = useHistory()
    const dispatch = useDispatch();
    const userInfo = session.user
    const [backgroundUrl, setBackgroundUrl] = useState(userInfo.profileImage)
    useEffect(() => {
        dispatch(clearProfileBusinesses())
        if (!session.user) {
            history.push('/')
            return (
                <div></div>
            )
        } else {
            dispatch(getProfileBusinesses(userInfo.id))
        }
    }, [dispatch])
    const reviewedBusinesses = useSelector(state => state.business.reviewedBusinesses)
    const ownedBusinesses = useSelector(state => state.business.ownedBusinesses)
    if (!reviewedBusinesses || !ownedBusinesses) return (
        <>
            <h1>Loading...</h1>
        </>
    )

    async function imageExists(image_url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', image_url, false);
        http.send();
        return http.status != 404;
    }

    function imageExists(url, callback) {
        var img = new Image();
        img.onload = function () { callback(true); };
        img.onerror = function () { callback(false); };
        img.src = url;
    }


    imageExists(userInfo.profileImage, function (success) {
        if(success) {
            setBackgroundUrl(userInfo.profileImage)
        } else {
            setBackgroundUrl("http://simpleicon.com/wp-content/uploads/user1.png")
        }
    });


    return (
        <div className='profile-wrapper'>
            <div className='profile-content-wrapper'>
            <div className='profile-user-image-div' style={{ backgroundImage: `url(${backgroundUrl})`}}>
                </div>
                <div className='profile-wrapper'>
                    <h1>Hello {userInfo.username}!</h1>
                    <BusinessForm userInfo={userInfo}></BusinessForm>
                </div>
            </div>
            <div id='content-wrapper'>
                <BusinessList businessList={reviewedBusinesses} name={'Reviewed Businesses'} />
                <BusinessList businessList={ownedBusinesses} name={'Owned Businesses'} />
            </div>
        </div>
    )
}

export default ProfilePage
