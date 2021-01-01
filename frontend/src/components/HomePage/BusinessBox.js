

function BusinessBox({business}) {
    return(
        <div className='business-box'>
            <h3>{business.name}</h3>
            <p>{business.description}</p>
        </div>
    )
}

export default BusinessBox
