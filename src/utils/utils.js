export function sample(array) {
  const index = Math.floor(array.length * Math.random());
  return array[index];
}

export function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}
