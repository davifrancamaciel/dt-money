import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';
import { formatPrice } from '../utils/formatPrice';

interface Transaction {
	id: number;
	title: string;
	value: number;
	type: string;
	category: string;
	createdAt: string;
}

interface TransactionFormated {
	id: number;
	title: string;
	type: string;
	category: string;
	valueFormated: string;
	value: number;
	createdAtFormated: string;
}

// não usa os parametros que passar na string e mantem os demais
type TransactionCreate = Omit<Transaction, 'id' | 'createdAt'>;
// usa os parametros que passar na string
// type TransactionCreate = Pick<Transaction, 'title' | 'value' | 'category'>;

interface TransactionProviderProps {
	children: ReactNode;
}

interface TransactiosnContextData {
	transactions: TransactionFormated[];
	createTransaction: (transaction: TransactionCreate) => Promise<void>;
}

const TransactiosnContext = createContext<TransactiosnContextData>({} as TransactiosnContextData);

export const TransactiosnProvider = ({ children }: TransactionProviderProps) => {
	const [transactions, setTransactions] = useState<TransactionFormated[]>([]);

	useEffect(() => {
		async function loadItens() {
			const response = await api.get('transactions');

			const dataFormated = response.data.transactions.map((transaction: Transaction) => ({
				...transaction,
				valueFormated: formatPrice(transaction.value),
				createdAtFormated: new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt)),
			}));

			setTransactions(dataFormated);
		}
		loadItens();
	}, []);

	async function createTransaction(transactionCreate: TransactionCreate) {
		const response = await api.post('transactions', { ...transactionCreate, createdAt: new Date() });

		const { transaction } = response.data;
		const newTransactionFormated = {
			...transaction,
			valueFormated: formatPrice(transaction.value),
			createdAtFormated: new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt)),
		};
		setTransactions([...transactions, newTransactionFormated]);
	}

	return (
		<TransactiosnContext.Provider value={{ transactions, createTransaction }}>
			{children}
		</TransactiosnContext.Provider>
	);
};

export function useTransactions() {
	const context = useContext(TransactiosnContext);
	return context;
}
