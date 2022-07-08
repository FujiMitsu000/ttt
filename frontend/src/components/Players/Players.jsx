import React, { useContext } from 'react';
import { StoreContext } from '../../stores';
import { observer } from 'mobx-react-lite';
import './players.module.css'

const Players = observer(() => {
  const Store = useContext(StoreContext);

  // {status === 'active' ? 'fffdf' : ''}

  return (
    <div className='main'>
      <div className="box__header">
          <h1 className={["text", 'text_title', "players__title"].join(' ')}>Список игроков</h1>
          <button className={["button", "button_primary", "players__add-new"].join(' ')}>Добавить игрока</button>
        </div>
        <table className={["players__table", "table"].join(' ')}>
          <tr className="table__row">
            <th className={["text", "text_bold", "table__cell"].join(' ')}>Логин</th>
            <th className={["text", "text_bold", "table__cell"].join(' ')}>Статус</th>
            <th className={["text", "text_bold", "table__cell"].join(' ')}>Создан</th>
            <th className={["text", "text_bold", "table__cell"].join(' ')}>Изменен</th>
            <th className={["text", "text_bold", "table__cell"].join(' ')}></th>
          </tr>
          {
            Store.ActivePlayersStore.users.map(
                ({id, username, status, createdAt, updatedAt}) =>
                  
                    <tr className="table__cell">
                      <th className={["text table__cell", "players__login"].join(' ')}>{username}</th>
                      <th className={["text", "table__cell"].join(' ')}>
                        <div className={['players__status', `players__status_${status}`].join(' ')}>
                          {status === 'active' ? 'Активен' : 'Заблокирован'}
                        </div>
                      </th>
                      <th className={["text", "table__cell"].join(' ')}>{new Date(createdAt).toDateString().slice(4)}</th>
                      <th className={["text", "table__cell"].join(' ')}>{new Date(updatedAt).toDateString().slice(4)}</th>
                      <th className={["text", "table__cell", "players__button"].join(' ')}>
                        <button
                          className={['button', 'button_secondary', `players__${status === 'active' ? 'block' : 'unblock'}`].join(' ')}
                          data-id={id}
                        >
                          
                          {status === 'active' ? 'Заблокировать' : 'Разблокировать'}
                        </button>
                      </th>
                    </tr>
                  
              )
          }
        </table>
    </div>
  )
})

export default Players