import React from 'react'
import './index.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = (props) => {
    const { category, setCategory } = props
    
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore Menu</h1>
            <p>We have a wide variety of food items to choose from. Explore our menu and find your favourite food.</p>
            <div className='menu-list'>
                {menu_list.map((item, index) => {
                    return (
                        <div onClick={() => setCategory(prevState =>prevState===item.menu_name?'All':item.menu_name)} key={index} className='menu-item'>
                            <img className={category === item.menu_name?"active":''} src={item.menu_image} alt='' />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}
                

            </div>
        </div>
    )
}

export default ExploreMenu
