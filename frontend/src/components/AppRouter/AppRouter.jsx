import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
import { StoreContext } from '../../stores';
import Login from '../Login/Login';
import Menu from '../Navbar/Menu/Menu';
import Navbar from '../Navbar/Navbar';

const AppRouter = observer((props) => {
  const Store = useContext(StoreContext);

  return (
    <Routes>
      {props.routes.map(route =>
          <Route
            key={route.path}
            path={route.path}
            element={
                (Store.AuthStore.Authorized
                ?
                <>
                  <Navbar />
                  <Menu routes={props.routes} />  
                  {route.component}
                </>
                :
                <Login/>
                )
            }
          />
      )}
    </Routes>
  )
})

export default AppRouter