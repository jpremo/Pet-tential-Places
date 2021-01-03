import './ProfilePage.css';
import BusinessForm from './BusinessForm'
import { useSelector } from "react-redux"
import {useHistory} from 'react-router-dom'

function ProfilePage() {
    const session = useSelector(state => state.session)
    const history = useHistory()
    if(!session.user) {
        history.push('/')
        return(
            <div></div>
        )
    }
    const userInfo = session.user


    return (
        <>
            <h1>Hello {userInfo.username}!</h1>
            <BusinessForm userInfo={userInfo}></BusinessForm>
        </>
    )
}

export default ProfilePage
