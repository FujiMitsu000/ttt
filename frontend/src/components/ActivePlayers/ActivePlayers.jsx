import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../stores';
import './activePlayers.css';

const ActivePlayers = observer(() => {
  const Store = useContext(StoreContext);

  return (
    <div className='main'>
      <h1>Игроки онлайн</h1>
        <div className='content'>
          <table>
            <tbody>
              {
                Store.ActivePlayersStore.activePlayers.map(
                  ({user, status}) => 
                    <tr key={user} className="table__row">
                      <th className="text table__cell active-players__login">{user}</th>
                      <th className="text table__cell active-players__status-wrapper">
                        <div
                            className={
                            [
                              'active-players__status',
                              `active-players__status_${status ? 'free' : 'busy'}`
                            ].join(' ')
                          }
                        >
                          {status ? 'Свободен' : 'В игре'}
                        </div>
                      </th>
                      <th className="text table__cell active-players__button">
                        <button
                          className={
                            [
                              'button',
                              'button_primary',
                              'active-players__invite',
                              ...!status ? ['disabled'] : []
                            ].join(' ')
                          }
                        >
                          Позвать играть
                        </button>
                      </th>
                    </tr>
                  
                )
              }
            </tbody>
          </table>

        </div>
    </div>
  )
})

export default ActivePlayers