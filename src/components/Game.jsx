import { useEffect, useState } from 'react';
import { getIds, getPokemon } from '../utils/poke-api'
import { sample } from '../utils/utils';

function Game({selectedGens, takeDamage, addPoint}) {
  const [loaded, setloaded] = useState(false);
  const [pokemonIds, setPokemonIds] = useState(getIds(selectedGens));
  const [seenIds, setSeenIds] = useState([]);
  const [id, setId] = useState(randomId());
  const [nextId, setNextId] = useState(randomId());
  const [pokemon, setPokemon] = useState({});
  const [nextPokemon, setNextPokemon] = useState({});
  
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
      //preload image
      new Image().src = data.sprite
      setPokemon(data);
      setloaded(true);
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
    correct ? addPoint() : takeDamage();
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
      return (_isSeen())
    } else {
      return (!_isSeen())
    }
  }

  function _next() {
    setId(nextId);
    setPokemon(nextPokemon);
    setNextId(randomId());
  }
  let src = loaded ? pokemon.sprite : '/pokeball.png';
  
  return (
    <div className='game'>
      <div className="pokemon">
        <img src={src} alt={pokemon.name} />
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