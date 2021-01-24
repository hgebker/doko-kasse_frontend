import { useState, useEffect } from 'react';
import { eveningsAPI } from '../../api';
import DataTable from '@salesforce/design-system-react/components/data-table';
import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';
import PageHeader from '@salesforce/design-system-react/components/page-header';
import Icon from '@salesforce/design-system-react/components/icon';

const ReportView = () => {
  const [evenings, setEvenings] = useState([]);

  useEffect(() => {
    loadEvenings();
  });

  const loadEvenings = async () => {
    // this.props.setLoading(true);
    try {
      setEvenings(await eveningsAPI.listEvenings());
    } catch (error) {
      // this.props.showToast('Ein Fehler ist aufgetreten!', 'Abende konnten nicht geladen werden.', 'error');
      setEvenings([]);
    } finally {
      // this.props.setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        icon={<Icon assistiveText={{ label: 'Opportunity' }} category="standard" name="opportunity" />}
        label="Auswertungen"
        title="Test"
        truncate
        variant="object-home"
        className="slds-var-m-bottom_small"
      />

      <div className="slds-box slds-theme_default slds-var-m-vertical_small">
        <DataTable items={evenings}>
          <DataTableColumn key="datum" label="Datum" property="Datum" />
          <DataTableColumn key="tim" label="Tim" property="tim" />
          <DataTableColumn key="jan" label="Jan" property="jan" />
          <DataTableColumn key="ole" label="Ole" property="ole" />
          <DataTableColumn key="hannes" label="Hannes" property="hannes" />
          <DataTableColumn key="louisa" label="Louisa" property="louisa" />
          <DataTableColumn key="sonstige" label="Sonstige" property="sonstige" />
        </DataTable>
      </div>
    </>
  );
};

export default ReportView;
