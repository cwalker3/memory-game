import { useState} from 'react';
import Checkbox from './Checkbox'

const gens = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const rules = 'You will be shown a Pokemon from your selected generation(s). Click "New" if you have not seen this pokemon this round, and "Seen" otherwise.'
function StartScreen({startGame, updateSelected, checked}) {
  const genSelections = gens.map(gen =>
    <Checkbox 
      key={gen} 
      value={gen} 
      checked={checked.includes(gen)}
      onChange={handleChange} 
    />
  )

  function handleClick(e) {
    if (checked.length === 0) {
      return;
    }
    startGame();
  }


  function handleChange(e) {
    const value = parseInt(e.target.name);
    if (checked.includes(value)) {
      updateSelected([...checked].filter(gen => gen != value))
    } else {
      updateSelected([...checked, value])
    }
  }

  function toggleAll() {
    if (checked.length == 9) {
      updateSelected([])
    } else {
      updateSelected([1,2,3,4,5,6,7,8,9])
    }
  }


  return (
    <div className="startScreen">
      <div className="rules">
        {rules}
      </div>
      <div className="generations">
        <h2>Generations</h2>
        <div className="genSelect">
          {genSelections}
        </div>
      </div>
      
      <div className="buttonsContainer" >
        <button onClick={toggleAll}>
          {checked.length == 9 ? 'UnSelect All' : 'Select All'}
        </button>
        <button className='start' onClick={handleClick}>Start Game</button>
      </div>
    </div>
  )
}

export default StartScreen;