import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';

import { App } from './App';
createServer({
	models: {
		transaction: Model,
	},

	seeds(server) {
		server.db.loadData({
			transactions: [
				{
					id: 1,
					title: 'Freelance de website',
					type: 'deposit',
					Category: 'Dev',
					value: 6000,
					createdAt: new Date('2021-02-12 09:00:00'),
				},
				{
					id: 2,
					title: 'Aluguel',
					type: 'withdraw',
					Category: 'Casa',
					value: 1100,
					createdAt: new Date('2021-02-20 09:00:00'),
				},
				{
					id: 3,
					title: 'Gasolina carro',
					type: 'withdraw',
					Category: 'Carro',
					value: 300,
					createdAt: new Date('2021-03-12 09:00:00'),
				},
				{
					id: 4,
					title: 'Pagamento de salario',
					type: 'deposit',
					Category: 'Emprego fixo',
					value: 6000,
					createdAt: new Date('2021-04-23 09:00:00'),
				},
			],
		});
	},
	routes() {
		this.namespace = 'api';

		this.get('/transactions', () => {
			return this.schema.all('transaction');
		});

		this.post('/transactions', (schema, request) => {
			const data = JSON.parse(request.requestBody);
			return schema.create('transaction', data);
		});
	},
});

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

