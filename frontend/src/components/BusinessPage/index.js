import './BusinessPage.css'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import { fetch } from '../../store/csrf'
import { useEffect } from 'react'
import { getBusinessInfo } from '../../store/business'
import Posts from './posts'
import Header from './header'
function BusinessPage({setShowModal, showModal}) {
    let { id } = useParams()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBusinessInfo(id))
    }, [dispatch])
    return (
        <>
            <Header setShowModal={setShowModal} showModal={showModal}></Header>
            {/* <Posts></Posts> */}
        </>
    )
}

export default BusinessPage
