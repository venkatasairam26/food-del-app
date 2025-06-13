
import { Link, useLocation } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import './index.css'
import { assets } from '../../assets/assets'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation()
    const history = useHistory()
    const onLogoutClicked = () =>{
            Cookies.remove('jwt_token')
            history.replace('/login')
        }





    return (
        <div className='navbar'>
            <Link to='/' className="nav-link" ><img src={assets.logo} alt='logo' className='logo' /></Link>

            <div className='navbar-right'>
                <div className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}><Link to='/' className="nav-link"><FaHome className='nav-icon' /></Link></div>
                <div className={`nav-item ${location.pathname === '/cart' ? 'active' : ''}`} >
                    <Link to='/cart' className="link-item cart-basket"><FaShoppingCart className='nav-icon' /></Link>
                </div>
                <div className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`} >
                    <div className="profile-link"><FaUser className='nav-icon' />
                        <div className='profile-dropdown'>
                            <div className='profile-dropdown-item'><Link to='/profile' className="link-item">Profile</Link></div>
                            <div className='profile-dropdown-item'><Link to='/orders' className="link-item">Orders</Link></div>
                            <button className='logout-button' onClick={onLogoutClicked}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
