import { useState } from 'react'

const Button = ({text, handler}) => {
 return <button onClick={handler}>{text}</button>
}

const Anecdote = ({anecdote, votes}) => {
  return (
  <>
    <p>{anecdote}</p>
    <p>vote count: {votes}</p>
  </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});

  function handleRandomAnecdote() {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  }

  function handleVote() {
    setVotes({...votes, [selected]: votes[selected] + 1 || 1});
  }

  function mostVotes() {
    const most = Object.values(votes).sort((a, b) => a + b)[0];
    console.log(most)
    return Object.keys(votes).find(key => votes[key] === most);
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <Button handler={handleVote} text='vote'/>
      <Button handler={handleRandomAnecdote}text='Next Anecdote'/>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>
    </div>
  )
}

export default App