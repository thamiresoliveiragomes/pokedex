import React from 'react';

function Card({ pokemon }) {
	return (
		 <li>
				<img alt={pokemon.name} src={pokemon.sprites.front_default}></img>
				<h1>{pokemon.name}</h1>
				<p>{}</p>
		 </li>
	)
}

export default Card;