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
  const pokemonData = PokeDB.pokemon.find((p) => p.pokeName?.toLowerCase() === name?.toLowerCase());
  return c.json(pokemonData); //Pull Data for mudkip
});

app.get("/api/pokemon/region/:region", (c) => {
  const region = c.req.param("region");
  const regionData = PokeDB.pokemon.filter((p) => p.region?.toLowerCase() === region?.toLowerCase());
  return c.json(regionData);
});

//use .include() since it checks to see if a specific type selected is inside of a substring with 2 typings
// app.get("/api/pokemon/pokeType/:type", (c) => {
//   const type = c.req.param("type")?.toLowerCase(); // Get the type from the URL

//   const typeData = PokeDB.pokemon.filter((p) => 
//     p.pokeType?.toLowerCase().includes(type)
//   );

//   return c.json(typeData);
// });
app.get("/api/pokemon/pokeType/:type", (c) => {
  const type = c.req.param("type");
  const typeData = PokeDB.pokemon.filter((p) => p.pokeType?.toLowerCase().includes(type?.toLowerCase()));
  return c.json(typeData);
});

app.post("/api/pokemon/filter", async(c)=>{
  const filter = await c.req.json()

  if (!filter.kanto && !filter.johto && !filter.hoenn && !filter.fire && !filter.water &&!filter.grass) return c.json(PokeDB.pokemon)


  const filteredPokemon = PokeDB.pokemon.filter((pokemon) => {
    if (filter.kanto && pokemon.region.toLowerCase() === "kanto") return true
    if(filter.johto && pokemon.region.toLowerCase() === 'johto') return true
    if(filter.hoenn && pokemon.region.toLowerCase() === 'hoenn') return true
    if (filter.fire && pokemon.pokeType.toLowerCase() === 'fire') return true
    if (filter.water && pokemon.pokeType.toLowerCase() === "water") return true
    if (filter.grass && pokemon.pokeType.toLowerCase() === "grass") return true
    return false
  })
  
  // console.log(body);
return c.json(filteredPokemon)

});
const port = process.env.PORT || 10000;
console.log(`Server is running on ${port} - ${process.env.PORT}`);

serve({
  fetch: app.fetch,
  port,
});
