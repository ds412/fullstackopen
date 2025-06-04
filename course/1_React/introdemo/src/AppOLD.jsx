// imports the useState function
import { useState } from 'react'

// component responsible for displaying value of counter
// uses only props.counter, extracted using destructuring
const Display = ({ counter }) => <div>{counter}</div>

// component that receives event handler for onClick() and text to display
// uses props.onClick and props.text, extracted using destructuring
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
    // Adds state to the component and renders it intialized with value 0
    // - the counter variable keeps track of the state variable
    // - the setCounter variable is assigned a function used to modify the state
    const [counter, setCounter] = useState(0)
    console.log('rendering with counter value', counter)

    // event handlers for onClick() functions:
    // increments the counter and re-executes App(), re-rendering the page
    const increaseByOne = () => {
        console.log('increasing, value before', counter)
        setCounter(counter + 1)
    }
    // decrements the counter and re-executes App(), re-rendering the page
    const decreaseByOne = () => {
        console.log('decreasing, value before', counter)
        setCounter(counter - 1)
    }
    // resets the counter to 0 and re-executes App(), re-rendering the page
    const setToZero = () => {
        console.log('resetting to zero, value before', counter)
        setCounter(0)
    }

    return (
        <div>
            <Display counter={counter} />
            <Button
                onClick={increaseByOne}
                text='plus'
            />
            <Button
                onClick={setToZero}
                text='zero'
            />
            <Button
                onClick={decreaseByOne}
                text='minus'
            />
        </div>
    )
}



export default App
