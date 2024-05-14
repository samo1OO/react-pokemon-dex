import "./App.css";
import { useEffect, useState } from "react";
import PokemonThumbnails from "./PokemonThumbnails";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);

  // APIからデータを取得する
  // パラメータにlimitを設定し、20件取得する
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");

  const getAllPokemons = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        createPokemonObject(data.results);
        // 次の20件をURLにセットする
        setUrl(data.next);
      });
  };

  const createPokemonObject = (results) => {
    results.forEach((pokemon) => {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
      fetch(pokemonUrl)
        .then((res) => res.json())
        .then((data) => {
          const _image = data.sprites.other["official-artwork"].front_default;
          const _type = data.types[0].type.name;
          const newList = {
            id: data.id,
            name: data.name,
            image: _image,
            type: _type,
          };
          setAllPokemons((currentList) => [...currentList, newList]);
        });
    });
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <div className="app-container">
      <h1>Pokémon List</h1>
      <p>
        API is used from <a href="https://pokeapi.co/">PokeAPI</a>.
      </p>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemon, index) => (
            <PokemonThumbnails
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              type={pokemon.type}
              key={index}
            />
          ))}
        </div>
      </div>
      <footer>
        <small>
          I followed{" "}
          <a href="https://qiita.com/hato_code/items/e75f215ef2d5191341dc">
            this site
          </a>
          's example.
        </small>
      </footer>
    </div>
  );
}

export default App;
