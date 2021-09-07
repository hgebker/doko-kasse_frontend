import Card from '@salesforce/design-system-react/components/card';
import Icon from '@salesforce/design-system-react/components/icon';
import Button from '@salesforce/design-system-react/components/button';
import ButtonGroup from '@salesforce/design-system-react/components/button-group';
import Avatar from '@salesforce/design-system-react/components/avatar';
import { PLAYERS, PLAYER_DETAILS } from 'constants/player';
import FormattedNumberField from 'components/base/formattedNumberField';
import EveningSummary from './eveningSummary';

const EveningDetailTile = ({ playerName, avatar, value }) => (
  <section className="slds-tile slds-media slds-var-m-around_small slds-box slds-theme_shade">
    <div className="slds-media__figure">
      <Avatar imgSrc={avatar} imgAlt={playerName} title={playerName} />
    </div>

    <div className="slds-media__body">
      <h1 className="slds-label slds-text-title_caps" title={playerName}>
        {playerName}
      </h1>

      <div className="slds-tile__detail">
        <dl className="slds-list_horizontal slds-wrap">
          <dt className="slds-item_label slds-text-color_weak slds-truncate" title="Betrag">
            Betrag:
          </dt>
          <dd className="slds-item_detail slds-truncate" title={value}>
            <FormattedNumberField value={value} />
          </dd>
        </dl>
      </div>
    </div>
  </section>
);

export default function EveningDetailCard({ evening, onEdit, onDelete }) {
  if (!evening) {
    return null;
  }

  const editPreset = {
    Datum: evening.Datum,
    semester: evening.semester,
    tim: evening.tim,
    jan: evening.jan,
    ole: evening.ole,
    hannes: evening.hannes,
    louisa: evening.louisa
  };

  return (
    <Card
      heading={evening.Datum}
      icon={<Icon category="standard" name="event" />}
      footer={EveningSummary(evening)}
      headerActions={
        <ButtonGroup>
          <Button label="Bearbeiten" onClick={() => onEdit(editPreset)} />
          <Button label="Löschen" onClick={() => onDelete(evening.Datum)} />
        </ButtonGroup>
      }>
      {PLAYERS.map(player => (
        <EveningDetailTile
          key={player}
          playerName={player}
          value={evening[player]}
          avatar={`avatars/${PLAYER_DETAILS.get(player).avatar}.png`}
        />
      ))}
    </Card>
  );
}
