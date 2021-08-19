import React, { ReactElement } from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import { Container, Icon, Menu } from 'semantic-ui-react';

interface Props {
  children: ReactElement;
}

export default function Layout(props: Props): ReactElement {
  return (
    <Router>
      <Menu
        className="ui attached stackable menu"
        id="divide"
        color="teal"
        inverted
      >
        <NavLink to="/home" className="item" activeClassName="active">
          <Icon name="home" />
          Home
        </NavLink>
        <NavLink to="/coins" className="item" activeClassName="active">
          <Icon name="bitcoin" />
          Coins
        </NavLink>
        <NavLink to="/watchlist" className="item" activeClassName="active">
          <Icon name="star outline" />
          Watchlist
        </NavLink>
      </Menu>
      <Container>{props.children}</Container>
      
    </Router>
  );
}
