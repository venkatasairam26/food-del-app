import './index.css'
import { useHistory } from 'react-router-dom'
import page_not_found from '../../assets/page_not_found.png'

const NotFound = () => {
    const history = useHistory()
    return (
        <div className='not-found'>
            <div className='not-found-image'>
            <img src={page_not_found} alt="not-found" />
            </div>
            <h2>Page Not Found</h2>
            <p>Uh-oh! Looks like the page you are trying to access, doesn't exist. Please start afresh.</p>
            <button onClick={() => history.push('/')} className='not-found-button'>Back to Home</button>
        </div>
    )
}

export default NotFound
