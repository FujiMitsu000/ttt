import React, { useContext } from 'react'
import './menu.css'
import { StoreContext } from '../../../stores';
import { observer } from 'mobx-react-lite';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';

const Menu = observer((props) => {
    const Store = useContext(StoreContext);
    // ДОБАВТЬ КЛАСС АКТИВ НА НАЖАТУЮ ССЫЛКУ


    // {Store.NavbarStore.menuActive ? 'menu.active' : 'menu'}
    // {Store.NavbarStore.menuActive ? 'menu_content.active' : 'menu_content'}
  return (
    <div 
        className={Store.NavbarStore.menuActive ? 'menu_active' : 'menu_disable'}
        onClick={() => Store.NavbarStore.changeActive()}
    >
        <div className='menu_content' onClick={e => e.stopPropagation()}>   
            <ul>
                {props.routes.map(route => 
                    <li key={route.path}>
                        <Link 
                            className={
                                [
                                    'link_navigation_menu',
                                    
                                ]
                            } 
                            to={route.path}>{route.title}
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    </div>
  )
})

export default Menu

// .menu {
//     position: fixed;
//     /* width: 100vw;
//     height: 100vh; */
//     /* top: 50px;
//     left: 0; */
//     /* transform: translateX(-100%); */
//     /* transition: all 0.7s; */
//     /* overflow-y: none; */
//     text-decoration: none;
//     /* display: none; */

// }

// /* .window {
//     width: 100vw;
//     height: 100vh;
//     position: absolute;
    
// } */

// .menu.active {
//     /* transform: translateX(0%); */
//     /* transition: all 0.7s; */
//     display: block;
//     position: fixed;

// }

// .menu_content {
//     padding-top: 40px;
//     /* width: 40vh;
//     height: 100vh; */
//     background-color: #2C3033;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     /* transition: all 0.7s; */
//     box-shadow: 0 0 3px 7px #2C3033;
//     text-decoration: none;
//     display: none;
// }