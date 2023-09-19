import { useEffect, useState } from 'react';
import { getIds, getPokemonData } from '../utils/poke-api'
import { sample } from '../utils/utils'

function Game({selectedGens}) {
  const [pokemonIds, setPokemonIds] = useState(getIds(selectedGens));
  const [seenIds, setSeenIds] = useState([]);
  const [pokemonData, setPokemonData] = useState({});
  const [currentId, setCurrentId] = useState(randomId());

  function randomId() {
    //90% chance for a new Pokemon
    const isNew = Math.random < 0.9;
    if (seenIds.length === 0 || isNew) {
      return sample(pokemonIds);
    } else {
      return sample(seenIds);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getPokemonData(currentId);
      setPokemonData(data);
    }
    fetchData();
  }, [currentId])

  function handleClick(e) {
    const value = e.target.textContent;
    setCurrentId(randomId)
  }

  return (
    <div className='game'>
      <div className="pokemon">
        <img src={pokemonData.sprite} alt={pokemonData.name} />
        <p className="name">{pokemonData.name}</p>
      </div>
      <div className="buttons">
        <button onClick={handleClick}>Seen</button>
        <button onClick={handleClick}>New</button>
      </div>
    </div>
  )


}

export default Game;