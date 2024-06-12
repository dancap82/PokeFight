/* import React, { useEffect, useState } from 'react';

const FightPreview = () => {
    const [pokemons, setPokemons] = useState([]);
    const [selectedPokemons, setSelectedPokemons] = useState({ left: null, right: null });

    useEffect(() => {
        // Fetch all pokemons from PokeAPI
        fetch('https://pokeapi.co/api/v2/pokemon?limit=151') // Limiting to the first 151 pokemons for simplicity
            .then(response => response.json())
            .then(data => {
                Promise.all(data.results.map(pokemon => fetch(pokemon.url).then(res => res.json())))
                    .then(pokemonDetails => {
                        const formattedPokemons = pokemonDetails.map((pokemon, index) => ({
                            id: index + 1, // Since PokeAPI starts from index 1
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
        alert('Fight!');
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const renderPokemonCard = (pokemon) => {
        if (!pokemon) return null; // Handle case where pokemon is not defined

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
        <div className="flex flex-col items-center space-y-8">
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
        </div>
    );
};

export default FightPreview; */
/* import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

const FightPreview = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemons, setSelectedPokemons] = useState({
    left: null,
    right: null,
  });
  const [winner, setWinner] = useState(null);
  const [fightLogs, setFightLogs] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((data) => {
        Promise.all(
          data.results.map((pokemon) =>
            fetch(pokemon.url).then((res) => res.json())
          )
        ).then((pokemonDetails) => {
          const formattedPokemons = pokemonDetails.map((pokemon, index) => ({
            id: index + 1,
            name: { english: pokemon.name },
            abilities: pokemon.abilities,
            stats: pokemon.stats,
            types: pokemon.types,
          }));
          setPokemons(formattedPokemons);
        });
      })
      .catch((error) =>
        console.error("There was an error fetching the pokemons:", error)
      );
  }, []);

  const calculateDamage = (attacker, defender) => {
    const attackStat = attacker.stats.find(
      (stat) => stat.stat.name === "attack"
    ).base_stat;
    const defenseStat = defender.stats.find(
      (stat) => stat.stat.name === "defense"
    ).base_stat;
    return Math.max(attackStat - defenseStat, 1); // Damage cannot be less than 1
  };

  const handleFight = () => {
    const leftPokemon = pokemons.find(
      (p) => p.id === parseInt(selectedPokemons.left)
    );
    const rightPokemon = pokemons.find(
      (p) => p.id === parseInt(selectedPokemons.right)
    );

    if (leftPokemon && rightPokemon) {
      let leftHp = leftPokemon.stats.find(
        (stat) => stat.stat.name === "hp"
      ).base_stat;
      let rightHp = rightPokemon.stats.find(
        (stat) => stat.stat.name === "hp"
      ).base_stat;
      let logs = [];

      while (leftHp > 0 && rightHp > 0) {
        let damage = calculateDamage(leftPokemon, rightPokemon);
        rightHp = Math.max(rightHp - damage, 0);
        logs.push(
          `${leftPokemon.name.english} attacks ${rightPokemon.name.english} for ${damage} damage! (${rightHp} HP left)`
        );

        if (rightHp === 0) {
          setWinner("left");
          break;
        }

        damage = calculateDamage(rightPokemon, leftPokemon);
        leftHp = Math.max(leftHp - damage, 0);
        logs.push(
          `${rightPokemon.name.english} attacks ${leftPokemon.name.english} for ${damage} damage! (${leftHp} HP left)`
        );

        if (leftHp === 0) {
          setWinner("right");
          break;
        }
      }

      if (leftHp === 0 && rightHp === 0) {
        setWinner("draw");
      }

      setFightLogs(logs);

      // Save fight result to backend
      fetch("http://localhost:5000/api/fight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pokemon1: leftPokemon.name.english,
          pokemon2: rightPokemon.name.english,
          winner:
            leftHp === 0 && rightHp === 0
              ? "draw"
              : leftHp > rightHp
              ? leftPokemon.name.english
              : rightPokemon.name.english,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log("Fight saved:", data))
        .catch((error) => console.error("Error saving fight:", error));
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderPokemonCard = (pokemon) => {
    if (!pokemon) return null;

    return (
      <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
        <img
          src={`https://img.pokemondb.net/artwork/${pokemon.name.english.toLowerCase()}.jpg`}
          alt={pokemon.name.english}
          className="w-32 h-32 mb-4"
        />
        <div className="text-center">
          <h3 className="text-xl font-bold">
            {capitalizeFirstLetter(pokemon.name.english)}
          </h3>
          <p>
            Abilities:{" "}
            {pokemon.abilities
              ? pokemon.abilities
                  .map((ability) => capitalizeFirstLetter(ability.ability.name))
                  .join(", ")
              : "Unknown"}
          </p>
          <p>Stats:</p>
          <ul className="list-disc list-inside text-left">
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name}>
                {capitalizeFirstLetter(stat.stat.name)}: {stat.base_stat}
              </li>
            ))}
          </ul>
          <p>
            Types:{" "}
            {pokemon.types
              .map((type) => capitalizeFirstLetter(type.type.name))
              .join(", ")}
          </p>
        </div>
      </div>
    );
  };

  const renderHealthBar = (pokemon, hp) => {
    const maxHp = pokemon.stats.find(
      (stat) => stat.stat.name === "hp"
    ).base_stat;
    const hpPercentage = (hp / maxHp) * 100;

    return (
      <div className="w-full bg-gray-300 rounded-full h-4">
        <div
          className={`h-4 rounded-full ${
            hpPercentage > 50
              ? "bg-green-500"
              : hpPercentage > 20
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
          style={{ width: `${hpPercentage}%` }}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="flex items-center space-x-4">
        <select
          onChange={(e) => {
            setSelectedPokemons({ ...selectedPokemons, left: e.target.value });
            setFightLogs([]); // Reset fight logs when selection changes
            setWinner(null); // Reset winner when selection changes
          }}
          value={selectedPokemons.left || ""}
          className="px-4 py-2 border rounded"
        >
          <option value="" disabled>
            Select Pokemon
          </option>
          {pokemons.map((pokemon) => (
            <option key={pokemon.id} value={pokemon.id}>
              {capitalizeFirstLetter(pokemon.name.english)}
            </option>
          ))}
        </select>
        <span className="text-2xl">VS</span>
        <select
          onChange={(e) => {
            setSelectedPokemons({ ...selectedPokemons, right: e.target.value });
            setFightLogs([]); // Reset fight logs when selection changes
            setWinner(null); // Reset winner when selection changes
          }}
          value={selectedPokemons.right || ""}
          className="px-4 py-2 border rounded"
        >
          <option value="" disabled>
            Select Pokemon
          </option>
          {pokemons.map((pokemon) => (
            <option key={pokemon.id} value={pokemon.id}>
              {capitalizeFirstLetter(pokemon.name.english)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex space-x-8 items-center">
        {selectedPokemons.left && (
          <div className="flex flex-col items-center">
            {renderPokemonCard(
              pokemons.find((p) => p.id === parseInt(selectedPokemons.left))
            )}
            {renderHealthBar(
              pokemons.find((p) => p.id === parseInt(selectedPokemons.left)),
              pokemons
                .find((p) => p.id === parseInt(selectedPokemons.left))
                .stats.find((stat) => stat.stat.name === "hp").base_stat
            )}
          </div>
        )}
        {selectedPokemons.right && (
          <div className="flex flex-col items-center">
            {renderPokemonCard(
              pokemons.find((p) => p.id === parseInt(selectedPokemons.right))
            )}
            {renderHealthBar(
              pokemons.find((p) => p.id === parseInt(selectedPokemons.right)),
              pokemons
                .find((p) => p.id === parseInt(selectedPokemons.right))
                .stats.find((stat) => stat.stat.name === "hp").base_stat
            )}
          </div>
        )}
      </div>
      <button
        onClick={handleFight}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Fight
      </button>
      {winner && (
        <div className={`mt-4 ${winner ? "fade-in" : ""}`}>
          {winner === "draw" ? (
            <p className="text-xl font-bold text-gray-700">It's a Draw!</p>
          ) : (
            <p className="text-xl font-bold text-gray-700">
              <span
                className={
                  winner === "left" ? "text-green-500" : "text-red-500"
                }
              >
                {capitalizeFirstLetter(
                  pokemons.find(
                    (p) => p.id === parseInt(selectedPokemons[winner])
                  ).name.english
                )}
              </span>{" "}
              Wins!
            </p>
          )}
        </div>
      )}
      <div className="mt-4 w-3/4 flex justify-center">
        <h3 className="text-lg font-bold">Fight Stats:</h3>
        <ul className="pl-5 list-none space-y-2">
          {fightLogs.map((log, index) => (
            <li key={index} className="text-sm">
              {log}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FightPreview;
 */

