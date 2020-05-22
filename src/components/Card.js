import React from 'react';
import styled from 'styled-components';
import pokemonLogo from '../images/pokemon.png';
import backgroundFrontCard from '../images/background-front.jpeg';
import backgroundBackCard from 	'../images/background-back.png';
import hpIcon from '../images/hp.png';
import kgIcon from '../images/kg.png';
import rulerIcon from '../images/ruler.png';

const PokemonCard = styled.li`
	width: 200px;
  height: 300px;
	margin: 2%;
  transform-style: preserve-3d;
	transition: all 0.4s ease;

	:hover{
		transform: rotateY(180deg)
	}
`;

const CardFront = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
	background: white;
	border-radius: 10px;
	box-shadow: 4px 4px 10px rgba(90, 90, 90, 0.719);
	background-image: url(${backgroundFrontCard});
	background-size: 100%;
	color: white;
`;

const CardBack = styled.div`
  width: 100%;
	height: 100%;
  backface-visibility: hidden;
  overflow: hidden;
	transform: rotateY(180deg);
	background: white;
	border-radius: 10px;
	box-shadow: 4px 4px 10px rgba(90, 90, 90, 0.719);
`;

const ImageFront = styled.img`
	width: 60%;
`;

const ImageBack = styled.img`
	width: fit-content;
`;

const LogoPokemon = styled.img`
	width: 50%;
	margin: 9%;
`;

const PokemonName = styled.p`
	font-size: 20px;
`;

const Item = styled.p`
	font-size: '20px';
`;

const CardHeader = styled.div`
	display: flex;
	justify-content: space-around;
	border-bottom: 1px solid;
	margin: 0 6%;
	align-items: center;
`;

const HpIcon = styled.img`
	width: 25px;
	height: 25px;
	margin-right: 5px;
`;

const HpInfo = styled.div`
	display: flex;
	align-items: center;
`;

const CardImage = styled.figure`
	margin: 0;
	display: flex;
	justify-content: center;
	background-image: url(${backgroundBackCard});
	background-size: 100%;
	margin: 7%;
	border: 5px solid #afafaf;
	box-shadow: 2px 3px 5px rgba(12, 12, 12, 0.692);
`;

const TypeList = styled.ul`
	list-style-type: none;
	display: flex;
	padding: 0;
	justify-content: space-evenly;
	margin-bottom: -3%;
`;

const TypeItem = styled.li`
	font-size: 15px;
`;

const CardInfo = styled.div`
	margin: 8%;
	text-align: center;
`;

const MeasuresIcon = styled.img`
	width: 20px;
	height: 20px;
	margin-left: 8px;
`;

function Card({ pokemon }) {
	return (
		 <PokemonCard>
				<CardFront>
					<LogoPokemon alt='logo' src={pokemonLogo}></LogoPokemon>
					<ImageFront alt={pokemon.name} src={pokemon.sprites.front_default}></ImageFront>
					<PokemonName>{pokemon.name.toUpperCase()}</PokemonName>
				</CardFront>
				<CardBack>
					<CardHeader>
						<Item>
							{pokemon.name.toLowerCase().split(' ').map(
								letter => letter.charAt(0).toUpperCase() + letter.substring(1))} 
						</Item>
						<HpInfo>
							<HpIcon alt='icon' src={hpIcon}></HpIcon>
							<Item>{pokemon.stats[5].base_stat}</Item>
						</HpInfo>
					</CardHeader>
					<CardImage>
						<ImageBack alt={pokemon.name} src={pokemon.sprites.front_default}></ImageBack>
					</CardImage>
					<TypeList>{pokemon.types.map((item, index) => 
						<TypeItem key={index}>
							{item.type.name.toUpperCase()}
						</TypeItem>)}
					</TypeList>
					<CardInfo>
						<Item>Height: {pokemon.height/10}m 
							<MeasuresIcon alt='icon' src={rulerIcon}></MeasuresIcon>
						</Item>
						<Item>Weight: {pokemon.weight/10}kg 
							<MeasuresIcon alt='icon' src={kgIcon}></MeasuresIcon>
						</Item>
					</CardInfo>
				</CardBack>
		 </PokemonCard>
	)
}

export default Card;