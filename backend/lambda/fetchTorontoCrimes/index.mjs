import { fetchCrimeData } from './fetchCrimes.mjs'
import { insertCrimeData } from './db.mjs'

export const handler = async () => {
  
  const crimes = await fetchCrimeData(30);
  await insertCrimeData(crimes);
};

await handler();