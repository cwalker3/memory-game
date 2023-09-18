import { useState, useEffect } from 'react'
import StartScreen from './components/StartScreen';
import Game from './components/Game'

function App() {
  const [selected, setSelected] = useState([]);
  const [started, setStarted] = useState(false);
  
  function startGame() {
   setStarted(true);
  }

  function endGame() {
    setStarted(false);
  }

  function handleChange(e) {
    const value = parseInt(e.target.name);
    let selectedCopy = [...selected];
    if (selected.includes(value)) {
      selectedCopy = selectedCopy.filter(gen => gen != value)
    } else {
      selectedCopy.push(value);
    }
    setSelected(selectedCopy)
  }

  const content = started ? (
    <Game
      selectedGens={selected}
    />
  ) : (
    <>
      <StartScreen 
        startGame={startGame}
        onChange={handleChange}
        checked={selected}
      />
    </>
  )

  return (
    <>
      {content}
    </>
  )
}

export default App;
