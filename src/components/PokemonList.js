import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

function PokemonList(){
	const [ pokemonData, setPokemonData ] = useState([]);
	const [ nextUrl, setNextUrl ] = useState('');
	const [ prevUrl, setPrevUrl ] = useState('');
	const initialUrl = 'https://pokeapi.co/api/v2/pokemon/';
	const [ pokemonInfo, setPokemonInfo ] = useState([])

	useEffect(() => {
		loadPokemonData()
	})
	 
	const loadPokemonData = async () => {
		let response = await axios.get(initialUrl);
		setPokemonData(response.data.results);
		setNextUrl(response.next);
		setPrevUrl(response.previous);
		loadPokemonInfo(pokemonData)
	}

	const loadPokemonInfo = async data => {
		let _pokemonData =  await Promise.all(
			data.map(async pokemon => {
				let pokemonRecord = await axios.get(pokemon.url)
				return pokemonRecord.data
			})
		)
		setPokemonInfo(_pokemonData)
	}

	// const prevPage = async () => {
	// 	const response = await axios.get(prevUrl);
	// 	setPokemonData(response.data.results);
	// 	setNextUrl(response.next);
	// 	setPrevUrl(response.previous);
	// 	loadPokemonInfo(pokemonData)
	// }

	// const nextPage = async () => {
	// 	const response = await axios.get(nextUrl);
	// 	setPokemonData(response.data.results);
	// 	setNextUrl(response.next);
	// 	setPrevUrl(response.previous);
	// 	loadPokemonInfo(pokemonData)
	// }

	return (
		<div>
		<ul>
			{pokemonInfo.map((pokemon, index) => 
				<PokemonCard 
					key={index} pokemon={pokemon}
				/>
			)}
		</ul>
		{/* <button onClick={prevPage}>Prev</button>
		<button onClick={nextPage}>Next</button> */}
		</div>
	)
}

export default PokemonList