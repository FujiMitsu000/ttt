import React, { useContext } from 'react'
import Chat from './UI/Chat/Chat'
import PlayArea from './UI/PlayArea/PlayArea';
import stl from './game.module.css';
import ModalWindow from './UI/ModalWindow/ModalWindow';
import { StoreContext } from '../../stores';
import Menu from '../Navbar/Menu/Menu';
import { observer } from 'mobx-react-lite';


const Game = observer((props) => {
  const Store =  useContext(StoreContext);
  
  return (
    <div className={stl.game}>
      <PlayArea />
      <Chat />
      <ModalWindow />
    </div>
  )
})

export default Game