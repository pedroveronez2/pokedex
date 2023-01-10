import React, { useState, useEffect } from 'react';
import axios from 'axios';
// components
import PokemonCard from '../PokemonCard';
import Loading from '../Loading'; // componente de carregamento

async function fetchPokemons() {
  try {
    const pokemons = []
    for (var i = 1; i < 151; i++) {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const name = await response.data.name
      const img = await response.data.sprites.front_default
      const pokemon = {name: name, img: img, description: response.data.description}
      pokemons.push(pokemon)
    }
    return pokemons;
  } catch (error) {
    console.log(error);
  }
}

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // adicionar uma propriedade de carregamento

  useEffect(() => {
    setIsLoading(true); // definir isLoading como verdadeiro enquanto os dados são carregados

    fetchPokemons()
      .then(pokemons => {
        setPokemons(pokemons);
        setIsLoading(false); // definir isLoading como falso quando os dados são carregados com sucesso
      })
      .catch(error => {
        setIsLoading(false); // definir isLoading como falso quando houver um erro
      });
  }, []);

  if (isLoading) {
    return (
      <React.Fragment>
        <div  style={{margin: 'auto',height: '100vh',display: 'flex',flexDirection: 'row',justifyContent: 'center',alignItems: 'center'
}}>
          <Loading />
        </div>
      </React.Fragment>
    ); // exibir o componente de carregamento enquanto isLoading for verdadeiro
  }



  return (
    <ul className='d-flex flex-wrap list-inline'> 
      {pokemons.map(pokemon => (
        <li className='m-2' key={pokemon.name}>
          <PokemonCard name={pokemon.name} img={pokemon.img} description={pokemon.description}/>
        </li>
      ))}
    </ul>
  );
}

export default PokemonList;

