import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import PokeDB from "./PokemonStarterTempDB.json" with { type: "json" };
const app = new Hono()

app.use(cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/pokemon', (c) => {
  return c.json(PokeDB); // Send the imported JSON data as the response
});

app.get('/api/pokemon/pokeName/Bulbasaur', (c) => {
  const bulbasaur= PokeDB.pokemon.find(p=> p.pokeName==='Bulbasaur');
  return c.json(bulbasaur); //Pull Data for Bulbasaur
});
app.get('/api/pokemon/pokeName/Squirtle', (c) => {
  const squirtle= PokeDB.pokemon.find(p=> p.pokeName==='Squirtle');
  return c.json(squirtle); //Pull Data for Squirtle
});
app.get('/api/pokemon/pokeName/Charmander', (c) => {
  const charmander= PokeDB.pokemon.find(p=> p.pokeName==='Charmander');
  return c.json(charmander); //Pull Data for charmander
});
app.get('/api/pokemon/pokeName/Chikorita', (c) => {
  const chikorita= PokeDB.pokemon.find(p=> p.pokeName==='Chikorita');
  return c.json(chikorita); //Pull Data for chikorita
});
app.get('/api/pokemon/pokeName/Totodile', (c) => {
  const totodile= PokeDB.pokemon.find(p=> p.pokeName==='Totodile');
  return c.json(totodile); //Pull Data for totodile
});
app.get('/api/pokemon/pokeName/Cyndaquil', (c) => {
  const cyndaquil= PokeDB.pokemon.find(p=> p.pokeName==='Cyndaquil');
  return c.json(cyndaquil); //Pull Data for cyndaquil
});
app.get('/api/pokemon/pokeName/Treecko', (c) => {
  const treecko= PokeDB.pokemon.find(p=> p.pokeName==='Treecko');
  return c.json(treecko); //Pull Data for treecko
});
app.get('/api/pokemon/pokeName/Torchic', (c) => {
  const torchic= PokeDB.pokemon.find(p=> p.pokeName==='Torchic');
  return c.json(torchic); //Pull Data for torchic
});
app.get('/api/pokemon/pokeName/Mudkip', (c) => {
  const mudkip= PokeDB.pokemon.find(p=> p.pokeName==='Mudkip');
  return c.json(mudkip); //Pull Data for mudkip
});



const port = process.env.PORT || 10000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
