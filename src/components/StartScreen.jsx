import { useState} from 'react';
import Checkbox from './Checkbox'

const gens = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const rules = 'When the game starts, a Pokémon from your checked region(s) will be shown. If it is your first time seeing this Pokémon, click the "new" button. If you have already seen it, click the "seen" button. A new Pokémon will then be shown. If you click the incorrect button, you will lose 1 HP. The game ends when you lose 3 HP.'

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
      <div className="genSelect">
        {genSelections}
      </div>
      <div className="startButtonContainer" >
        <button onClick={handleClick}>Start Game</button>
      </div>
    </div>
  )
}

export default StartScreen;