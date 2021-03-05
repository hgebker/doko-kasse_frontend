import { useState, useEffect } from 'react';
import classNames from 'classnames';

import { eveningsAPI } from 'api';
import { useToasts } from 'components/HOC/withToasts';
import { useSpinner } from 'components/HOC/withSpinner';
import { useModal } from 'components/HOC/withModal';
import useEvenings from './useEvenings';

import AddEveningForm from './eveningForm';
import EveningList from './eveningList';
import EveningDetailCard from './eveningDetailCard';

import SplitView from '@salesforce/design-system-react/components/split-view';
import Icon from '@salesforce/design-system-react/components/icon';
import Fab from '@material-ui/core/Fab';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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

const EveningOverview = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [viewOpen, setViewOpen] = useState(true);
  const [selectedEvening, setSelectedEvening] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState({ id: 'gesamt', label: 'Gesamt' });
  const [evenings, setEvenings, eveningSpinner] = useEvenings(selectedSemester);

  const [toast, showToast] = useToasts();
  const [spinner, setLoading] = useSpinner();
  const [modal, openModal] = useModal();

  useEffect(() => {
    setSelectedEvening(evenings[0]);
  }, [evenings]);

  const refreshEvenings = async params => {
    setLoading(true);
    try {
      setEvenings(await eveningsAPI.listEvenings(selectedSemester.id));
    } catch {
      setEvenings([]);
    } finally {
      setLoading(false);
    }
  };

  const createEvening = async newEvening => {
    setLoading(true);
    try {
      handleEveningSelected(await eveningsAPI.createEvening(newEvening));
      refreshEvenings();

      showToast('Erfolg!', 'Der Abend wurde erfolgreich gespeichert.', 'success');
    } catch (error) {
      showToast('Ein Fehler ist aufgetreten!', 'Der Abend konnte nicht gespeichert werden.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateEvening = async eveningToUpdate => {
    setLoading(true);
    try {
      await eveningsAPI.updateEvening(eveningToUpdate);
      refreshEvenings();

      showToast('Erfolg!', 'Der Abend wurde erfolgreich aktualisiert.', 'success');
    } catch (error) {
      showToast('Ein Fehler ist aufgetreten!', 'Der Abend konnte nicht aktualisiert werden.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteEvening = async datum => {
    setLoading(true);
    try {
      await eveningsAPI.deleteEvening(datum);
      refreshEvenings();

      showToast('Erfolg!', 'Der Abend wurde erfolgreich gelöscht.', 'success');
    } catch (error) {
      showToast('Ein Fehler ist aufgetreten!', 'Der Abend konnte nicht gelöscht werden.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEveningSelected = selectedEvening => {
    setSelectedEvening(selectedEvening);

    if (isMobile) {
      setViewOpen(false);
    }
  };

  const handleSemesterSelected = selectedSemester => {
    setSelectedSemester(selectedSemester);
  };

  const openFormModal = eveningToUpdate => {
    openModal({
      heading: `Abend ${eveningToUpdate ? 'bearbeiten' : 'anlegen'}`,
      buttons: [
        {
          label: 'Abbrechen'
        },
        {
          label: 'Speichern',
          variant: 'brand',
          action: childState => {
            if (eveningToUpdate) {
              updateEvening(childState.item);
            } else {
              createEvening(childState.item);
            }
          }
        }
      ],
      child: {
        type: AddEveningForm,
        attributes: {
          presetEvening: eveningToUpdate
        }
      },
      options: {
        dismissOnClickOutside: false
      }
    });
  };

  return (
    <>
      {toast}
      {modal}

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
              onSemesterSelected={handleSemesterSelected}
              onNewClicked={openFormModal}
              onRefresh={refreshEvenings}
            />
          </>
        }
        detail={<EveningDetailCard evening={selectedEvening} onEdit={openFormModal} onDelete={deleteEvening} />}
        events={{
          onClose: () => setViewOpen(false),
          onOpen: () => setViewOpen(true)
        }}
      />

      <Fab onClick={() => openFormModal()} classes={{ root: classes.addButton }}>
        <Icon category="utility" name="add" />
      </Fab>
    </>
  );
};

export default EveningOverview;
