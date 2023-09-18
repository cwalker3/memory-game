import { useState} from 'react';
import Checkbox from './Checkbox'

const gens = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const rules = 'When the game starts, a Pokémon from your checked region(s) will be shown. If it is your first time seeing this Pokémon, click the "new" button. If you have already seen it, click the "seen" button. A new Pokémon will then be shown. If you click the incorrect button, you will lose 1 HP. The game ends when you lose 3 HP.'

function StartScreen() {
  const [checked, setChecked] = useState([])
  const genRadioButtons = gens.map(gen => {
    <Checkbox 
      key={gen} 
      value={gen} 
      checked={gen} 
      onChange={handleCheckboxClick} 
    />
  })

  function handleCheckboxClick(e) {
    console.log('e')
    const value = parseInt(e.target.name);
    let checkedCopy = checked;
    if (e.target.checked) {
      checkedCopy.push(value);
      setChecked(checkedCopy)
    } else {
      setChecked(checkedCopy.filter(gen => gen != value))
    }
  }

  return (
    <div className="startScreen">
      <div className="rules">
        {rules}
      </div>
      <div className="genSelect">
        {genRadioButtons}
      </div>
    </div>
  )
}

export default StartScreen;