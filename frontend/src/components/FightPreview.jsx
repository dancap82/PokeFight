import "../App.css";
import React, { useEffect, useState } from "react";

const FightPreview = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemons, setSelectedPokemons] = useState({
    left: null,
    right: null,
  });
  const [winner, setWinner] = useState(null);
  const [fightLogs, setFightLogs] = useState([]);
  const [battleHistory, setBattleHistory] = useState([]);

  const BASE_URL = 'https://pokefight-u2oc.onrender.com/'

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

  useEffect(() => {
    fetch(`${BASE_URL}/api/fight-logs`)
      .then((response) => response.json())
      .then((data) => setBattleHistory(data))
      .catch((error) =>
        console.error("There was an error fetching the fight logs:", error)
      );
  }, []);

  const calculateDamage = (attacker, defender) => {
    const attackStat = attacker.stats.find(
      (stat) => stat.stat.name === "attack"
    ).base_stat;
    const speedStat = attacker.stats.find(
      (stat) => stat.stat.name === "speed"
    ).base_stat;
    const defenseStat = defender.stats.find(
      (stat) => stat.stat.name === "defense"
    ).base_stat;
    return Math.max(attackStat + speedStat - defenseStat, 1); 
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
          `${leftPokemon.name.english} attacks ${rightPokemon.name.english} for ${damage} damage! (${rightPokemon.name.english} ${rightHp} HP left)`
        );

        if (rightHp === 0) {
          setWinner(leftPokemon.name.english);
          break;
        }

        damage = calculateDamage(rightPokemon, leftPokemon);
        leftHp = Math.max(leftHp - damage, 0);
        logs.push(
          `${rightPokemon.name.english} attacks ${leftPokemon.name.english} for ${damage} damage! (${leftPokemon.name.english} ${leftHp} HP left)`
        );

        if (leftHp === 0) {
          setWinner(rightPokemon.name.english);
          break;
        }
      }

      if (leftHp === 0 && rightHp === 0) {
        setWinner("draw");
      }

      setFightLogs(logs);

      // Save fight result to backend
      fetch(`${BASE_URL}/api/fight`, {
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
          battleLog: logs,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log("Fight saved:", data))
        .catch((error) => console.error("Error saving fight:", error));
    }
  };

  const handleLeftPokemonSelect = (e) => {
    const selectedLeft = e.target.value;
    setSelectedPokemons((prevState) => ({
      ...prevState,
      left: selectedLeft,
      right: getRandomPokemon(selectedLeft),
    }));
    setFightLogs([]);
    setWinner(null); 
  };

  const getRandomPokemon = (excludeId) => {
    const remainingPokemons = pokemons.filter(
      (pokemon) => pokemon.id !== parseInt(excludeId)
    );
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
    <div className="fixedheight flex flex-col items-center space-y-8 my-12">
      <div className="flex items-center space-x-4">
        <select
          onChange={handleLeftPokemonSelect}
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
          value={selectedPokemons.right || ""}
          className="px-4 py-2 border rounded"
          disabled
        >
          <option value="">Randomly Selected</option>
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
        <div className={`mt-4 fade-in`}>
          {winner === "draw" ? (
            <p className="text-xl font-bold text-gray-700">It's a Draw!</p>
          ) : (
            <p
              className={`text-xl font-bold ${
                winner === "left" ? "text-green-500" : "text-red-500"
              }`}
            >
              {winner === "left" ? "You win!" : "Computer wins!"}
            </p>
          )}
          <div className="mt-4">
            <h2 className="text-lg font-bold mb-2">Fight Logs:</h2>
            <ul className="list-disc list-inside">
              {fightLogs.map((log, index) => (
                <li key={index} className="mb-1">
                  {log}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FightPreview;
