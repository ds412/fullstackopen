import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from "prop-types"

// wrap component in forwardRef function, allowing it to access ref assigned to it
const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    // method to change visibility
    const toggleVisibility = () => { setVisible(!visible) }

    // makes toggleVisibility accessible outside the component
    useImperativeHandle(refs, () => { return { toggleVisibility } })

    // visibility is toggled by changing CSS display property
    const hide = { display: visible ? 'none' : '' }
    const show = { display: visible ? '' : 'none' }

    return (
        <div>
            <div style={hide}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={show} className="togglableContent">
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

// deprecated?  (doesn't seem to do anything)
Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable
