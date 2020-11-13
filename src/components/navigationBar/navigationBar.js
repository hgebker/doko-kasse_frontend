import { Component } from 'react';
import GlobalNavigationBar from '@salesforce/design-system-react/components/global-navigation-bar';
import GlobalNavigationBarRegion from '@salesforce/design-system-react/components/global-navigation-bar/region';
import GlobalNavigationBarButton from '@salesforce/design-system-react/components/global-navigation-bar/button';
import Button from '@salesforce/design-system-react/components/button';
import { NAV_ITEMS } from '../../constants/navigation';
import './navigationBar.css';

export default class NavigationBar extends Component {
  handleButtonClicked = event => {
    this.props.onActiveTabChange(event.target.id);
  };
  handleOpenNavigation = () => {
    this.props.onOpenNavigation(!this.props.navigationOpen);
  };

  render = () => (
    <GlobalNavigationBar className="navigation-bar">
      <GlobalNavigationBarRegion className="navigation-bar_launcher-region" region="primary">
        <Button
          variant="icon"
          iconCategory="utility"
          iconName="rows"
          iconSize="large"
          onClick={this.handleOpenNavigation}
        />
        <h1 className="slds-text-heading_medium slds-align-content-center slds-var-p-horizontal_small">
          Doko Kartclub Münster e.V
        </h1>
      </GlobalNavigationBarRegion>

      <GlobalNavigationBarRegion className="navigation-bar_nav-region" region="secondary" navigation>
        {NAV_ITEMS.map(({ id, label }) => (
          <GlobalNavigationBarButton
            key={id}
            id={id}
            label={label}
            active={this.props.activeContent === id}
            onClick={this.handleButtonClicked}
          />
        ))}
      </GlobalNavigationBarRegion>
    </GlobalNavigationBar>
  );
}
