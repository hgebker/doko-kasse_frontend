import React from 'react';
import './App.css';
import EveningView from './components/EveningView';
import { IconSettings } from '@salesforce/design-system-react';

const App = () => (
	<IconSettings iconPath="/icons">
		<EveningView />
	</IconSettings>
);

export default App;
