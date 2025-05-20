import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
    const total = good + bad + neutral

    const calcAverage = () => {
        return (good - bad) / total
    }

    const calcPositive = () => {
        return (100 * (good / total)) + ' %'
    }

    if (total === 0) {
        return (
            <p>No feedback given</p>
        )
    }
    return (
        <table>
            <tbody>
                <StatisticsLine text='good' value={good} />
                <StatisticsLine text='neutral' value={neutral} />
                <StatisticsLine text='bad' value={bad} />
                <StatisticsLine text='all' value={total} />
                <StatisticsLine text='average' value={calcAverage()} />
                <StatisticsLine text='positive' value={calcPositive()} />
            </tbody>
        </table>
    )
}

const StatisticsLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Button = ({ onClick, text }) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => { setGood(good + 1) }
    const handleNeutralClick = () => { setNeutral(neutral + 1) }
    const handleBadClick = () => { setBad(bad + 1) }

    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={handleGoodClick} text='good' />
            <Button onClick={handleNeutralClick} text='neutral' />
            <Button onClick={handleBadClick} text='bad' />
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App
