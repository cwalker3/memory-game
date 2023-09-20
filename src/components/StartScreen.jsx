import { useState} from 'react';
import Checkbox from './Checkbox'

const gens = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const rules = 'You will be shown a Pokemon from your selected generation(s). Click "New" if you have not seen this pokemon this round, and "Seen" otherwise.'
function StartScreen({startGame, onChange, checked}) {
  const genSelections = gens.map(gen =>
    <Checkbox 
      key={gen} 
      value={gen} 
      checked={checked.includes(gen)}
      onChange={onChange} 
    />
  )

  function handleClick(e) {
    if (checked.length === 0) {
      return;
    }
    startGame();
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
      
      <div className="startButtonContainer" >
        <button onClick={handleClick}>Start Game</button>
      </div>
    </div>
  )
}

export default StartScreen;