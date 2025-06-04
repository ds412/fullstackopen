// imports the useState function
import { useState } from 'react'

// Component that keeps track of click history, using conditional rendering
const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>
                the app is used by pressing the buttons
            </div>
        )
    }
    return (
        <div>
            button press history: {props.allClicks.join(' ')}
        </div>
    )
}

// Component abstracting out the button functionality
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
    // useState() adds states to the component and renders them (here both intialized with value 0)
    // - the left/right variables keeps track of the state variables
    // - the setLeft/setRight variables are assigned functions used to re-render the App with updated state variables
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])    //keep track of all clicks in an empty array
    const [total, setTotal] = useState(0)

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))     //use concat to create new object, since React states should not be mutated directly
        const updatedLeft = left + 1      // + 1 because state updates are asynchronous
        setLeft(updatedLeft)
        setTotal(updatedLeft + right)
    }

    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        const updatedRight = right + 1;
        setRight(updatedRight);
        setTotal(left + updatedRight);
    }

    // debugger                  // enables the JS debugger

    return (
        <div>
            {left}
            <Button onClick={handleLeftClick} text='left' />
            <Button onClick={handleRightClick} text='right' />
            {right}
            <History allClicks={allClicks} />
            <p>total {total}</p>
        </div>
    )
}


export default App
