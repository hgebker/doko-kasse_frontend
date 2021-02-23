import { useState, useEffect, FC } from 'react';

import { eveningsAPI } from 'api';
import { useToasts } from 'components/HOC/withToasts';
import { useSpinner } from 'components/HOC/withSpinner';
import { createDefaultModalConfig, useModal } from 'components/HOC/withModal';
import useEvenings from './useEvenings';

import AddEveningForm from './eveningForm';
import EveningList from './eveningList';
import EveningDetailCard from './eveningDetailCard';

import SplitView from '@salesforce/design-system-react/components/split-view';
import Icon from '@salesforce/design-system-react/components/icon';
import Fab from '@material-ui/core/Fab';
import { makeStyles, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({
  addButton: {
    backgroundColor: '#0070d2 !important',
    position: 'fixed',
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

const EveningOverview: FC = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [viewOpen, setViewOpen] = useState(true);
  const [selectedEvening, setSelectedEvening] = useState<Evening | null>(null);
  const [selectedSemester, setSelectedSemester] = useState({ id: 'gesamt', label: 'Gesamt' });
  const [evenings, setEvenings, eveningSpinner] = useEvenings(selectedSemester);

  const [toast, showToast] = useToasts();
  const [spinner, setLoading] = useSpinner();
  const [modal, openModal] = useModal();

  const modalConfig = createDefaultModalConfig({
    type: AddEveningForm,
    props: {}
  });
  modalConfig.heading = 'Abend anlegen';
  modalConfig.buttons = [
    {
      label: 'Abbrechen',
      variant: 'neutral'
    },
    {
      label: 'Speichern',
      variant: 'brand',
      action: childState => {
        handleSaveClicked(childState.item as Evening);
      }
    }
  ];

  useEffect(() => {
    setSelectedEvening(evenings[0]);
  }, [evenings]);

  const handleSaveClicked = async (item: Evening) => {
    setLoading(true);
    try {
      const savedEvening = await eveningsAPI.createEvening(item);

      handleEveningSelected(savedEvening);
      setEvenings([...evenings, savedEvening]);

      showToast('Erfolg!', 'Der Abend wurde erfolgreich gespeichert.', 'success');
    } catch (error) {
      showToast('Ein Fehler ist aufgetreten!', 'Der Abend konnte nicht gespeichert werden.', 'success');
    } finally {
      setLoading(false);
    }
  };

  const handleEveningSelected = (selectedEvening: Evening) => {
    setSelectedEvening(selectedEvening);

    if (isMobile) {
      setViewOpen(false);
    }
  };

  const handleSemesterSelected = (selectedSemester: { id: string; label: string }) => {
    setSelectedSemester(selectedSemester);
  };

  const handleOpenModal = () => {
    openModal(modalConfig);
  };

  const handleRefresh = () => {
    setSelectedSemester({ id: 'gesamt', label: 'Gesamt' });
  };

  return (
    <>
      {toast}
      {modal}

      <SplitView
        className="slds-theme_default slds-box slds-box_x-small"
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
              onSemesterSelected={handleSemesterSelected}
              onNewClicked={handleOpenModal}
              onRefresh={handleRefresh}
            />
          </>
        }
        detail={<EveningDetailCard evening={selectedEvening} />}
        events={{
          onClose: () => setViewOpen(false),
          onOpen: () => setViewOpen(true)
        }}
      />

      <Fab onClick={handleOpenModal} classes={{ root: classes.addButton }}>
        <Icon category="utility" name="add" />
      </Fab>
    </>
  );
};

export default EveningOverview;