import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';

const FightPreview = () => {
    const [pokemons, setPokemons] = useState([]);
    const [selectedPokemons, setSelectedPokemons] = useState({ left: null, right: null });
    const [winner, setWinner] = useState(null);
    const [fightLogs, setFightLogs] = useState([]);

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

    const calculateDamage = (attacker, defender) => {
        const attackStat = attacker.stats.find(stat => stat.stat.name === 'attack').base_stat;
        const speedStat = attacker.stats.find(stat => stat.stat.name === 'speed').base_stat;
        const defenseStat = defender.stats.find(stat => stat.stat.name === 'defense').base_stat;
        return Math.max(attackStat + speedStat - defenseStat, 1); // Damage cannot be less than 1
    };

    const handleFight = () => {
        const leftPokemon = pokemons.find(p => p.id === parseInt(selectedPokemons.left));
        const rightPokemon = pokemons.find(p => p.id === parseInt(selectedPokemons.right));

        if (leftPokemon && rightPokemon) {
            let leftHp = leftPokemon.stats.find(stat => stat.stat.name === 'hp').base_stat;
            let rightHp = rightPokemon.stats.find(stat => stat.stat.name === 'hp').base_stat;
            let logs = [];

            while (leftHp > 0 && rightHp > 0) {
                let damage = calculateDamage(leftPokemon, rightPokemon);
                rightHp = Math.max(rightHp - damage, 0);
                logs.push(`${leftPokemon.name.english} attacks ${rightPokemon.name.english} for ${damage} damage! (${rightHp} HP left)`);

                if (rightHp === 0) {
                    setWinner('left');
                    break;
                }

                damage = calculateDamage(rightPokemon, leftPokemon);
                leftHp = Math.max(leftHp - damage, 0);
                logs.push(`${rightPokemon.name.english} attacks ${leftPokemon.name.english} for ${damage} damage! (${leftHp} HP left)`);

                if (leftHp === 0) {
                    setWinner('right');
                    break;
                }
            }

            if (leftHp === 0 && rightHp === 0) {
                setWinner('draw');
            }

            setFightLogs(logs);

            // Save fight result to backend
            fetch('http://localhost:5000/api/fight', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pokemon1: leftPokemon.name.english,
                    pokemon2: rightPokemon.name.english,
                    winner: leftHp === 0 && rightHp === 0 ? 'draw' : leftHp > rightHp ? leftPokemon.name.english : rightPokemon.name.english
                })
            }).then(response => response.json())
              .then(data => console.log("Fight saved:", data))
              .catch(error => console.error("Error saving fight:", error));
        }
    };

    const handleLeftPokemonSelect = (e) => {
        const selectedLeft = e.target.value;
        setSelectedPokemons((prevState) => ({
            ...prevState,
            left: selectedLeft,
            right: getRandomPokemon(selectedLeft)
        }));
        setFightLogs([]); // Reset fight logs when selection changes
        setWinner(null); // Reset winner when selection changes
    };

    const getRandomPokemon = (excludeId) => {
        const remainingPokemons = pokemons.filter(pokemon => pokemon.id !== parseInt(excludeId));
        const randomIndex = Math.floor(Math.random() * remainingPokemons.length);
        return remainingPokemons[randomIndex].id;
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const renderPokemonCard = (pokemon) => {
        if (!pokemon) return null;

        return (
            <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
                <img src={`https://img.pokemondb.net/artwork/${pokemon.name.english.toLowerCase()}.jpg`} alt={pokemon.name.english} className="w-32 h-32 mb-4" />
                <div className="text-center">
                    <h3 className="text-xl font-bold">{capitalizeFirstLetter(pokemon.name.english)}</h3>
                    <p>Abilities: {pokemon.abilities ? pokemon.abilities.map(ability => capitalizeFirstLetter(ability.ability.name)).join(', ') : 'Unknown'}</p>
                    <p>Stats:</p>
                    <ul className="list-disc list-inside text-left">
                        {pokemon.stats.map(stat => (
                            <li key={stat.stat.name}>{capitalizeFirstLetter(stat.stat.name)}: {stat.base_stat}</li>
                        ))}
                    </ul>
                    <p>Types: {pokemon.types.map(type => capitalizeFirstLetter(type.type.name)).join(', ')}</p>
                </div>
            </div>
        );
    };

    const renderHealthBar = (pokemon, hp) => {
        const maxHp = pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat;
        const hpPercentage = (hp / maxHp) * 100;

        return (
            <div className="w-full bg-gray-300 rounded-full h-4">
                <div
                    className={`h-4 rounded-full ${hpPercentage > 50 ? 'bg-green-500' : hpPercentage > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${hpPercentage}%` }}
                />
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center space-y-8 my-12">
            <div className="flex items-center space-x-4">
                <select
                    onChange={handleLeftPokemonSelect}
                    value={selectedPokemons.left || ''}
                    className="px-4 py-2 border rounded"
                >
                    <option value="" disabled>Select Pokemon</option>
                    {pokemons.map(pokemon => (
                        <option key={pokemon.id} value={pokemon.id}>{capitalizeFirstLetter(pokemon.name.english)}</option>
                    ))}
                </select>
                <span className="text-2xl">VS</span>
                <select
                    value={selectedPokemons.right || ''}
                    className="px-4 py-2 border rounded"
                    disabled
                >
                    <option value="">Randomly Selected</option>
                    {pokemons.map(pokemon => (
                        <option key={pokemon.id} value={pokemon.id}>{capitalizeFirstLetter(pokemon.name.english)}</option>
                    ))}
                </select>
            </div>
            <div className="flex space-x-8 items-center ">
                {selectedPokemons.left && (
                    <div className="flex flex-col items-center">
                        {renderPokemonCard(pokemons.find(p => p.id === parseInt(selectedPokemons.left)))}
                        {renderHealthBar(pokemons.find(p => p.id === parseInt(selectedPokemons.left)), pokemons.find(p => p.id === parseInt(selectedPokemons.left)).stats.find(stat => stat.stat.name === 'hp').base_stat)}
                    </div>
                )}
                {selectedPokemons.right && (
                    <div className="flex flex-col items-center">
                        {renderPokemonCard(pokemons.find(p => p.id === parseInt(selectedPokemons.right)))}
                        {renderHealthBar(pokemons.find(p => p.id === parseInt(selectedPokemons.right)), pokemons.find(p => p.id === parseInt(selectedPokemons.right)).stats.find(stat => stat.stat.name === 'hp').base_stat)}
                    </div>
                )}
            </div>
            <button onClick={handleFight} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Fight
            </button>
            {winner && (
                <div className={`mt-4 fade-in`}>
                    {winner === 'draw' ? (
                        <p className="text-xl font-bold text-gray-700">It's a Draw!</p>
                    ) : (
                        <p className={`text-xl font-bold ${winner === 'left' ? 'text-green-500' : 'text-red-500'}`}>
                             {winner === 'left' ? 'You win!' : 'Computer wins!'}
                        </p>
                    )}
                </div>
            )}
            <div className="mt-4 w-3/4 flex justify-center ">
        <h3 className="text-lg font-bold">Fight Stats:</h3>
        <ul className="pl-5 list-none space-y-2">
          {fightLogs.map((log, index) => (
            <li key={index} className="text-sm">
              {log}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FightPreview;