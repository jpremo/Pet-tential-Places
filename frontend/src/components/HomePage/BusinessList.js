import BusinessBox from './BusinessBox'
import './HomePage.css'
function BusinessList({ businessList, name, search=false }) {
    if (!businessList || businessList.length === 0) return (
        <>

            <div className='list-box'>
                <h1>{name}</h1>
                <div>
                    {!search &&
                        <h2>No Results</h2>
                    }
                </div>
            </div>

        </>
    )
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
