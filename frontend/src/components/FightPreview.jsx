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
                            types: pokemon.types.map(type => type.type.name) // Extract type names
                        }));
                        setPokemons(formattedPokemons);
                    });
            })
            .catch(error => console.error("There was an error fetching the pokemons:", error));
    }, []);

    const typeChart = {
        normal: { normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 0.5, ghost: 0, dragon: 1, dark: 1, steel: 0.5, fairy: 1 },
        fire: { normal: 1, fire: 0.5, water: 0.5, electric: 1, grass: 2, ice: 2, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 2, rock: 0.5, ghost: 1, dragon: 0.5, dark: 1, steel: 2, fairy: 1 },
        water: { normal: 1, fire: 2, water: 0.5, electric: 1, grass: 0.5, ice: 1, fighting: 1, poison: 1, ground: 2, flying: 1, psychic: 1, bug: 1, rock: 2, ghost: 1, dragon: 0.5, dark: 1, steel: 1, fairy: 1 },
        electric: { normal: 1, fire: 1, water: 2, electric: 0.5, grass: 0.5, ice: 1, fighting: 1, poison: 1, ground: 0, flying: 2, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 0.5, dark: 1, steel: 1, fairy: 1 },
        grass: { normal: 1, fire: 0.5, water: 2, electric: 1, grass: 0.5, ice: 1, fighting: 1, poison: 0.5, ground: 2, flying: 0.5, psychic: 1, bug: 0.5, rock: 2, ghost: 1, dragon: 0.5, dark: 1, steel: 0.5, fairy: 1 },
        ice: { normal: 1, fire: 0.5, water: 0.5, electric: 1, grass: 2, ice: 0.5, fighting: 1, poison: 1, ground: 2, flying: 2, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 2, dark: 1, steel: 0.5, fairy: 1 },
        fighting: { normal: 2, fire: 1, water: 1, electric: 1, grass: 1, ice: 2, fighting: 1, poison: 0.5, ground: 1, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dragon: 1, dark: 2, steel: 2, fairy: 0.5 },
        poison: { normal: 1, fire: 1, water: 1, electric: 1, grass: 2, ice: 1, fighting: 1, poison: 0.5, ground: 0.5, flying: 1, psychic: 1, bug: 1, rock: 0.5, ghost: 0.5, dragon: 1, dark: 1, steel: 0, fairy: 2 },
        ground: { normal: 1, fire: 2, water: 1, electric: 2, grass: 0.5, ice: 1, fighting: 1, poison: 2, ground: 1, flying: 0, psychic: 1, bug: 0.5, rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 2, fairy: 1 },
        flying: { normal: 1, fire: 1, water: 1, electric: 0.5, grass: 2, ice: 1, fighting: 2, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 2, rock: 0.5, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 1 },
        psychic: { normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 2, poison: 2, ground: 1, flying: 1, psychic: 0.5, bug: 1, rock: 1, ghost: 1, dragon: 1, dark: 0, steel: 0.5, fairy: 1 },
        bug: { normal: 1, fire: 0.5, water: 1, electric: 1, grass: 2, ice: 1, fighting: 0.5, poison: 0.5, ground: 1, flying: 0.5, psychic: 2, bug: 1, rock: 1, ghost: 0.5, dragon: 1, dark: 2, steel: 0.5, fairy: 0.5 },
        rock: { normal: 1, fire: 2, water: 1, electric: 1, grass: 1, ice: 2, fighting: 0.5, poison: 1, ground: 0.5, flying: 2, psychic: 1, bug: 2, rock: 1, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 1 },
        ghost: { normal: 0, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 2, bug: 1, rock: 1, ghost: 2, dragon: 1, dark: 0.5, steel: 1, fairy: 1 },
        dragon: { normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 2, dark: 1, steel: 0.5, fairy: 0 },
        dark: { normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 0.5, poison: 1, ground: 1, flying: 1, psychic: 2, bug: 1, rock: 1, ghost: 2, dragon: 1, dark: 0.5, steel: 1, fairy: 0.5 },
        steel: { normal: 1, fire: 0.5, water: 0.5, electric: 0.5, grass: 1, ice: 2, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 2 },
        fairy: { normal: 1, fire: 0.5, water: 1, electric: 1, grass: 1, ice: 1, fighting: 2, poison: 0.5, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 2, dark: 2, steel: 0.5, fairy: 1 }
    };

    const calculateDamage = (attack, defense, attackerTypes, defenderTypes) => {
        let effectivenessMultiplier = 1;
        attackerTypes.forEach(attackerType => {
            defenderTypes.forEach(defenderType => {
                if (typeChart[attackerType] && typeChart[attackerType][defenderType] !== undefined) {
                    effectivenessMultiplier *= typeChart[attackerType][defenderType];
                }
            });
        });
        return Math.max(1, Math.floor(attack * effectivenessMultiplier) - defense);
    };

    const getTypeMultiplier = (attackingTypes, defendingTypes) => {
        let multiplier = 1;
        attackingTypes.forEach(attackingType => {
            defendingTypes.forEach(defendingType => {
                multiplier *= typeChart[attackingType][defendingType];
            });
        });
        return multiplier;
    };

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
    
            const effectivenessMultiplierLeft = getTypeMultiplier(leftPokemon.types, rightPokemon.types);
            const effectivenessMultiplierRight = getTypeMultiplier(rightPokemon.types, leftPokemon.types);
    
            let damageToRight = calculateDamage(leftAttack, rightDefense, leftPokemon.types, rightPokemon.types);
            rightCurrentHP -= damageToRight;
            log.push(<><span style={{ color: 'green' }}>{capitalizeFirstLetter(leftPokemon.name.english)}</span> attacks <span style={{ color: 'red' }}>{capitalizeFirstLetter(rightPokemon.name.english)}</span> for <strong>{damageToRight}</strong> damage! (<span style={{ color: 'red' }}>{capitalizeFirstLetter(rightPokemon.name.english)}</span> has <strong>{rightCurrentHP}HP</strong> left!) <u><strong>(x{effectivenessMultiplierLeft})</strong></u></>);
            if (rightCurrentHP <= 0) {
                log.push(<br key="emptyLine1" />)
                log.push(<><strong>{capitalizeFirstLetter(rightPokemon.name.english)}</strong> fainted!</>);
                break;
            }
    
            let damageToLeft = calculateDamage(rightAttack, leftDefense, rightPokemon.types, leftPokemon.types);
            leftCurrentHP -= damageToLeft;
            log.push(<><span style={{ color: 'red' }}>{capitalizeFirstLetter(rightPokemon.name.english)}</span> attacks <span style={{ color: 'green' }}>{capitalizeFirstLetter(leftPokemon.name.english)}</span> for <strong>{damageToLeft}</strong> damage! (<span style={{ color: 'green' }}>{capitalizeFirstLetter(leftPokemon.name.english)}</span> has <strong>{leftCurrentHP}HP</strong> left!) <u><strong>(x{effectivenessMultiplierRight})</strong></u></>);
            if (leftCurrentHP <= 0) {
                log.push(<br key="emptyLine2" />)
                log.push(<><strong>{capitalizeFirstLetter(leftPokemon.name.english)}</strong> fainted!</>);
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
                    <p>Types: {pokemon.types.map(type => capitalizeFirstLetter(type)).join(', ')}</p>
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