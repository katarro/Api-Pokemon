import React from "react";
import { useState, useEffect } from "react"; // Hooks
import "./App.css";
import { getPokemonData } from "./components/Api";
import Navbar from "./components/Navbar";
import Routes from "./components/Routes";

function App(props) {
  const [pokemons, setPokemons] = useState([]);
  const min = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=700";
  //const max = 'https://pokeapi.co/api/v2/pokemon?offset=166&limit=818';

  const fetchPokemons = async () => {
    const getPokemons = async () => {
      try {
        const response = await fetch(min);
        const data = await response.json();
        return data;
      } catch (error) {}
    };

    const data = await getPokemons();
    const promises = data.results.map(async (pokemon) => {
      return await getPokemonData(pokemon.url);
    });

    const results = await Promise.all(promises);
    //Fusionar los arreglos

    //const resultados = results.concat(results2);
    setPokemons(results);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <Routes pokemons={pokemons} />
    </React.Fragment>
  );
}

export default App;
