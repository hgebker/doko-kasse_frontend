import React from 'react';

import { Button } from '@salesforce/design-system-react';

export default class EveningView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return <Button label="Hello Button" />;
	}
}
