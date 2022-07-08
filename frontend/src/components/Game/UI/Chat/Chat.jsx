import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import stl from './chat.module.css'
import Message from './Message/Message'
import { StoreContext } from '../../../../stores';


const Chat = observer(() => {
  const Store = useContext(StoreContext);
  
  Store.ChatStore.onConnectionChat();
  // console.log(Store.ChatStore.messageText);

  return (
    <div className={stl.chat} >
      
      <div className={stl.chatWindow}>
        {Store.ChatStore.messages.map((msg) => 
          <Message 
            key={msg.id}
            userId={msg.userId} 
            messageText={msg.text}
          />
        )}
      </div>
      <div className={stl.chatInputs}>
        <input 
          className={stl.chatText} 
          type="text" 
          placeholder=". . ." 
          onChange={e => Store.ChatStore.handleChangeText(e.target.value)}
        />
        <input 
          className={stl.chatSubmit} 
          onClick={() => Store.ChatStore.handleSendMessage()} 
          type="submit" 
          value='Отправить'
        />
      </div>
      
    </div>
  )
})   

export default Chat