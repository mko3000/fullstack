import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Anecdote = ({ anecdote }) => {
    return (
        <div>
            <div>{anecdote.text}</div>
            <div>has {anecdote.votes} votes</div>
        </div>
    )
}

const initialAnecdotes = [
    { text: 'If it hurts, do it more often.', votes: 0 },
    { text: 'Adding manpower to a late software project makes it later!', votes: 0 },
    { text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0 },
    { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0 },
    { text: 'Premature optimization is the root of all evil.', votes: 0 },
    { text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0 },
    { text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.', votes: 0 },
    { text: 'The only way to go fast, is to go well.', votes: 0 }
]

const App = () => {
    const [anecdotes, setAnecdotes] = useState(initialAnecdotes)
    const [selected, setSelected] = useState(0)
    const [maxVotes, setMaxVotes] = useState(0)
    const [bestAnecdote, setBestAnecdote] = useState(0)

    const handleNewAnecdoteClick = () => {
        const randomNumber = Math.floor(Math.random() * anecdotes.length)
        setSelected(randomNumber)
    }

    const handleVoteClick = () => {
        const anecdoteToVote = anecdotes[selected]
        const votedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }

        if (votedAnecdote.votes >= maxVotes) {
            setMaxVotes(votedAnecdote.votes)
            setBestAnecdote(selected)
        }

        const updatedAnecdotes = anecdotes.map((anecdote, i) => {
            if (i === selected) return votedAnecdote
            else return anecdote
        }) //ts. i === selected ? votedAnecdote : anecdote        

        setAnecdotes(updatedAnecdotes)
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <Anecdote anecdote={anecdotes[selected]} />
            <Button onClick={handleVoteClick} text="vote" />
            <Button onClick={handleNewAnecdoteClick} text="new anecdote" />
            <h1>Most voted anecdote</h1>
            <Anecdote anecdote={anecdotes[bestAnecdote]} />
        </div>
    )
}

export default App