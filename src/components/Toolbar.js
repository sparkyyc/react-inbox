import React from 'react'

const selectedConfig = {
 allChecked: { selectedStatus: 'fa-check-square-o' },
 someChecked: { selectedStatus: 'fa-minus-square-o' },
 noneChecked: { selectedStatus: 'fa-square-o' }
}

const getSelectedStatus = (messages = []) => {
    if (messages.every(message => message.selected === true)) {
        return 'allChecked'
    } else if (messages.some(message => message.selected === true)) {
        return 'someChecked'
    } else {
        return 'noneChecked'
    }
}

class Toolbar extends React.Component {

    onSelectAllClick = (status) => {
        const { onSelectAllClick } = this.props

        onSelectAllClick(status)
    }

    onMarkReadClick = () => {
        const { onMarkReadClick } = this.props

        onMarkReadClick()
    }

    onMarkUnReadClick = () => {
        const { onMarkUnReadClick } = this.props

        onMarkUnReadClick()
    }

    onDeleteClick = () => {
        const { onDeleteClick } = this.props

        onDeleteClick()
    }

    onLabelAdd = (event) => {
        const { onLabelAdd } = this.props

        onLabelAdd(event.target.value)
    }

    onLabelRemove = (event) => {
        const { onLabelRemove } = this.props

        onLabelRemove(event.target.value)
    }

    onComposeClick = () => {
        const { onComposeClick } = this.props

        onComposeClick()
    }

    render() {
        const status = getSelectedStatus(this.props.messages)
        const { selectedStatus } = selectedConfig[status]
        let unreadCount
        
        if (this.props.messages.length) {
            unreadCount = this.props.messages
                .map(msg => msg.read)
                .reduce((acc, cur, index, arr) => {
                    if (!cur) return acc + 1
                    return acc
                }, 0)
        }
        

        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                    <span className="badge badge">{unreadCount}</span>
                    unread messages
                    </p>

                    <a className="btn btn-danger" onClick={this.onComposeClick} >
                    <i className="fa fa-plus"></i>
                    </a>

                    <button className="btn btn-default" onClick={() => this.onSelectAllClick(status)} >
                    <i className={`fa ${selectedStatus}`}></i>
                    </button>

                    <button className="btn btn-default" onClick={this.onMarkReadClick} >Mark As Read</button>

                    <button className="btn btn-default" onClick={this.onMarkUnReadClick} >Mark As Unread</button>

                    <select className="form-control label-select" onChange={this.onLabelAdd} >
                    <option>Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                    </select>

                    <select className="form-control label-select" onChange={this.onLabelRemove} >
                    <option>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                    </select>

                    <button className="btn btn-default" onClick={this.onDeleteClick} >
                    <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default Toolbar