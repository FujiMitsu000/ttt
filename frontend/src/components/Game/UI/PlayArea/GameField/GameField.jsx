import React, { useRef, useContext } from 'react'
import Cell from './Cell/Cell';
import stl from './game.module.css';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../../../../stores';


const GameField = observer(() => {
  const Store = useContext(StoreContext);
  const gameFieldRef = useRef(); // forwardRef
  

  const makeMove = (e) => {
    Store.GameStore.checkCells(e.target, gameFieldRef.current.children);
    Store.GameStore.playerMove(Store.GameStore.currentFieldPosition);
  }

  function renderCell(symbol, id) {
    return (
      <Cell 
        key={id}
        symbol={symbol}
      />
    );
  }


  return (
    <div className={stl.game_field} ref={gameFieldRef} onClick={(e) => makeMove(e)}>
        {Store.GameStore.field.map((symbol, index) => renderCell(symbol, index))}
    </div>
  )
})

export default GameField;