import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../header'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// import ExploreMenu from '../exploreMenu'
import ProductItem from '../ProductItems'
import appUrl from '../../context/storeContext'
import { assets } from '../../assets/assets'

const apiStatusContext = {
  initial: "INITIAL",
  success: "SUCCESS",
  inProgress: "PROGRESS",
  failure: "FAILURE"

}
const Home = () => {
  const [apiResponse, setApiResponse] = useState({
    apiStatus: apiStatusContext.initial, data: null, errorMsg: null

  })
  const [addCartItem,setCartItem] = useState(false)
  

  const [searchInput, setSearchInput] = useState('')
  const onChangeSearchInput = (event) => {
    setSearchInput(event.target.value)
  }
  const onCartItemAdd = async (productId) => {
    setCartItem(true)
    setTimeout(() => {
      setCartItem(false)
    }, 3000)
  }


  const loaderCount = 10
  const skeletonArray = Array.from({ length: loaderCount }, (_, index) => index + 1)
  const apiResponseData = apiResponse.data || []
  const filteredData = apiResponseData.filter((product) =>
    product.name.toLowerCase().includes(searchInput.toLowerCase())
  )

  const renderSuccessView = () => {
    return (
        filteredData.length > 0 ? (<div className='product-list-container'>
          {addCartItem && <div className='cart-item-added'>Item added to cart</div>}
          <ul className='product-list'>
          {filteredData.map((product) => <ProductItem key={product.productId} productDetails={product} onCartItemAdd={onCartItemAdd}/>)}
        </ul></div>):(<div className='empty-result'>
          <p><b>Uh-oh!</b></p>
          <p>{`No result for ${searchInput} in Delivery. Please try something else.`}</p>
        </div>)
    )
  }

  const renderFailureView = () => {
    return (
      <div className='error-view'>
        <h1 className='error-message'>Something went wrong. Please try again later.</h1>
      </div>
    )
  }



  const renderLoadingView = () => {
    return (
      <div className='loading-view'>
        <ul className='product-list'>
          {skeletonArray.map((item) => (
            <li key={item} className='product-item'>
              <Skeleton className='skeleton-loader' />
              <div className='product-details'>
                <Skeleton count={2}  width={250}/>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const renderContent = () => {
    const { apiStatus } = apiResponse
    switch (apiStatus) {
      case apiStatusContext.success:
        return renderSuccessView()
      case apiStatusContext.failure:
        return renderFailureView()
      case apiStatusContext.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  useEffect(() => {
    setApiResponse(prevState => ({ ...prevState, apiStatus: apiStatusContext.inProgress }))
    const getProductItems = async () => {
      const url = appUrl;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          authorization: `Bearer ${Cookies.get('jwt_token')}`,
        }
      })
      const data = await response.json()
      if (response.ok) {
        setApiResponse({
          apiStatus: apiStatusContext.success,
          data: data,
          errorMsg: null
        })
      } else {
        setApiResponse({
          apiStatus: apiStatusContext.failure,
          data: null,
          errorMsg: data.error
        })
      }
    }
    getProductItems()
  }, [])



  return (
    <div className='home-page'>
      <Header />
      <div className='home-header'>
        <h1 className='product-text'>Products</h1>
        <div className='search-bar'>
          <input type='text' placeholder='Search...' className='search-input' onChange={onChangeSearchInput} />
          <img src={assets.search_icon} alt='search' className='search-icon' />
        </div>
      </div>
      {renderContent()}
      
    </div>
  )
}

export default Home
