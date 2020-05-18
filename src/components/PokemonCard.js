import React, {useEffect, useState} from 'react';
import axios from 'axios';

function PokemonCard(props) {
	const pokemon = {
		name: props.name,
		url: props.url
	}

	const [ pokemonImg, setPokemonImg ] = useState('');

	useEffect(() => {
		loadPokemonInfo()
	})
	 
	const loadPokemonInfo = async () => {
		const response = await axios.get(pokemon.url);
		setPokemonImg(response.data.sprites.front_default)
	}

	return (
		 <li>
				<img alt={pokemon.name} src={pokemonImg}></img>
				<h1>{pokemon.name}</h1>
		 </li>
	)
}

export default PokemonCard