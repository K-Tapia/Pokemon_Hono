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


const port = process.env.PORT || 10000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
