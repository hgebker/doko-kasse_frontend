import EveningItem from '../eveningItem/eveningItem';
import { Card, Icon } from '@salesforce/design-system-react';
import './eveningDetail.css';

const EveningFooter = ({ max, min, sum, avg }) => (
  <footer className="capitalize">
    <dl className="slds-list_horizontal slds-wrap">
      <dt className="slds-item_label slds-text-color_weak slds-truncate" title="Tagesschlechteste/r">
        Tagesschlechteste/r:
      </dt>
      <dd className="slds-item_detail slds-truncate" title={max}>
        {max}
      </dd>
      <dt className="slds-item_label slds-text-color_weak slds-truncate" title="Tagesbeste/r">
        Tagesbeste/r:
      </dt>
      <dd className="slds-item_detail slds-truncate" title={min}>
        {min}
      </dd>
      <dt className="slds-item_label slds-text-color_weak slds-truncate" title="Gesamt">
        Gesamt:
      </dt>
      <dd className="slds-item_detail slds-truncate" title={sum}>
        {sum}
      </dd>
      <dt className="slds-item_label slds-text-color_weak slds-truncate" title="Durchschnitt:">
        Durchschnitt:
      </dt>
      <dd className="slds-item_detail slds-truncate" title={avg}>
        {avg}
      </dd>
    </dl>
  </footer>
);

const EveningDetail = ({ evening }) => {
  return (
    <Card
      heading={evening.Datum}
      icon={<Icon category="standard" name="event" />}
      bodyClassName="slds-border_top"
      footer={EveningFooter(evening)}>
      <EveningItem playerName="Tim" value={evening.tim} avatar="avatars/plankton_512px.png" />
      <EveningItem playerName="Jan" value={evening.jan} avatar="avatars/patrick_star_512px.png" />
      <EveningItem playerName="Ole" value={evening.ole} avatar="avatars/spongebob_squarepants_512px.png" />
      <EveningItem playerName="Hannes" value={evening.hannes} avatar="avatars/squidward_tentacles_512px.png" />
      <EveningItem playerName="Louisa" value={evening.louisa} avatar="avatars/sandy_cheeks_512px.png" />
      <EveningItem playerName="Sonstige" value={evening.sonstige} avatar="avatars/gary_the_snail_512px.png" />
    </Card>
  );
};

export default EveningDetail;
