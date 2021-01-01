import {Link} from 'react-router-dom'

function BusinessBox({business}) {
    let desc = business.description
    if(business.description.length > 500) desc = business.description.slice(0,500) + '...'

    let stars = Math.round(business.averageRating * 2)
    const starsArr = []
    for (let i = 0; i < 5; i++) {
        if (stars <= 0) {
            starsArr.push('')
        } else if (stars === 1) {
            starsArr.push('star-half-filled')
        } else {
            starsArr.push('star-filled')
        }
        stars -= 2;
    }

    return(
        <div className='business-box'>
            <Link to={`/business/${business.id}`} className='business-link'>{business.name}</Link>
            <div className='business-address'>{business.address}</div>
            <div className='star-container'>
                            {starsArr.map((el, ind) => {
                                return (
                                    <div className={`star ${el}`} key={ind}>
                                        <i className="fas fa-star fa-xs" id='innerstar-1' style={{ color: 'white', paddingBottom: '1px', paddingRight: '1px', opacity: '1' }}></i>
                                    </div>)
                            })}
                            <div className='review-number'>{(business.reviewNumber === 1) ? `1 Review` : `${business.reviewNumber} Reviews`}</div>
                        </div>
            <div className='business-description'>{desc}</div>
        </div>
    )
}

export default BusinessBox
