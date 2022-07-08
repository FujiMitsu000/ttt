import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { StoreContext } from '../../../../../stores'
import './playerIcon.css'

const PlayerIcon = observer((props) => {
    const Store =  useContext(StoreContext);

  return (
    <div className={
            [
                `background_player`, 
                props.currentMove
            ].join(' ')
        }>
        <div className='players'>
            <p>{props.playerName}</p>
            <div>{props.playerSymbol}</div>
        </div>
    </div>
  )
})

export default PlayerIcon


