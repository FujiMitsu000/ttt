import React, { useState } from 'react'
import {observer} from 'mobx-react-lite'
import stl from './cell.module.css'
import {ReactComponent as Cross} from '../../../../../../assets/svg/cross.svg';
import {ReactComponent as Circle} from '../../../../../../assets/svg/circle.svg'



const Cell = (props) => {
  return (
    <div className={stl.gameField_cell}>
      {props.symbol ?
        props.symbol === 'X' ? <Cross className={stl.cross}/> : <Circle className={stl.circle}/> 
        : 
        ''
      }
    </div>
  )
}

export default Cell;
