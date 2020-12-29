import { useSelector } from 'react-redux'

function Header() {

    let { businessInfo, allImages } = useSelector(state => {
        return ({
            businessInfo: state.business.businessInfo,
            allImages: state.business.allImages
        })
    })

    if (businessInfo) {
        let arr1 = []
        let arr2 = []
        allImages.forEach((el) => {
            if (el.userId === businessInfo.userId) {
                arr1.push(el)
            } else {
                arr2.push(el)
            }
        })
        allImages = [...arr1, ...arr2]
        console.log('info', businessInfo, allImages)

        return (
            <>
                <h1>{businessInfo.name}</h1>
                <h3>{businessInfo.address}</h3>
                <p>{businessInfo.description}</p>
            </>
        )
    } else {
        return (
            <h1>Loading...</h1>
        )
    }
}

export default Header
