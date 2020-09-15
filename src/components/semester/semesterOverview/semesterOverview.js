import React from 'react';
import { SplitView, Spinner, Icon } from '@salesforce/design-system-react';
import { getEntries, createEntry } from '../dokoAbendeApi';
import EveningList from '../eveningList/eveningList';
import EveningDetail from '../eveningDetail/eveningDetail';
import AddEveningModal from '../addEveningModal/addEveningModal';
import { Fab } from '@material-ui/core';
import './semesterOverview.css';

export default class SemesterOverview extends React.Component {
	state = {
		evenings: [],
		selectedEvening: {},
		loading: false,
		viewOpen: true,
		modalOpen: false
	};

	componentDidMount = () => {
		this.handleRefresh();
	};

	handleRefresh = async () => {
		this.setState({ loading: true });
		try {
			const evenings = await getEntries();
			this.setState({ evenings, selectedEvening: evenings[0] });
		} catch (error) {
			console.error(error);
		} finally {
			this.setState({ loading: false });
		}
	};

	handleSaveClicked = async item => {
		this.setState({ loading: true });
		try {
			await createEntry(item);
			this.handleRefresh();
		} catch (error) {
			console.error();
		} finally {
			this.setState({ loading: false });
		}
	};

	changeModalState = () => {
		this.setState({ modalOpen: !this.state.modalOpen });
	};

	setSelectedEvening = selectedEvening => {
		this.setState({ selectedEvening });
	};

	components = () => ({
		master: (
			<EveningList
				evenings={this.state.evenings}
				selection={[this.state.selectedEvening]}
				onEveningSelected={this.setSelectedEvening}
				onRefresh={this.handleRefresh}
			/>
		),
		detail: <EveningDetail evening={this.state.selectedEvening.data} />,
		events: {
			onClose: () => this.setState({ viewOpen: false }),
			onOpen: () => this.setState({ viewOpen: true })
		}
	});

	render = ({ master, detail, events } = this.components()) => (
		<div>
			<div className="slds-is-relative">
				{this.state.loading && <Spinner variant="brand" />}

				<SplitView
					className="slds-theme_default slds-box slds-box_x-small container"
					isOpen={this.state.viewOpen}
					master={this.state.evenings.length ? master : <div></div>}
					detail={this.state.selectedEvening.data ? detail : <div></div>}
					events={events}
				/>
			</div>

			<Fab onClick={this.changeModalState} classes={{ root: 'add-button' }}>
				<Icon category="utility" name="add" />
			</Fab>

			<AddEveningModal open={this.state.modalOpen} onClose={this.changeModalState} onSave={this.handleSaveClicked} />
		</div>
	);
}
