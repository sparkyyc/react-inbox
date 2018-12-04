import React from 'react'
import Label from './Label'

class Message extends React.Component {

    onStarClick = () => {
        const { onStarClick } = this.props

        onStarClick(this.props.message)
    }

    onCheckboxClick = () => {
        const { onCheckboxClick } = this.props

        onCheckboxClick(this.props.message)
    }


    render() {

        let readStatus = this.props.message.read ? 'read' : 'unread'
        let starStatus = this.props.message.starred ? 'fa-star' : 'fa-star-o'
        let selectStatus = this.props.message.selected ? 'selected' : 'unselected'
        let checkStatus = selectStatus === 'selected' ? 'checked' : ''
        
        return (
            <div className={`row message ${readStatus} ${selectStatus}`}>
                <div className="col-xs-1">
                <div className="row">
                    <div className="col-xs-2">
                    <input type="checkbox" checked={checkStatus} onClick={this.onCheckboxClick} key={this.props.message.id} />
                    </div>
                    <div className="col-xs-2">
                    <i className={`star fa ${starStatus}`} onClick={this.onStarClick} key={this.props.message.id}></i>
                    </div>
                </div>
                </div>
                <div className="col-xs-11">
                <Label message={this.props.message} />
                <a href="#" key={this.props.message.id}>
                    {this.props.message.subject}
                </a>
                </div>
            </div>
        )
    }
}

export default Message