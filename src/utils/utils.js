export function sample(array) {
  const index = Math.floor(array.length * Math.random());
  return array[index];
}
