import { useState } from 'react'

// custom hook, uses useState hook internally to create and manage its state
const useCounter = () => {
    const [value, setValue] = useState(0)

    const increase = () => {
        setValue(value + 1)
    }

    const decrease = () => {
        setValue(value - 1)
    }

    const zero = () => {
        setValue(0)
    }

    // returns object containing value of counter and functions to manipulate value
    return { value, increase, decrease, zero }
}


const App = () => {
    // use the counter custom hook twice, each with their own state
    const left = useCounter()
    const right = useCounter()

    return (
        <div>
            {left.value}
            <button onClick={left.increase}>
                left
            </button>
            <button onClick={right.increase}>
                right
            </button>
            {right.value}
        </div>
    )
}
export default App
