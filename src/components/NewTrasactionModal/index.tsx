import React, { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { useTransactions } from '../../hooks/useTransactions';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { RadioBox, Container, TrasactionTypeContainer } from './styles';

interface NewTrasactionModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
}
export const NewTrasactionModal = ({ isOpen, onRequestClose }: NewTrasactionModalProps) => {
	const { createTransaction } = useTransactions();

	const [type, setType] = useState('deposit');
	const [title, setTitle] = useState('');
	const [value, setValue] = useState(0);
	const [category, setCategory] = useState('');

	async function handleCreateNewTransaction(e: FormEvent) {
		e.preventDefault();
		try {
			await createTransaction({
				type,
				title,
				category,
				value,
			});
			setCategory('');
			setTitle('');
			setValue(0);
			setType('deposit');
			onRequestClose();
		} catch (error) {}
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			overlayClassName="react-modal-overlay"
			className="react-modal-content"
		>
			<button type="button" onClick={onRequestClose} className="react-modal-close">
				<img src={closeImg} alt="Fechar modal" />
			</button>
			<Container onSubmit={handleCreateNewTransaction}>
				<h2>Cadastrar transação</h2>
				<input type="text" placeholder="Titulo" value={title} onChange={(e) => setTitle(e.target.value)} />
				<input
					type="number"
					placeholder="Valor"
					value={value}
					onChange={(e) => setValue(Number(e.target.value))}
				/>

				<TrasactionTypeContainer>
					<RadioBox
						type="button"
						onClick={() => setType('deposit')}
						isActive={type === 'deposit'}
						activeColor="green"
					>
						<img src={incomeImg} alt="Entrada" />
						<span>Entrada</span>
					</RadioBox>
					<RadioBox
						type="button"
						onClick={() => setType('withdraw')}
						isActive={type === 'withdraw'}
						activeColor="red"
					>
						<img src={outcomeImg} alt="Saída" />
						<span>Saída</span>
					</RadioBox>
				</TrasactionTypeContainer>

				<input
					type="text"
					placeholder="Categoria"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
				/>

				<button type="submit">Cadastrar</button>
			</Container>
		</Modal>
	);
};
