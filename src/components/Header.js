import React from 'react';
import styled from 'styled-components';
import logo from '../images/pokedex.png';

const PageHeader = styled.header`
	text-align: center;
	margin: 30px;
`;

const Logo = styled.img`
	width: 500px;
`;

function Header() {

	return (
		 <PageHeader onClick={() => window.location.reload()}>
			<Logo alt='Logo' src={logo}></Logo>
		 </PageHeader>
	)
}

export default Header;