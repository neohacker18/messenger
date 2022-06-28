import React from 'react'
import Moment from 'react-moment'
const Message = ({msg,user1}) => {
  return (
    <div className={`message_wrapper`} style={{textAlign:`${msg.from!==user1?`left`:`right`}`}}>
        <p className={msg.from===user1?`me`:`friend`}>
            {msg.media?<img src={msg.media} alt={msg.text}/>:null}
            {msg.text}
            <br />
            <small>
                <Moment fromNow={msg.createdAt.toDate()}></Moment>
            </small>
        </p>
    </div>
  )
}

export default Message