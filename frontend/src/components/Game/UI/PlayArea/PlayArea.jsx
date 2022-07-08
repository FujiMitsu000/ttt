import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { StoreContext } from '../../../../stores'
import GameField from './GameField/GameField'
import PlayerIcon from './PlayerIcon/PlayerIcon'
import stl from './playArea.module.css'



const PlayArea = observer(() => {
    const Store =  useContext(StoreContext);

    // передавать игрока сразу с символом х\о 
    // вставить в props.playerSymbol и делать смену 
    // цвета по символу игрока, а не по айдишнику

    return (
        <div className={stl.play_area}>

            <PlayerIcon playerName={Store.AuthStore.thisUser.name} playerSymbol={'X'} currentMove={Store.GameStore.colorPlayerOne}/>

            <GameField/>

            <PlayerIcon playerName={Store.GameStore.secondPlayer.name} playerSymbol={'O'} currentMove={Store.GameStore.colorPlayerTwo}/>

        </div>
    )
})

export default PlayArea