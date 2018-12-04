import React from 'react'
import axios from 'axios'

import Toolbar from './Toolbar'
import MessageList from './MessageList'
import Compose from './Compose'

class App extends React.Component {

    state = { messages: [], compose: false }

    async componentDidMount() {
        this.getMessages()
    }

    getMessages = async () => {
        const response = await axios.get('http://localhost:8082/api/messages')
        
        this.setState({ messages: response.data })
        console.log(response.data)
    }


    onSendSubmit = async (body) => {
        // post
        await fetch("http://localhost:8082/api/messages", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            }, 
          })
        // set compose to false
          this.setState((prevState) => ({
              ...prevState,
              compose: false
          }))
        // update state with new message
          this.getMessages()
    }

    updateMessages = async (body) => {
        body = JSON.stringify(body)
       return await fetch("http://localhost:8082/api/messages", {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: body
          })
    }

    starUpdateCallback = (message) => {
        const messageCopy = {...message}
        messageCopy.starred === true ? messageCopy.starred = false : messageCopy.starred = true 
        return this.updateMessages({
            "messageIds": [messageCopy.id],
            "command": "star",
            "star": [messageCopy.starred]
        })
    }

    onStarClick = async(message) => {
        // change messaged referenced
        const withStarChange = this.state.messages.map(el => {
            if(el.id === message.id) {
                console.log('hello???', el.starred)
                el.starred === true ? el.starred = false : el.starred = true
                return el
            } else {
                return el
            }
        })
        
        // change state of messages
        this.setState({ messages: withStarChange })
        this.starUpdateCallback(message)
    }

    onCheckboxClick = (message) => {
        // change messaged referenced 
        const withCheckChange = this.state.messages.map(el => {
            if (el.id === message.id) {
                el.selected === true ? el.selected = false : el.selected = true
                return el
            } else {
                return el
            }
        })
        //change state of message
        this.setState(() => ({ messages: withCheckChange }))
    }

    onSelectAllClick = (status) => {
        let changedChecks
        if (status === 'someChecked' || status === 'noneChecked') {
            changedChecks = this.state.messages.map(el => {
                el.selected = true
                return el
            })
        } else if (status === 'allChecked') {
            changedChecks = this.state.messages.map(el => {
                el.selected = false
                return el
            })
        } else {
            changedChecks = this.state.messages
        }

        this.setState(() => ({ messages: changedChecks }))
    }

    readUpdateCallback = () => {
        this.updateMessages({
            "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
            "command": "read",
            "read": true
        })
    }

    onMarkReadClick = () => {
        const markedRead = this.state.messages.map(el => {
            if (el.selected === true) {
                el.read = true
                return el
            } else {
                return el
            }
        })

        this.setState(() => ({ messages: markedRead }))
        this.readUpdateCallback()
    }

    unreadUpdateCallback = () => {
        this.updateMessages({
            "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
            "command": "read",
            "read": false
        })
    }

    onMarkUnReadClick = () => {
        const markedUnRead = this.state.messages.map(el => {
            if (el.selected === true) {
                el.read = false
                return el
            } else {
                return el
            }
        })

        this.setState(() => ({ messages: markedUnRead }))
        this.unreadUpdateCallback()
    }

    deleteUpdateCallback = () => {
        this.updateMessages({
            "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
            "command": "delete"
        })
    }

    onDeleteClick = () => {
        const filteredList = this.state.messages.filter(el => {
            return el.selected === false || el.selected === undefined
        })

        this.setState(() => ({ messages: filteredList }))
        this.deleteUpdateCallback()
    }

    labelAddUpdateCallback = (label) => {
        this.updateMessages({
            "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
            "command": "addLabel",
            "label": label
        })
    }

    onLabelAdd = (label) => {
        if(label === 'Apply label'){
            this.setState(() => ({ messages: this.state.messages }))
        } else {
            const addedLabelList = this.state.messages.map(el => {
                if(el.selected === true && !el.labels.includes(label)) {
                    el.labels.push(label)
                    return el
                } else {
                    return el
                }
            })
    
            this.setState(() => ({ messages: addedLabelList }))
            this.labelAddUpdateCallback(label)
        }
    }

    labelRemoveUpdateCallback = (label) => {
        this.updateMessages({
            "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
            "command": "removeLabel",
            "label": label
        })
    }

    onLabelRemove = (label) => {
        if(label === 'Remove label') {
            this.setState(() => ({ messages: this.state.messages }))
        } else {
            const removedLabelList = this.state.messages.map(el => {
                if(el.selected === true && el.labels.includes(label)) {
                    el.labels.splice(el.labels.indexOf(label), 1)
                    return el
                } else {
                    return el
                }
            })
            
            this.setState(() => ({ messages: removedLabelList }))
            this.labelRemoveUpdateCallback(label)
        }
    }

    onComposeClick = () => {
        if(this.state.compose === false) {
            this.setState((prevState) => ({...prevState, compose: true}))
        } else {
            this.setState((prevState) => ({...prevState, compose: false}))
        }
    }

    renderContent() {
        if (!this.state.compose) {
            return <div></div>
        } else {
            return <Compose onSendSubmit={this.onSendSubmit} />
        }
    }

    render() {
        return (
            <div>
                <div className="container" >
                    <Toolbar 
                    messages={this.state.messages} 
                    onSelectAllClick={this.onSelectAllClick} 
                    onMarkReadClick={this.onMarkReadClick} 
                    onMarkUnReadClick={this.onMarkUnReadClick}
                    onDeleteClick={this.onDeleteClick}
                    onLabelAdd={this.onLabelAdd}
                    onLabelRemove={this.onLabelRemove}
                    onComposeClick={this.onComposeClick}
                    />
                    <MessageList 
                    messages={this.state.messages} 
                    onStarClick={this.onStarClick} 
                    onCheckboxClick={this.onCheckboxClick} 
                    />
                </div>
                <div className="container" >
                    {this.renderContent()}
                </div>
            </div>
        )
    }
}

export default App