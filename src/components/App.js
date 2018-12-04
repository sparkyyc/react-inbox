import React from 'react'
import axios from 'axios'

import Toolbar from './Toolbar'
import MessageList from './MessageList'
import Compose from './Compose'

class App extends React.Component {

    state = { messages: [], compose: false }

    async componentDidMount() {
        const response = await axios.get('http://localhost:8082/api/messages')
        
        this.setState({ messages: response.data })
        console.log(response.data)
    }

    onStarClick = (message) => {
        // change messaged referenced
        const withStarChange = this.state.messages.map(el => {
            if(el.id === message.id) {
                el.starred === true ? el.starred = false : el.starred = true
                return el
            } else {
                return el
            }
        })
        // change state of messages
        this.setState(() => ({ messages: withStarChange }))
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
    }

    onDeleteClick = () => {
        const filteredList = this.state.messages.filter(el => {
            return el.selected === false || el.selected === undefined
        })

        this.setState(() => ({ messages: filteredList }))
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
        }
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
            return <Compose />
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