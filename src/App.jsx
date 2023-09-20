import { useState, useEffect } from 'react'
import StartScreen from './components/StartScreen';
import Game from './components/Game'
import HpBar from './components/HpBar'
import Score from './components/Score'

function App() {
  const [selected, setSelected] = useState([]);
  const [started, setStarted] = useState(false);
  const [health, setHealth] = useState(3);
  const [score, setScore] = useState(0);
  const [high, setHigh] = useState(localStorage.getItem('high'));
  const [message, setMessage] = useState('');
  
  function startGame() {
   setStarted(true);
   setMessage('');
   setScore(0);
   setHealth(3);
  }

  function endGame() {
    setStarted(false);
    setMessage('Game Over')
  }

  function handleChange(e) {
    const value = parseInt(e.target.name);
    if (selected.includes(value)) {
      setSelected([...selected].filter(gen => gen != value))
    } else {
      setSelected([...selected, value])
    }
  }

  function takeDamage() {
    health == 1 ? endGame() : setHealth(health - 1);
  }

  function addPoint() {
    const newScore = score + 1
    setScore(newScore);
    newScore > high ? updateHigh(newScore) : undefined;
  }

  function updateHigh(newScore) {
    localStorage.setItem('high', newScore);
    setHigh(newScore);
  }

  let content;

  if (started) {
    content = 
      <>
        <HpBar health={health} />
        <Game selectedGens={selected} 
              takeDamage={takeDamage}
              addPoint={addPoint}
      />
    </>
  } else {
    content = 
      <>
        <p className="message">{message}</p>
        <StartScreen startGame={startGame} 
                     onChange={handleChange}
                     checked={selected}
        />
      </>
  }

  return (
    <>
      <Score score={score} high={high}/>
      {content}
    </>

  )
}

export default App;
