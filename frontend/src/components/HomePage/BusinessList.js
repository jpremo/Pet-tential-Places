import { useEffect, useState } from 'react'
import BusinessBox from './BusinessBox'
import './HomePage.css'
function BusinessList({ businessList, name }) {
    if(businessList === null || businessList === undefined) {
        return(
            <div className='list-box'>
                <h1>{name}</h1>
                <h2>
                    Loading...
                </h2>
            </div>
        )
    }
    if (businessList.length === 0) return (
        <>
            <div className='list-box'>
                <h1>{name}</h1>
                <div>
                        <h2>No Results</h2>
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
