import {useState} from 'react'
import appUrl from '../../context/storeContext'
import Cookies from 'js-cookie'
import './index.css'



const ProductItem = (props) => {
    const { productDetails } = props
    const { productId, imgUrl, name, category, price } = productDetails
    const [addCartItem,setCartItem] = useState(false)

    const showNotification = () => {
        setCartItem(true)
        setTimeout(() => {
          setCartItem(false)
        }, 3000)
      }

    const onAddItemCart = async () => {
        const url = `${appUrl}/cart`
        const jwtToken = Cookies.get('jwt_token')
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify({
                productId,
                quantity: 1, 
            }),
        }
        const response = await fetch(url, options)
        if (response.ok) {
            showNotification()
        } else {
            const errorData = await response.json()
            console.error('Failed to add item to cart:', errorData.error)
        }
    }

    return (
        <li className="product-item" key={productId}>
            {addCartItem && <div className='cart-item-added'><h3>Item added to cart</h3></div>}
            <img src={imgUrl} alt={name} className="product-image" />
            <div>
                <h2 className="product-name">{name}</h2>
                <p className="product-category">{category}</p>
                <p className="product-price">₹{price}</p>
                <button className="add-to-cart-button" onClick={onAddItemCart}>Add to Cart</button>
            </div>
        </li>
    )
}

export default ProductItem