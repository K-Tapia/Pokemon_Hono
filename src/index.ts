import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import PokeDB from "./PokemonStarterTempDB.json";
const app = new Hono();

app.use(cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});
app.get("/api/pokemon", (c) => {
  return c.json(PokeDB); // Send the imported JSON data as the response
});

app.get("/api/pokemon/pokeName/:name", (c) => {
  const name = c.req.param("name");
  const pokemonData = PokeDB.pokemon.find((p) => p.pokeName === name);
  return c.json(pokemonData); //Pull Data for mudkip
});

app.get("/api/pokemon/region/:region", (c) => {
  const region = c.req.param("region");
  const regionData = PokeDB.pokemon.filter((p) => p.region?.toLowerCase() === region?.toLowerCase());
  return c.json(regionData);
});

const port = process.env.PORT || 10000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
