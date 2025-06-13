import './index.css';

const CartItems = (props) => {
    const { cartItems,onDeleteCartItem} = props;
    console.log(cartItems);
    const { cartId, imgUrl, name, price, quantity } = cartItems;

    const onRemoveFromCart = () =>{
        onDeleteCartItem(cartId);
    }

    return (
        <li>
            <div className="cart-item" >
                <div className='cart-img-name'>
                    <img src={imgUrl} alt={name} className="cart-item-image" />
                    <h2 className="cart-item-name">{name}</h2>
                </div>

                <p className="cart-item-price">₹{price}</p>
                <p className="cart-item-quantity">Quantity: {quantity}</p>
                <p className="cart-item-total-price">Total Price: ₹{price * quantity}</p>
                {/* <p className="cart-item-quantity">Quantity: {totalItems}</p>
                    <p className="cart-item-total-price">Total Price: ₹{totalPrice}</p> */}
                <button className="remove-from-cart-button" onClick={onRemoveFromCart}>Remove from Cart</button>
            </div>

        </li>
    );
}

export default CartItems;