import { fetchCallData } from './fetchCalls.mjs'
import { insertCallData } from './db.mjs'

export const handler = async () => {
  
  const calls = await fetchCallData();
  await insertCallData(calls);
};

await handler();