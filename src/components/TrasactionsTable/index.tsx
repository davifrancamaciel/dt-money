import React from 'react';

import { useTransactions } from '../../hooks/useTransactions';
import { Container } from './styles';

export const TransactionsTable: React.FC = () => {
	const { transactions } = useTransactions();

	return (
		<Container>
			<table>
				<thead>
					<tr>
						<th>Titulo</th>
						<th>Valor</th>
						<th>Categoria</th>
						<th>Data</th>
					</tr>
				</thead>
				<tbody>
					{transactions.map((transaction) => (
						<tr key={transaction.id}>
							<td>{transaction.title}</td>
							<td className={transaction.type}>{transaction.valueFormated}</td>
							<td>{transaction.category}</td>
							<td>{transaction.createdAtFormated}</td>
						</tr>
					))}
				</tbody>
			</table>
		</Container>
	);
};
