import PageHeader from '@salesforce/design-system-react/components/page-header';
import PageHeaderControl from '@salesforce/design-system-react/components/page-header/control';
import Icon from '@salesforce/design-system-react/components/icon';
import Button from '@salesforce/design-system-react/components/button';

import { expensesAPI } from 'api';
import { useModal } from 'components/HOC/withModal';
import { useToasts } from 'components/HOC/withToasts';
import { useSpinner } from 'components/HOC/withSpinner';
import useExpenses from './useExpenses';
import ExpensesTable from './expensesTable';
import ExpensesForm from './expensesForm';

function HeaderActions(onNewClicked) {
  return (
    <PageHeaderControl>
      <Button label="Ausgabe hinzufügen" onClick={onNewClicked} responsive />
    </PageHeaderControl>
  );
}

function HeaderControls(onRefresh) {
  return (
    <PageHeaderControl>
      <Button
        assistiveText={{ icon: 'Refresh' }}
        iconCategory="utility"
        iconName="refresh"
        iconVariant="border-filled"
        variant="icon"
        onClick={onRefresh}
        responsive
      />
    </PageHeaderControl>
  );
}

export default function ExpensesOverview() {
  const [expenses, setExpenses, spinner] = useExpenses();
  const [modal, showModal] = useModal();
  const [toast, showToast] = useToasts();
  const [manualSpinner, setLoading] = useSpinner();

  const refresh = async () => {
    setLoading(true);
    try {
      setExpenses(await expensesAPI.getAllExpenses());
    } catch {
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveClicked = async result => {
    try {
      await expensesAPI.createExpense(result.item);
      refresh();

      showToast('Erfolg!', 'Die Ausgabe wurde erfolgreich gespeichert.', 'success');
    } catch (error) {
      showToast('Ein Fehler ist aufgetreten!', 'Die Ausgabe konnte nicht gespeichert werden.', 'error');
    }
  };

  const handleNewClicked = () => {
    showModal({
      heading: 'Ausgabe hinzufügen',
      child: {
        type: ExpensesForm
      },
      buttons: [
        {
          label: 'Abbrechen',
          variant: 'neutral'
        },
        {
          label: 'Speichern',
          variant: 'brand',
          action: handleSaveClicked
        }
      ]
    });
  };

  return (
    <>
      {spinner}
      {modal}
      {toast}
      {manualSpinner}

      <PageHeader
        icon={<Icon category="standard" name="expense" />}
        label="Ausgaben"
        title="Gesamt"
        truncate
        variant="object-home"
        info={`${expenses.length} Ergebnisse`}
        onRenderActions={() => HeaderActions(handleNewClicked)}
        onRenderControls={() => HeaderControls(refresh)}
        className="slds-var-m-bottom_small"
      />
      <div className="slds-box slds-p-around_none slds-theme_default">
        <ExpensesTable expenses={expenses} />
      </div>
    </>
  );
}
