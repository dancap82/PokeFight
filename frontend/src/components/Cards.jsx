import React, { useEffect, useState } from "react";
import axios from "axios";
import pokemon from "/src/assets/pokemon-23.svg";

const Cards = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((response) => {
        const promises = response.data.results.map((pokemon) =>
          axios.get(pokemon.url)
        );

        Promise.all(promises).then((results) => {
          setPokemonList(results.map((res) => res.data));
        });
      })
      .catch((error) => {
        console.error("Error fetching the Pokémon data:", error);
      });
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((currentSlide) => Math.max(0, currentSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((currentSlide) =>
      Math.min(Math.ceil(pokemonList.length / 10) - 1, currentSlide + 1)
    );
  };

  const startIndex = currentSlide * 10;
  const endIndex = Math.min(startIndex + 10, pokemonList.length);

  if (!pokemonList.length) return <div>Loading...</div>;

  return (
    <div className="min-h-60 container mx-auto overflow-hidden pt-4 px-4">
      <div className="flex justify-center items-center">
        <img src={pokemon} className="w-48 justify-center " alt="" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {pokemonList.slice(startIndex, endIndex).map((pokemon) => (
          <div
            key={pokemon.id}
            className="rounded-xl drop-shadow-xl bg-slate-100"
          >
            <div className="mb-2 flex flex-col">
              <div className="rounded-t-xl shadow-lg bg-yellow-400">
                <h5 className="text-xl py-2 text-blue-700 font-bold font-sans-serif">
                  {pokemon.name.toUpperCase()}
                </h5>
              </div>
              <div className="flex gap-12 justify-center pt-2">
                <div className="border-4 border-red-600 rounded-full h-10 w-10 flex items-center justify-center">
                  <h6>
                    {
                      pokemon.stats.find((stat) => stat.stat.name === "attack")
                        .base_stat
                    }
                  </h6>
                </div>
                <div className="border-4 border-green-400 rounded-full h-10 w-10 flex items-center justify-center">
                  <h6>
                    {
                      pokemon.stats.find((stat) => stat.stat.name === "defense")
                        .base_stat
                    }
                  </h6>
                </div>
              </div>
              <div className="flex justify-center gap-8 font-sans-serif">
                <div>
                  <h6>Attack</h6>
                </div>
                <div className="flex items-center justify-center">
                  <h6>Defense</h6>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden flex justify-center">
                <img
                  className="w-32 h-32 md:w-40 md:h-40"
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                />
              </div>
              <div>
                <div className="flex justify-center gap-4">
                  {pokemon.types.map((typeInfo) => (
                    <div key={typeInfo.type.name}>
                      <button
                        className="bg-blue-500 text-white px-4 rounded-md"
                        disabled
                      >
                        {typeInfo.type.name.charAt(0).toUpperCase() +
                          typeInfo.type.name.slice(1)}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mb-4">
        <button
          className="bg-yellow-300 hover:bg-sky-700 font-bold hover:text-white py-1 px-4 rounded-full"
          onClick={handlePrevSlide}
        >
          Prev
        </button>
        <button
          className="bg-yellow-300 hover:bg-sky-700 font-bold hover:text-white py-1 px-4 rounded-full"
          onClick={handleNextSlide}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Cards;
