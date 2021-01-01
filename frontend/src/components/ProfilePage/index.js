import './ProfilePage.css';
import BusinessForm from './BusinessForm'
import { useSelector } from "react-redux"

function ProfilePage() {
    const userInfo = useSelector(state => state.session.user)

    return (
        <>
            <h1>Hello {userInfo.username}!</h1>
            <BusinessForm userInfo={userInfo}></BusinessForm>
        </>
    )
}

export default ProfilePage
