import React from 'react';
import {Summary} from '../Summary';
import {TransactionsTable} from '../TrasactionsTable';

import { Container } from './styles';

export const Dashboard: React.FC = () => {
	return (
		<Container>
			<Summary />
            <TransactionsTable/>
		</Container>
	);
};

