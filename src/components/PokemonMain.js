import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Card from './Card';
import rightIcon from '../images/right.png';
import leftIcon from '../images/left.png';

const Main = styled.main`
	display: flex;
  flex-direction: column;
`;

const SearchBar = styled.div`
	display: flex;
  justify-content: center;
`;

const Input = styled.input`
	width: 50%;
	font-size: 15px;
	border-radius: 30px;
	padding: 15px;
	margin-bottom: 10px;
	font-family: 'Helvetica', FontAwesome, sans-serif;
	outline: 0;
	border: none;
`;

const PokemonList = styled.ul`
	list-style-type: none;
	display: flex;
	flex-wrap: wrap;
	padding: 0;
	justify-content: center;
`;

const Button = styled.button`
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
	width: 50px;
	margin: 0 20px;
`;

const ChangePageButtons = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 30px;
`;

const Icon = styled.img`
  width: 100%;
`;


function PokemonMain(){
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
		<Main>
			<SearchBar>
				<Input type={'text'} value={filter} 
					placeholder='&#xF002; What Pokémon are you looking for?'
        	onChange={handleSearchChange}>
				</Input>
			</SearchBar>
			<PokemonList>
				{pokemonInfo.map((pokemon, index) => 
					<Card 
						key={index} pokemon={pokemon}
					/>
				)}
			</PokemonList>
			<ChangePageButtons>
				{prevUrl ? <Button onClick={() => changePage(prevUrl)}><Icon src={leftIcon}></Icon></Button> : null}
				{nextUrl ? <Button onClick={() => changePage(nextUrl)}><Icon src={rightIcon}></Icon></Button> : null}
			</ChangePageButtons>
		</Main>
	)
}

export default PokemonMain