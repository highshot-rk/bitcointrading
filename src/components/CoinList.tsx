import React, { ReactElement, SyntheticEvent, useState } from 'react';
import { useCoinApi } from '../shared/CoinApi';
import { coinListURL } from '../shared/URLBuilder';
import {
  Button,
  Container,
  Divider,
  Dropdown,
  DropdownProps,
  Grid,
  GridColumn,
  Icon,
  Pagination,
  PaginationProps,
  Table,
} from 'semantic-ui-react';

import ICoinListItem from '../types/ICoinListItem';
import CoinListItem from './CoinListItem';
import LoadingSpinner from './LoadingSpinner';
import { Currencies } from '../shared/Currencies';
import { CurrencyOptions } from '../shared/CurrencyOptions';
import { Link } from 'react-router-dom';

export default function CoinList(): ReactElement {
  const [currency, setCurrency] = useState(Currencies.EUR.code);
  const [perPage, setPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  const coinsURL = coinListURL('coins/markets', currency, perPage, currentPage)
    .href;
  const [coins] = useCoinApi<ICoinListItem[]>('GET', coinsURL);

  if (!coins) {
    return <LoadingSpinner name="Coins" />;
  }

  // handle pagination
  const onPageChange = (e: SyntheticEvent, pageInfo: PaginationProps) => {
    if (pageInfo.activePage) setCurrentPage(+pageInfo.activePage);
  };

  // handle results per page
  const onPerPageChange = (e: SyntheticEvent, info: DropdownProps) => {
    if (info.value) setPerPage(+info.value);
  };

  // handle pagination options
  const pageOptions = [
    { text: '15', value: 15 },
    { text: '30', value: 30 },
    { text: '50', value: 50 },
  ];

  // handle currency option
  const onChangeCurrency = (e: SyntheticEvent, info: DropdownProps) => {
    if (info.value) setCurrency(info.value.toString());
  };

  return (
    <>
      <Grid columns={2}>
        <GridColumn>
          <Dropdown
            onChange={onChangeCurrency}
            button
            className="icon"
            floating
            labeled
            options={CurrencyOptions}
            search
            text={currency}
          />
          <Link to="/watchlist">
            <Button icon labelPosition="left">
              <Icon name="star outline" />
              Watchlist
            </Button>
          </Link>
        </GridColumn>
        <GridColumn textAlign="right">
          <span>
            <strong>Show rows &nbsp;</strong>
          </span>
          <Dropdown
            options={pageOptions}
            onChange={onPerPageChange}
            placeholder={perPage.toString()}
            compact
            selection
          ></Dropdown>
        </GridColumn>
      </Grid>
      <Divider />
      <Table basic="very" singleLine selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="2" textAlign="center">
              #
            </Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">Price</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">1h %</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">24h %</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">7d %</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">Volume (24h)</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">Market Cap</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {coins.map((coin) => (
            <CoinListItem key={coin.id} coin={coin} currency={currency} />
          ))}
        </Table.Body>
      </Table>
      <Container className="ui center aligned container">
        <Pagination
          onPageChange={onPageChange}
          activePage={currentPage}
          siblingRange={2}
          totalPages={25}
        ></Pagination>
      </Container>
    </>
  );
}
