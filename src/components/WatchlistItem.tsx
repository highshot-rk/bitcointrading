import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Icon, List, Table, Image } from 'semantic-ui-react';
import ICoinListItem from '../types/ICoinListItem';
import { useStore } from '../Store';
import { useLocalStorage } from '../util/LocalStorage';

interface Props {
  coinListItem: ICoinListItem;
}

export default function WatchlistItem(props: Props): ReactElement {
  const { store, dispatch } = useStore();
  const coin = props.coinListItem;
  const coinListItem = props.coinListItem;

  const formatCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'Eur',
  });

  // handle local storage
  const [, setWatchlist] = useLocalStorage<ICoinListItem[]>('watchlist', []);

  const onRemoveFromWatchlist = () => {
    dispatch({ type: 'removeFromWatchlist', coinListItem });
    const index = store.watchlist.indexOf(coinListItem);
    const newWatchlist = store.watchlist.filter(
      (coinListItem, index_) => index_ !== index
    );
    setWatchlist(newWatchlist);
  };

  return (
    <Table.Row className="enlarge">
      <Table.Cell>{coin.market_cap_rank}</Table.Cell>
      <Table.Cell>
        <Link to={`/coins/${coin.id}`}>
          <List verticalAlign="middle">
            <List.Item style={{ cursor: 'pointer' }}>
              <Image avatar src={coin.image} />
              <List.Content>
                <List.Header>
                  {coin.name}{' '}
                  <span id="grey"> {coin.symbol.toUpperCase()}</span>
                </List.Header>
              </List.Content>
            </List.Item>
          </List>
        </Link>
      </Table.Cell>
      <Table.Cell className="bold" textAlign="right">
        {formatCurrency.format(coin.current_price)}
      </Table.Cell>
      <Table.Cell textAlign="right">
        <div
          id={coin.price_change_percentage_1h_in_currency > 0 ? 'green' : 'red'}
          className="bold"
        >
          {coin.price_change_percentage_1h_in_currency > 0 ? (
            <Icon name="caret up" />
          ) : (
            <Icon name="caret down" />
          )}
          {coin.price_change_percentage_1h_in_currency
            ? Math.abs(+coin.price_change_percentage_1h_in_currency.toFixed(1))
            : 'n/a'}{' '}
          %
        </div>
      </Table.Cell>
      <Table.Cell textAlign="right">
        <div
          id={
            coin.price_change_percentage_24h_in_currency > 0 ? 'green' : 'red'
          }
          className="bold"
        >
          {coin.price_change_percentage_24h_in_currency > 0 ? (
            <Icon name="caret up" />
          ) : (
            <Icon name="caret down" />
          )}
          {coin.price_change_percentage_24h_in_currency
            ? Math.abs(+coin.price_change_percentage_24h_in_currency.toFixed(1))
            : 'n/a'}{' '}
          %
        </div>
      </Table.Cell>
      <Table.Cell textAlign="right">
        <div
          id={coin.price_change_percentage_7d_in_currency > 0 ? 'green' : 'red'}
          className="bold"
        >
          {coin.price_change_percentage_7d_in_currency > 0 ? (
            <Icon name="caret up" />
          ) : (
            <Icon name="caret down" />
          )}
          {coin.price_change_percentage_7d_in_currency
            ? Math.abs(+coin.price_change_percentage_7d_in_currency.toFixed(1))
            : 'n/a'}{' '}
          %
        </div>
      </Table.Cell>
      <Table.Cell textAlign="right">
        <Icon
          onClick={onRemoveFromWatchlist}
          name="remove circle"
          style={{ cursor: 'pointer' }}
        ></Icon>
      </Table.Cell>
    </Table.Row>
  );
}
