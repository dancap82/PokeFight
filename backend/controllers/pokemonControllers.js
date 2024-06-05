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
    const infoPath = req.params[0];

    const pokemon = pokedex.find(p => p.id === id);

    if (!pokemon) {
        return res.status(404).send("Pokemon not found");
    }

    const infoParts = infoPath.split('/');
    let infoValue = pokemon;

    for (const part of infoParts) {
        if (infoValue[part] !== undefined) {
            infoValue = infoValue[part];
        } else {
            return res.status(404).send("Info not found");
        }
    }

    return res.send({ [infoParts[infoParts.length - 1]]: infoValue });
};

