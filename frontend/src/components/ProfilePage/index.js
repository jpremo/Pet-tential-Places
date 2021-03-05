import './ProfilePage.css';
import { useEffect, useState } from 'react'
import BusinessForm from './BusinessForm'
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'
import { clearProfileBusinesses, getProfileBusinesses } from '../../store/business'
import BusinessList from '../HomePage/BusinessList'
import ImageUpload from '../BusinessPage/imageUpload'
import ProfileUpload from '../ProfileUpload';

function ProfilePage() {
    const session = useSelector(state => state.session)
    const history = useHistory()
    const dispatch = useDispatch();
    const userInfo = session.user
    const [backgroundUrl, setBackgroundUrl] = useState(userInfo.profileImage)
    const [fillingForm, setFillingForm] = useState(false)
    const [profileImage, setProfileImage] = useState('')
    const [uploadedImages, setUploadedImages] = useState([])
    useEffect(() => {
        dispatch(clearProfileBusinesses())
        if (!session.user) {
            history.push('/')
            return (
                <div></div>
            )
        } else {
            dispatch(getProfileBusinesses(userInfo.id))
            setProfileImage(userInfo.profileImage)
        }
    }, [dispatch])
    const reviewedBusinesses = useSelector(state => state.business.reviewedBusinesses)
    const ownedBusinesses = useSelector(state => state.business.ownedBusinesses)
    if (!reviewedBusinesses || !ownedBusinesses) return (
        <>
            <h1>Loading...</h1>
        </>
    )

    function imageExists(url, callback) {
        var img = new Image();
        img.onload = function () { callback(true); };
        img.onerror = function () { callback(false); };
        img.src = url;
    }


    imageExists(userInfo.profileImage, function (success) {
        if (success) {
            setBackgroundUrl(userInfo.profileImage)
        } else {
            setBackgroundUrl("http://simpleicon.com/wp-content/uploads/user1.png")
        }
    });


    return (
        <div className='profile-wrapper'>
            <div className='profile-content-wrapper'>
                {!fillingForm &&
                    <>
                        <ProfileUpload setter={setUploadedImages} value={profileImage} defaultValue={`${profileImage}`} profilePage={true}/>
                    </>
                }
                <div className='profile-wrapper'>
                    {!fillingForm &&
                        <h1>Hello {userInfo.username}!</h1>
                    }
                    <BusinessForm userInfo={userInfo} setFillingForm={setFillingForm}></BusinessForm>
                    {/* <ImageUpload uploadedImages={uploadedImages} maxSize={1} setUploadedImages={setUploadedImages} ></ImageUpload> */}
                </div>
            </div>
            {!fillingForm &&
                <div id='content-wrapper'>
                    <BusinessList businessList={reviewedBusinesses} name={'Reviewed Businesses'} />
                    <BusinessList businessList={ownedBusinesses} name={'Owned Businesses'} />
                </div>
            }
        </div>
    )
}

export default ProfilePage
