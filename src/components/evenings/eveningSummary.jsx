import FormattedNumberField from 'components/base/formattedNumberField';
import FormattedTextField from 'components/base/formattedTextField';

export default function EveningSummary({ max, min, sum, avg, maxPlayer, minPlayer }) {
  return (
    <footer className="capitalize">
      <dl className="slds-list_horizontal slds-wrap">
        <dt className="slds-item_label slds-text-color_weak slds-truncate" title="Tagesschlechteste/r">
          Tagesschlechteste/r:
        </dt>
        <dd className="slds-item_detail slds-truncate" title={max}>
          <FormattedTextField value={maxPlayer} /> - <FormattedNumberField value={max} />
        </dd>
        <dt className="slds-item_label slds-text-color_weak slds-truncate" title="Tagesbeste/r">
          Tagesbeste/r:
        </dt>
        <dd className="slds-item_detail slds-truncate" title={min}>
          <FormattedTextField value={minPlayer} /> - <FormattedNumberField value={min} />
        </dd>
        <dt className="slds-item_label slds-text-color_weak slds-truncate" title="Gesamt">
          Gesamt:
        </dt>
        <dd className="slds-item_detail slds-truncate" title={sum}>
          <FormattedNumberField value={sum} />
        </dd>
        <dt className="slds-item_label slds-text-color_weak slds-truncate" title="Durchschnitt:">
          Durchschnitt:
        </dt>
        <dd className="slds-item_detail slds-truncate" title={avg}>
          <FormattedNumberField value={avg} />
        </dd>
      </dl>
    </footer>
  );
}
