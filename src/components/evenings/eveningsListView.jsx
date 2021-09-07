import { useContext, useState } from 'react';

import EveningList from './eveningList';
import EveningDetailCard from './eveningDetailCard';

import SplitView from '@salesforce/design-system-react/components/split-view';
import { MobileContext } from 'app';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  addButton: {
    backgroundColor: '#0070d2 !important',
    position: 'fixed !important',
    right: '5%',
    bottom: '5%',
    '& svg': {
      fill: '#fff'
    }
  },
  '@media screen and (min-width: 500px)': {
    container: {
      maxHeight: '90vh'
    }
  }
});

export default function EveningsListView({
  evenings,
  onOpenModal,
  onRefresh,
  selectedSemester,
  onSemesterSelected,
  selectedView,
  onViewChange,
  onDelete,
  spinner,
  eveningSpinner,
  selectedEvening,
  onEveningSelected
}) {
  const [viewOpen, setViewOpen] = useState(true);

  const isMobile = useContext(MobileContext);
  const classes = useStyles();

  const handleEveningSelected = selectedEvening => {
    onEveningSelected(selectedEvening);

    if (isMobile) {
      setViewOpen(false);
    }
  };

  return (
    <SplitView
      className={classNames('slds-theme_default slds-box slds-box_x-small', classes.container)}
      isOpen={viewOpen}
      master={
        <>
          {spinner}
          {eveningSpinner}

          <EveningList
            evenings={evenings}
            selectedEvening={selectedEvening}
            onEveningSelected={handleEveningSelected}
            selectedSemester={selectedSemester}
            onSemesterSelected={onSemesterSelected}
            onNewClicked={onOpenModal}
            onRefresh={onRefresh}
            selectedView={selectedView}
            onViewChange={onViewChange}
          />
        </>
      }
      detail={<EveningDetailCard evening={selectedEvening} onEdit={onOpenModal} onDelete={onDelete} />}
      events={{
        onClose: () => setViewOpen(false),
        onOpen: () => setViewOpen(true)
      }}
    />
  );
}
