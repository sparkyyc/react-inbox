import React from 'react'
const uuidv4 = require('uuid/v4');

class Compose extends React.Component {

    state = { subject: '', body: '' }

    onSendSubmit = (e) => {
        e.preventDefault()
        const { onSendSubmit } = this.props
        const { subject, body } = this.state
        let message = {
            subject,
            body
        }

        onSendSubmit(message)
    }

    onSubjectChange = (e) => {
        e.preventDefault()
      this.setState({
        ...this.state,
        subject: e.target.value
      })
    }

    onBodyChange = (e) => {
        e.preventDefault()
        this.setState({
            ...this.state,
            body: e.target.value
        })
    }

    render() {
        return (
            <div>
                <form className="form-horizontal well" onSubmit={this.onSendSubmit} >
                    <div className="form-group">
                        <div className="col-sm-8 col-sm-offset-2">
                            <h4>Compose Message</h4>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" value={this.state.subject} onChange={this.onSubjectChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="body" className="col-sm-2 control-label">Body</label>
                        <div className="col-sm-8">
                            <textarea name="body" id="body" className="form-control" value={this.state.body} onChange={this.onBodyChange} ></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-8 col-sm-offset-2">
                            <input type="submit" value="Send" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Compose