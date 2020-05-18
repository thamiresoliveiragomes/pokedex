import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

function PokemonList(){
	const [ pokemonData, setPokemonData ] = useState([]);

	useEffect(() => {
		loadPokemonData()
	})
	 
	const loadPokemonData = async () => {
		const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
		setPokemonData(response.data.results)
	}

	return (
		<ul>
			{pokemonData.map(pokemon => 
				<PokemonCard 
					key={pokemon.name} name={pokemon.name} url={pokemon.url}
				/>
			)}
		</ul>
	)
}

export default PokemonList