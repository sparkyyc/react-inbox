import React from 'react'
import Message from './Message'

const MessageList = (props) => {

    const listOfMessages = props.messages.map(message => {
        return <Message message={message} onStarClick={props.onStarClick} onCheckboxClick={props.onCheckboxClick} />
    })

    return(
        <div className="container">
            {listOfMessages}
        </div>
    )
}

export default MessageList