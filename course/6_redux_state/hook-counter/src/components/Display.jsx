import { useCounterValue } from '../CounterContext'

const Display = () => {
    const counter = useCounterValue() // get access to counter value
    return (<div> {counter} </div>)
}

export default Display
