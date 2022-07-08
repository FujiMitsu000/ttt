import React, { useContext } from 'react';
import { StoreContext } from '../../stores';
import { observer } from 'mobx-react-lite';
import stl from './profile.module.css'

const Profile = () => {
    const Store = useContext(StoreContext);

  return (
    <div className={stl.main} >
        <input 
        type="text" 
        placeholder=". . ." 
        onChange={e => Store.AdminStore.setText(e.target.value)}
    />
    <input 
        onClick={() => Store.AdminStore.blockUser()} 
        type="submit" 
        value='Отправить'
    />
    </div>
  )
}

export default Profile