import Card from '@salesforce/design-system-react/components/card';
import Icon from '@salesforce/design-system-react/components/icon';
import Avatar from '@salesforce/design-system-react/components/avatar';
import { PLAYERS, PLAYER_DETAILS } from 'constants/player';
import FormattedNumberField from 'components/base/formattedNumberField';

const EveningDetailFooter = ({ max, min, sum, avg, maxPlayer, minPlayer }) => (
  <footer className="capitalize">
    <dl className="slds-list_horizontal slds-wrap">
      <dt className="slds-item_label slds-text-color_weak slds-truncate" title="Tagesschlechteste/r">
        Tagesschlechteste/r:
      </dt>
      <dd className="slds-item_detail slds-truncate" title={max}>
        {maxPlayer} - <FormattedNumberField value={max} />
      </dd>
      <dt className="slds-item_label slds-text-color_weak slds-truncate" title="Tagesbeste/r">
        Tagesbeste/r:
      </dt>
      <dd className="slds-item_detail slds-truncate" title={min}>
        {minPlayer} - <FormattedNumberField value={min} />
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

export default function EveningDetailCard({ evening }) {
  if (!evening) {
    return null;
  }

  return (
    <Card
      heading={evening.Datum}
      icon={<Icon category="standard" name="event" />}
      footer={EveningDetailFooter(evening)}>
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
