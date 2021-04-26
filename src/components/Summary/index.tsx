import React, { useEffect, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';

import { Container } from './styles';
import { formatPrice } from '../../utils/formatPrice';

interface SummaryFormated {
	deposit: string;
	withdraw: string;
	total: string;
}
export const Summary: React.FC = () => {
	const { transactions } = useTransactions()
	const [summaryFormated, setSummaryFormated] = useState<SummaryFormated>({} as SummaryFormated);
	
	useEffect(() => {
		console.log(transactions);
		const summary = transactions.reduce(
			(acc, transaction) => {
				if (transaction.type === 'deposit') {
					acc.deposit += transaction.value;
					acc.total += transaction.value;
				} else {
					acc.withdraw += transaction.value;
					acc.total -= transaction.value;
				}
				return acc;
			},
			{ deposit: 0, withdraw: 0, total: 0 }
		);
		setSummaryFormated({
			deposit: formatPrice(summary.deposit),
			withdraw: formatPrice(summary.withdraw),
			total: formatPrice(summary.total),
		});
	}, [transactions]);

	return (
		<Container>
			<div>
				<header>
					<p>Entradas</p>
					<img src={incomeImg} alt="Entradas" />
				</header>
				<strong>{summaryFormated.deposit}</strong>
			</div>
			<div>
				<header>
					<p>Saidas</p>
					<img src={outcomeImg} alt="Saidas" />
				</header>
				<strong>-{summaryFormated.withdraw}</strong>
			</div>
			<div className="hightlight-background">
				<header>
					<p>Total</p>
					<img src={totalImg} alt="Entradas" />
				</header>
				<strong>{summaryFormated.total}</strong>
			</div>
		</Container>
	);
};
