import React, { useState } from 'react';
import { TransactiosnProvider } from './hooks/useTransactions';
import Modal from 'react-modal';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTrasactionModal } from './components/NewTrasactionModal';

import { GlobalStyle } from './styles/global';

Modal.setAppElement('#root');

export function App() {
	const [isNewTrasactionModalOpen, setIsNewTrasactionModalOpen] = useState(false);

	function handleToggleNewTransactionModal() {
		setIsNewTrasactionModalOpen(!isNewTrasactionModalOpen);
	}

	return (
		<TransactiosnProvider>
			<Header onOpenNewTransactionModal={handleToggleNewTransactionModal} />
			
			<Dashboard />

			<NewTrasactionModal isOpen={isNewTrasactionModalOpen} onRequestClose={handleToggleNewTransactionModal} />

			<GlobalStyle />
		</TransactiosnProvider>
	);
}
