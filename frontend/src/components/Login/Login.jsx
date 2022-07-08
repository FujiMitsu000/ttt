import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { StoreContext } from '../../stores'
import ErrorHolder from './ErrorHolder/ErrorHolder'
import './login.css'

const Login = observer((props) => {
const Store = useContext(StoreContext);

  return (
    <div className='container'>
      <main className="main-holder">
        <h1 className="login-header">Вход</h1>
        <p className='login-notice'>
          Введите никнейм и пароль в поля ниже для входа или регистрации аккаунта
        </p>
        <ErrorHolder/>
        
        <form className="login-form">
          <input 
            className="login-form-field" 
            type="text" 
            name="username" 
            placeholder="Никнейм"
            onChange={e => Store.AuthStore.setLogin(e.target.value)}
          />
          <input 
            className="login-form-field" 
            type="password" 
            name="password" 
            placeholder="Пароль"
            onChange={e => Store.AuthStore.setPassword(e.target.value)}
          />
          <input 
            className='button-form-submit' 
            type="submit" 
            value="Вход"
            onClick={(e) => {
              e.preventDefault(); 
              Store.AuthStore.getToken();
            }}
          />
          <p className='login-word-or'>или</p>
          <input 
            className='button-form-submit'
            type="submit" 
            value="Регистрация"
            onClick={(e) => {
              e.preventDefault(); 
              Store.AuthStore.registration();
            }}
          />
        </form>
      </main>
    </div>
  )
})

export default Login