import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
import Game from './components/Game/Game';
import './assets/style/App.css';
import Navbar from './components/Navbar/Navbar';
import { observer } from 'mobx-react-lite';
import { StoreContext } from './stores';
import Menu from './components/Navbar/Menu/Menu';
import Rating from './components/Rating/Rating';
import ActivePlayers from './components/ActivePlayers/ActivePlayers';
import Players from './components/Players/Players';
import History from './components/History/History';
import NotFound from './components/404/404';
import AppRouter from './components/AppRouter/AppRouter';
import Login from './components/Login/Login';
import Chat from './components/Game/UI/Chat/Chat';
import Profile from './components/Profile/Profile';


const App = observer(() => {
  const Store =  useContext(StoreContext);
  const routes = [
    {
      path: '/game/:id',
      // getParam: () => context.GameStore.game?.id,
      title: 'Игровое поле',
      component: <Game/>
    },
    // {
    //   path: '/game',
    //   title: null,
    // component: <Game/>
    // },
    {
      path: '/rating',
      title: 'Рейтинг',
      component: <Rating/>
    },
    {
      path: '/active',
      title: 'Активные игроки',
      component: <ActivePlayers/>
    },
    {
      path: '/history',
      title: 'История игр',
      component: <History/>
    },
    {
      path: '/players',
      title: 'Список игроков',
      component: <Players/>
    },
    {
      path: '/profile/:id',
      title: 'Профиль',
      component: <Profile/>,
    },
    {
      path: '/',
      component: <Navigate replace to="/history"/>,
    },
    {
      path: '*',
      component: <NotFound/>,
    }
  ];
  console.log(Store.AuthStore.Authorized);

  return (
    <div className="App" >

        <BrowserRouter>
        
            <AppRouter routes={routes} />
          
        </BrowserRouter>

    </div>
  );
})

export default App;
