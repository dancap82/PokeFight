const express = require ("express");
const router = express.Router();
const pokemonControllers = require ("../controllers/pokemonControllers");


router.get("/", pokemonControllers.getAllPokemons);
router.get("/:id", pokemonControllers.getPokemonById);
router.get("/:id/*", pokemonControllers.getPokemonInfo);



module.exports = router;