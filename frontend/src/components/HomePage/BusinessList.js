import BusinessBox from './BusinessBox'
import './HomePage.css'
function BusinessList({ businessList, name }) {
    return (
        <div className='list-box'>
            <h1>{name}</h1>
            {businessList.map((el, ind) => {
                return (
                    <BusinessBox business={el} key={ind} />
                )
            })}
        </div>
    )
}

export default BusinessList
