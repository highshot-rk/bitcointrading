import React, { ReactElement } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CoinDetails from './CoinDetails';
import CoinList from './CoinList';
import Home from './Home';
import Watchlist from './Watchlist';

export default function Routes(): ReactElement {
  return (
    <Switch>
      <Route path="/coins/:coinId">
        <CoinDetails />
      </Route>
      <Route path="/coins">
        <CoinList />
      </Route>
      <Route path="/watchlist">
        <Watchlist />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route exact path="">
        <Redirect to="/home" />
      </Route>
    </Switch>
  );
}
