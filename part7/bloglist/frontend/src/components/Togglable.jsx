import { useState, forwardRef, useImperativeHandle } from 'react'
import { Box, Button } from '@mui/material'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }
    useImperativeHandle(refs, () => {
        return { toggleVisibility }
    })

    return (
        <Box sx={{ mb: 2 }}>
            <Box sx={{ display: visible ? 'none' : 'block' }}>
                <Button onClick={toggleVisibility} variant="contained">
                    {props.buttonLabel}
                </Button>
            </Box>
            <Box sx={{ display: visible ? 'block' : 'none' }}>
                {props.children}
                <Button onClick={toggleVisibility} variant="outlined" sx={{ mt: 1 }}>
                    cancel
                </Button>
            </Box>
        </Box>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
