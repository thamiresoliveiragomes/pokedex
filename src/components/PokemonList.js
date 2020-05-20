import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

function PokemonList(){
	const initialUrl = 'https://pokeapi.co/api/v2/pokemon/';
	const [ nextUrl, setNextUrl ] = useState('');
	const [ prevUrl, setPrevUrl ] = useState('');
	const [ pokemonInfo, setPokemonInfo ] = useState([]);
	const [ allPokemon, setAllPokemon ] = useState([]);

	useEffect(() => {
		const loadPokemonData = async () => {
			let response = await axios.get(initialUrl)
			setNextUrl(response.data.next)
			setPrevUrl(response.data.previous)
			await loadPokemonInfo(response.data.results)
			await getAllPokemon(response.data.count)
		}
		loadPokemonData()
	},[])

	const loadPokemonInfo = async data => {
		let pokemonData =  await Promise.all(
			data.map(async pokemon => {
				let pokemonRecord = await axios.get(pokemon.url)
				return pokemonRecord.data
			})
		)
		setPokemonInfo(pokemonData)
	}

	const getAllPokemon = async (count) => {
		const response = await axios.get(initialUrl+'?limit='+count);
		setAllPokemon(response.data.results)
	}

	const changePage = async (url) => {
		const response = await axios.get(url);
		setNextUrl(response.data.next);
		setPrevUrl(response.data.previous);
		await loadPokemonInfo(response.data.results)
	}

	const [ filter, setFilter ] = useState('');

	const handleSearchChange = (e) => {
		let filter = e.currentTarget.value
		setFilter(filter)
		setPrevUrl(null)
		setNextUrl(null)
		const result = allPokemon.filter(item => item.name.includes(filter))
		loadPokemonInfo(result)
	}

	return (
		<div>
			<form>
				<input type={'text'} value={filter}
          onChange={handleSearchChange}></input>
			</form>
			<ul>
				{pokemonInfo.map((pokemon, index) => 
					<Card 
						key={index} pokemon={pokemon}
					/>
				)}
			</ul>
			{prevUrl ? <button onClick={() => changePage(prevUrl)}>Prev</button> : null}
			{nextUrl ? <button onClick={() => changePage(nextUrl)}>Next</button> : null}
		</div>
	)
}

export default PokemonList