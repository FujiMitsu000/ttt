import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import {ReactComponent as MenuIcon} from '../../assets/svg/menu.svg';
import {ReactComponent as ExitIcon} from '../../assets/svg/exit.svg';
import Menu from './Menu/Menu';
import './navbar.css'
import { StoreContext } from '../../stores';

const Navbar = observer((props) => {
    const Store = useContext(StoreContext);


  return (
    <nav onClick={e => e.stopPropagation()}>
        <MenuIcon 
            className={['svg_menu_icon', 'svg_icon'].join(' ')} 
            onClick={() => Store.NavbarStore.changeActive()}
        />
        <ExitIcon
            className={['svg_exit_icon', 'svg_icon'].join(' ')}
            onClick={() => Store.AuthStore.logout()}
        />
    </nav>
  )
})

export default Navbar



// onMouseDown onMouseEnter onMouseLeave
// onMouseMove onMouseOut onMouseOver onMouseUp