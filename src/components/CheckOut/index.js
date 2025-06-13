
import Cookies from 'js-cookie'
import './index.css'
import { useState, useEffect } from 'react'
import appUrl from '../../context/storeContext'
const apiStatusContext = {
    initial: "INITIAL",
    success: "SUCCESS",
    inProgress: "PROGRESS",
    failure: "FAILURE"
}
const CheckOut = () => {
    const onSubmitForm = (event) => {
        event.preventDefault()
        console.log('form submitted')
    }
    const [cartItemsData, setCartItemsData] = useState({
        apiStatus: apiStatusContext.initial,
        data: [],
        errorMsg: null
      })
    const jwtToken = Cookies.get('jwt_token')
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
    useEffect(() => {
        getCartItems()
      }, [])
      const { data } = cartItemsData
      const totalPrice = data.reduce((acc, item) => acc + item.price * item.quantity, 0)
      const gst = Math.ceil(totalPrice * 0.18)
      const deliveryCharge = totalPrice > 150 ? 0 : 50
      const totalAmount = totalPrice + gst + deliveryCharge
      
    return (
        <div className="checkout-container">
            <div className='information-container'>
                <h1 className='contact-text'>Contact Information</h1>
                <form onSubmit={onSubmitForm} className='checkout-form'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" id="phone" name="phone" required />

                    <h1 className='address-text'>Address</h1>
                    <label htmlFor="address">Address Line 1:</label>
                    <input type="text" id="address" name="address" required />
                    <label htmlFor="address2">Address Line 2:</label>
                    <input type="text" id="address2" name="address2" />
                    <label htmlFor='pincode'>Pincode:</label>
                    <input type="text" id="pincode" name="pincode" required />
                    <button type="submit" className='place-order-button'>Place Order</button>
                   
                </form>
            </div>
            <div className='order-container'>
                <h1 className='order-text'>Order Summary</h1>
                <ul className='order-list'>
                    {data.map(item => (
                        <li key={item.cartId} className='order-item'>
                           <div className='order-item-image-container'><img src={item.imgUrl} alt={item.name} className='order-item-image'/>
                            <h2 className='order-item-name'>{item.name}</h2></div>
                            <p className='order-item-total-price'>{`Rs:${item.price} Total ₹${item.price * item.quantity}`} </p>
                        </li>
                    ))}
                </ul>
                <hr className='order-hr'/>
                {/* <h3 className='tip-text'>Tip Amount</h3>
                <div className='tip-container'>
                    <button className='tip-button'>10</button>
                    <button className='tip-button'>20</button>
                    <button className='tip-button'>30</button>
                </div> */}
                <div>
                <p className='total-price-text'>{`Total Price: ₹${totalPrice}`}</p>
                <p className='gst-text'>{`GST: ₹${gst}`}</p>
                <p className='delivery-charge-text'>{`Delivery Charge: ₹${deliveryCharge}`}</p>
                <p className='total-amount-text'>{`Total Amount: ₹${totalAmount}`}</p>
                </div>
                  </div>

            
        </div>
    )
}

export default CheckOut
