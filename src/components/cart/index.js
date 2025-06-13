import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import appUrl from '../../context/storeContext'
import CartItems from '../CartItems'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const apiStatusContext = {
  initial: "INITIAL",
  success: "SUCCESS",
  inProgress: "PROGRESS",
  failure: "FAILURE"
}
const Cart = () => {
  const jwtToken = Cookies.get('jwt_token')
  const history = useHistory()

  const [cartItemsData, setCartItemsData] = useState({
    apiStatus: apiStatusContext.initial,
    data: [],
    errorMsg: null
  })


  useEffect(() => {

    getCartItems()
  }, [])

  const getCartItems = async () => {
    setCartItemsData({
      ...cartItemsData,
      apiStatus: apiStatusContext.inProgress
    })

    const apiUrl = `${appUrl}/cartItems`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      setCartItemsData({
        apiStatus: apiStatusContext.success,
        data: data,
        errorMsg: null
      })
    } else {
      console.error('Failed to fetch cart items:', data.error)
    }
  }

  const onDeleteCartItem = async (cartId) => {
    setCartItemsData({
      ...cartItemsData,
      apiStatus: apiStatusContext.inProgress
    })
    const apiUrl = `${appUrl}/cart/${cartId}`
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    
    if (response.ok) {
      setCartItemsData({
        ...cartItemsData,
        apiStatus: apiStatusContext.success,
        data: data,
        errorMsg: null
      })
      getCartItems()
      console.log('Item removed from cart successfully')
    } else {
      console.error('Failed to remove item from cart:')
    }
  }





  const { data, apiStatus } = cartItemsData
  const totalPrice = data.reduce((acc, item) => acc + item.price * item.quantity, 0)
  



  const renderContent = () => {
    switch (apiStatus) {
      case apiStatusContext.success:
        return (
          data.length > 0 ? (<ul className='cart-items-list'>
            {data.map(item => (
              <CartItems
                key={item.cartId}
                cartItems={item}
                onDeleteCartItem={onDeleteCartItem}
              />
            ))}
            <li className='total-price-item'>
              <h2 className='total-price-text'>Total Price: ₹{totalPrice}</h2>
              <button className='checkout-button' onClick={()=>history.push('/checkout')}>Checkout</button>
            </li>
          </ul>) : (
            <div className='empty-cart-view'>
              <h1 className='empty-cart-message'>Your cart is empty</h1>
            </div>
          )
        )
      case apiStatusContext.failure:
        return <div className='error-view'><h1 className='error-message'>Something went wrong. Please try again later.</h1></div>
      case apiStatusContext.inProgress:
        return <div className='loading-view'>
          <ul>
            {Array.from({ length: 5 }).map(item => (
              <li key={item.cartId} className='cart-item'>
                <Skeleton className='cart-skeleton' />
                <Skeleton className='cart-skeleton-2' />
                <Skeleton className='cart-skeleton-2' />
                <Skeleton className='cart-skeleton-2' />
                <Skeleton className='cart-skeleton-2' />
              </li>
            ))}
          </ul>
        </div>
      default:
        return null
    }
  }


  return (
    <div>
      <h1 className='cart-text'>Cart</h1>
      {renderContent()}
    </div>
  )
}

export default Cart
