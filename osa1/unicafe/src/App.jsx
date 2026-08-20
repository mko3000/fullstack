import { useState } from 'react'

const Button = ({ onClick, text }) => {
    return <button onClick={onClick}>{text}</button>
}

const StatisticLine = ({ value, text }) => {
    return (
        <thead>
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
        </thead>
    )
}

const Statistics = ({ good, neutral, bad, total, average, positives }) => {
    if (total <= 0) {
        return (
            <div>
                No feedback given yet
            </div>
        )
    }
    return (
        <table>
            <StatisticLine value={good} text='good' />
            <StatisticLine value={neutral} text='neutral' />
            <StatisticLine value={bad} text='bad' />
            <StatisticLine value={total} text='all' />
            <StatisticLine value={average} text='average' />
            <StatisticLine value={positives} text='positive' />
        </table>
    )
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(0)

    const handleGoodVote = () => {
        setGood(good + 1)
        setTotal(total + 1)
    }
    const handleNeutralVote = () => {
        setNeutral(neutral + 1)
        setTotal(total + 1)
    }
    const handleBadVote = () => {
        setBad(bad + 1)
        setTotal(total + 1)
    }

    const countAvarage = (g, b, total) => (g - b) / total
    const countPositive = (g, total) => g / total * 100

    return (
        <div>
            <h1>Give feedback</h1>
            <div>
                <Button onClick={handleGoodVote} text='good' />
                <Button onClick={handleNeutralVote} text='neutral' />
                <Button onClick={handleBadVote} text='bad' />
            </div>
            <h1>Statistics</h1>
            <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={total}
                average={countAvarage(good, bad, total)}
                positives={`${countPositive(good, total)} %`}
            />
        </div>
    )
}

export default App