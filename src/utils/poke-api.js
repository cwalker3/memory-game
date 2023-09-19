import { capitalize } from './utils';

const baseURL = 'https://pokeapi.co/api/v2/';
const genIds = {
  //these don't include forms, megas, variants etc.
  1: { start: 1, end: 151 },
  2: { start: 152, end: 251 },
  3: { start: 252, end: 386 },
  4: { start: 387, end: 493 },
  5: { start: 494, end: 649 },
  6: { start: 650, end: 721 },
  7: { start: 722, end: 809 },
  8: { start: 810, end: 905 },
  9: { start: 905, end: 1010 },
};

export function getIds(gens) {
  let ids = [];
  gens.forEach((gen) => {
    const startId = genIds[gen].start;
    const endId = genIds[gen].end;
    for (let id = startId; id <= endId; id++) {
      ids.push(id);
    }
  });
  return ids;
}

export async function getPokemon(id) {
  const response = await fetch(baseURL + 'pokemon/' + id);
  const data = await response.json();
  return {
    name: capitalize(data.name),
    sprite: data.sprites.front_default,
  };
}
