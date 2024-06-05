const pokedex = require ("../pokedex.json");


//git all pokemons
exports.getAllPokemons = async (req, res) => {
    res.send(pokedex);
};

// get pokemon by id
exports.getPokemonById = async (req, res) => {
    const id = parseInt(req.params.id, 10)
;    const pokemon = pokedex.find(p => p.id === id);
    if (!pokemon) {
        res.status(404).send("Pokemon not found");
    } else {
        res.send(pokemon);
    }
    
};

FIXME: // get pokemon info / name, type, base ??????

exports.getPokemonInfo = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const info = req.params.info;
    const pokemon = pokedex.find(p => p.id === id);
    if (pokemon && pokemon[info]) {
      res.json(pokemon[info]);
    } else {
      res.status(404).send('Pokemon or information not found');
    }
  };
    

