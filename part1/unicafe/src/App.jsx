import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        setGood(good + 1)
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
    }

    const handleBadClick = () => {
        setBad(bad + 1)
    }

    const calcTotal = () => {
        return good + neutral + bad
    }

    const calcAverage = () => {
        let total = calcTotal()
        if (total == 0) {
            return 0
        }
        return (good - bad) / total
    }

    const calcPositive = () => {
        let total = calcTotal()
        if (total == 0) {
            return 0
        }
        return 100 * (good / total)
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={handleGoodClick} text='good' />
            <Button onClick={handleNeutralClick} text='neutral' />
            <Button onClick={handleBadClick} text='bad' />
            <h1>statistics</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {calcTotal()}</p>
            <p>average {calcAverage()}</p>
            <p>positive {calcPositive()} %</p>
        </div>
    )
}

export default App
