import React, { useEffect, useState } from 'react';

const FightPreview = () => {
    const [pokemons, setPokemons] = useState([]);
    const [selectedPokemons, setSelectedPokemons] = useState({ left: null, right: null });
    const [battleLog, setBattleLog] = useState([]);
    const [leftHP, setLeftHP] = useState(0);
    const [rightHP, setRightHP] = useState(0);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
            .then(response => response.json())
            .then(data => {
                Promise.all(data.results.map(pokemon => fetch(pokemon.url).then(res => res.json())))
                    .then(pokemonDetails => {
                        const formattedPokemons = pokemonDetails.map((pokemon, index) => ({
                            id: index + 1,
                            name: { english: pokemon.name },
                            abilities: pokemon.abilities,
                            stats: pokemon.stats,
                            types: pokemon.types
                        }));
                        setPokemons(formattedPokemons);
                    });
            })
            .catch(error => console.error("There was an error fetching the pokemons:", error));
    }, []);

    const handleFight = () => {
        if (!selectedPokemons.left || !selectedPokemons.right) {
            alert('Please select both pokemons.');
            return;
        }

        const leftPokemon = pokemons.find(p => p.id === parseInt(selectedPokemons.left));
        const rightPokemon = pokemons.find(p => p.id === parseInt(selectedPokemons.right));

        setLeftHP(leftPokemon.stats.find(stat => stat.stat.name === 'hp').base_stat);
        setRightHP(rightPokemon.stats.find(stat => stat.stat.name === 'hp').base_stat);

        let log = [];
        let leftCurrentHP = leftPokemon.stats.find(stat => stat.stat.name === 'hp').base_stat;
        let rightCurrentHP = rightPokemon.stats.find(stat => stat.stat.name === 'hp').base_stat;

        while (leftCurrentHP > 0 && rightCurrentHP > 0) {
            const leftAttack = leftPokemon.stats.find(stat => stat.stat.name === 'attack').base_stat;
            const rightDefense = rightPokemon.stats.find(stat => stat.stat.name === 'defense').base_stat;
            const rightAttack = rightPokemon.stats.find(stat => stat.stat.name === 'attack').base_stat;
            const leftDefense = leftPokemon.stats.find(stat => stat.stat.name === 'defense').base_stat;

            let damageToRight = Math.max(1, leftAttack - rightDefense);
            rightCurrentHP -= damageToRight;
            log.push(`${capitalizeFirstLetter(leftPokemon.name.english)} attacks ${capitalizeFirstLetter(rightPokemon.name.english)} for ${damageToRight} damage! (${capitalizeFirstLetter(rightPokemon.name.english)} has ${rightCurrentHP}HP left!)`);
            if (rightCurrentHP <= 0) {
                log.push(<br key="emptyLine" />)
                log.push(`${capitalizeFirstLetter(rightPokemon.name.english)} fainted!`);
                break;
            }

            let damageToLeft = Math.max(1, rightAttack - leftDefense);
            leftCurrentHP -= damageToLeft;
            log.push(`${capitalizeFirstLetter(rightPokemon.name.english)} attacks ${capitalizeFirstLetter(leftPokemon.name.english)} for ${damageToLeft} damage! (${capitalizeFirstLetter(leftPokemon.name.english)} has ${leftCurrentHP}HP left!)`);
            if (leftCurrentHP <= 0) {
                log.push(<br key="emptyLine" />)
                log.push(`${capitalizeFirstLetter(leftPokemon.name.english)} fainted!`);
                break;
            }
        }

        setBattleLog(log);
        setLeftHP(leftCurrentHP);
        setRightHP(rightCurrentHP);
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const renderPokemonCard = (pokemon) => {
        if (!pokemon) return null;

        return (
            <div className="bg-white rounded-lg shadow-lg p-4 flex">
                <img src={`https://img.pokemondb.net/artwork/${pokemon.name.english.toLowerCase()}.jpg`} alt={pokemon.name.english} className="w-32 h-32" />
                <div className="ml-4">
                    <h3 className="text-xl font-bold">{capitalizeFirstLetter(pokemon.name.english)}</h3>
                    <p>Abilities: {pokemon.abilities ? pokemon.abilities.map(ability => capitalizeFirstLetter(ability.ability.name)).join(', ') : 'Unknown'}</p>
                    <p>Stats:</p>
                    <ul>
                        {pokemon.stats.map(stat => (
                            <li key={stat.stat.name}>{capitalizeFirstLetter(stat.stat.name)}: {stat.base_stat}</li>
                        ))}
                    </ul>
                    <p>Types: {pokemon.types.map(type => capitalizeFirstLetter(type.type.name)).join(', ')}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center space-y-8 mt-10">
            <div className="flex items-center space-x-4">
                <select
                    onChange={(e) => setSelectedPokemons({ ...selectedPokemons, left: e.target.value })}
                    value={selectedPokemons.left || ''}
                    className="px-4 py-2 border rounded"
                >
                    <option value="" disabled>Select Pokemon</option>
                    {pokemons.map(pokemon => (
                        <option key={pokemon.id} value={pokemon.id}>{pokemon.name.english.charAt(0).toUpperCase() + pokemon.name.english.slice(1)}</option>
                    ))}
                </select>
                <span className="text-2xl">VS</span>
                <select
                    onChange={(e) => setSelectedPokemons({ ...selectedPokemons, right: e.target.value })}
                    value={selectedPokemons.right || ''}
                    className="px-4 py-2 border rounded"
                >
                    <option value="" disabled>Select Pokemon</option>
                    {pokemons.map(pokemon => (
                        <option key={pokemon.id} value={pokemon.id}>{pokemon.name.english.charAt(0).toUpperCase() + pokemon.name.english.slice(1)}</option>
                    ))}
                </select>
            </div>
            <div className="flex space-x-8">
                {selectedPokemons.left && renderPokemonCard(pokemons.find(p => p.id === parseInt(selectedPokemons.left)))}
                {selectedPokemons.right && renderPokemonCard(pokemons.find(p => p.id === parseInt(selectedPokemons.right)))}
            </div>
            <button onClick={handleFight} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Fight
            </button>
            <div className="w-2/4 text-black text-center p-4 mt-10 mb-10">
                {battleLog.map((log, index) => (
                    <p key={index}>{log}</p>
                ))}
            </div>
        </div>
    );
};

export default FightPreview;