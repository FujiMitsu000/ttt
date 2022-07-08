import { observer } from 'mobx-react-lite';
import React from 'react'
import './message.css'


const Message = observer((props) => {
  return (
    <div className={
      props.userId === 'server' ? 
        'serverMsg' 
        : 
        `message_from_${props.userId === 2 ? 'second' : 'first'}_player`
    }>
      {props.messageText}
    </div>
  )
})

export default Message
// `message_from_${thisUserId === message.userId ? 'second' : 'first'}_player`