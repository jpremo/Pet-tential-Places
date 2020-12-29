import './BusinessPage.css'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetch } from '../../store/csrf'

function BusinessPage() {
    let { id } = useParams()
    const fetchData = async () => {
        console.log('id', id)
        const res = await fetch(`/api/business/${id}`)
        const data = res.data
        console.log(data)
    }

    return (
        <h1 onClick={fetchData}>Business</h1>
    );
}

export default BusinessPage
