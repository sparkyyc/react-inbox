import React from 'react'

const Label = (props) => {
    return props.message.labels.map(label => {
        return <span className="label label-warning">{label}</span>
    })
}

export default Label