import React from 'react';

import logo from '../../assets/logo.svg';
import { Container, Content } from './styles';

interface HeaderProps {
	onOpenNewTransactionModal: () => void;
}

export const Header = ({ onOpenNewTransactionModal }: HeaderProps) => {
	return (
		<Container>
			<Content>
				<img src={logo} alt="Dm Money" />
				<button onClick={onOpenNewTransactionModal}>Nova transação</button>
			</Content>
		</Container>
	);
};
