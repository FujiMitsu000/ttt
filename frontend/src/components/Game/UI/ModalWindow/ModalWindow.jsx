import React, { useContext } from 'react'
import { StoreContext } from '../../../../stores'
import { observer } from 'mobx-react-lite'
import './modalWindow.css'

const ModalWindow = observer(() => {
    const Store =  useContext(StoreContext);

    return (
        <div
            className={Store.GameStore.modalActive ? 'resultWindow.active' : 'resultWindow'}
        >
            <div className='overlay'>
                <div className='modalWindow'>
                        <div className='textWindow'>
                            {Store.GameStore.gameResult}
                        </div>
                    <input 
                        className={['modal_reset_button', 'reset_button'].join(' ')} 
                        type="button" 
                        value="Реванш"
                        onClick={() => Store.GameStore.closeModalWindow()} 
                    />
                </div> 
            </div>
        </div>
    )
})

export default ModalWindow