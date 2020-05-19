import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

function PokemonList(){
	const [ nextUrl, setNextUrl ] = useState('');
	const [ prevUrl, setPrevUrl ] = useState('');
	const initialUrl = 'https://pokeapi.co/api/v2/pokemon/';
	const [ pokemonInfo, setPokemonInfo ] = useState([])

	useEffect(() => {
		const loadPokemonData = async () => {
			let response = await axios.get(initialUrl);
			const results = response.data.results;
			setNextUrl(response.data.next);
			setPrevUrl(response.data.previous);
			await loadPokemonInfo(results)
		}
		loadPokemonData()
	},[])

	const loadPokemonInfo = async data => {
		let _pokemonData =  await Promise.all(
			data.map(async pokemon => {
				let pokemonRecord = await axios.get(pokemon.url)
				return pokemonRecord.data
			})
		)
		setPokemonInfo(_pokemonData)
	}

	const prevPage = async () => {
		const response = await axios.get(prevUrl);
		const results = response.data.results;
		setNextUrl(response.data.next);
		setPrevUrl(response.data.previous);
		loadPokemonInfo(results)
	}

	const nextPage = async () => {
		const response = await axios.get(nextUrl);
		const results = (response.data.results);
		setNextUrl(response.data.next);
		setPrevUrl(response.data.previous);
		await loadPokemonInfo(results)
	}

	return (
		<div>
		<ul>
			{pokemonInfo.map((pokemon, index) => 
				<PokemonCard 
					key={index} pokemon={pokemon}
				/>
			)}
		</ul>
		<button onClick={prevPage}>Prev</button>
		<button onClick={nextPage}>Next</button>
		</div>
	)
}

export default PokemonList