import {useHistory }from 'react-router-dom'
import './index.css'

const Header = () => {
  const history = useHistory()
  const onGotoCart = () => {
   history.push('/cart')
  }

  return (
    <div  className='header'>
      <div className='header-contents'>
        <h2>Order your favourite food here</h2>
        <p>We deliver food to your doorstep</p>
        <button className='header-button' onClick={onGotoCart}>View Cart</button>
      </div>
    </div>
  )
}

export default Header
