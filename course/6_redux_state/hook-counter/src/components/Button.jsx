import { useCounterDispatch } from '../CounterContext'

const Button = ({ type, label }) => {
    const dispatch = useCounterDispatch() // get access to counter dispatch function
    return (
        <button onClick={() => dispatch({ type })}>
            {label}
        </button>
    )
}

export default Button
