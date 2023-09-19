import { useEffect, useState } from 'react';
import { getIds, getPokemon } from '../utils/poke-api'
import { sample } from '../utils/utils'

function Game({selectedGens}) {
  const [pokemonIds, setPokemonIds] = useState(getIds(selectedGens));
  const [seenIds, setSeenIds] = useState([]);
  const [id, setId] = useState(randomId());
  const [nextId, setNextId] = useState(randomId());
  const [pokemon, setPokemon] = useState({});
  const [nextPokemon, setNextPokemon] = useState({});
  console.log(pokemonIds, 'new');
  console.log(seenIds, 'seen')
  
  function randomId() {
    //90% chance for a new Pokemon
    const isNew = Math.random() < 0.9;
    if (seenIds.length === 0 || isNew) {
      return sample(pokemonIds);
    } else {
      return sample(seenIds);
    }
  }

  //initializes first pokemon on initial render
  useEffect(() => {
    async function fetchData() {
      const data = await getPokemon(id);
      setPokemon(data);
    }
    fetchData();
  }, [])

  //sets next pokemon and preloads its sprite when nextId changes
  useEffect(() => {
    async function fetchData() {
      const data = await getPokemon(nextId);
      //preload sprite
      new Image().src = data.sprite;
      setNextPokemon(data);
    }
    fetchData();
  }, [nextId])

  //handles button clicks
  function handleClick(e) {
    const choice = e.target.textContent;
    const correct = _isCorrect(choice)
    console.log(correct)
    if (!_isSeen()) {
      setSeenIds([...seenIds, id])
      setPokemonIds([...pokemonIds].filter(pokemonId => pokemonId !== id))
    }
    _next();

  }

  function _isSeen() {
    return (seenIds.includes(id));
  }

  function _isCorrect(choice) {
    if (choice === 'Seen') {
      return (seenIds.includes(id) ? true : false)
    } else {
      return (seenIds.includes(id) ? false : true)
    }
  }

  function _next() {
    setId(nextId);
    setPokemon(nextPokemon);
    setNextId(randomId());
  }

  return (
    <div className='game'>
      <div className="pokemon">
        <img src={pokemon.sprite} alt={pokemon.name} />
        <p className="name">{pokemon.name}</p>
      </div>
      <div className="buttons">
        <button onClick={handleClick}>Seen</button>
        <button onClick={handleClick}>New</button>
      </div>
    </div>
  )


}

export default Game;