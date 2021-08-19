import React, { ReactElement, useState } from 'react';
import { useCoinApi } from '../shared/CoinApi';
import { coinDetailURL } from '../shared/URLBuilder';
import ReactHtmlParser from 'react-html-parser';

import {
  Grid,
  List,
  Image,
  Divider,
  GridColumn,
  Breadcrumb,
  Label,
  Progress,
  Header,
  Icon,
  Container,
  Button,
} from 'semantic-ui-react';

import ICoinDetails from '../types/ICoinDetails';
import LoadingSpinner from './LoadingSpinner';
import { Link, useParams } from 'react-router-dom';
import HistoryChart from './HistoryChart';

export default function CoinDetails(): ReactElement {
  const { coinId } = useParams<{ coinId: string }>();
  const coinURL = coinDetailURL('coins', coinId).href;
  const coin = useCoinApi<ICoinDetails>('GET', coinURL)[0];
  const [readMore, setReadMore] = useState(false);

  const formatCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'Eur',
  });

  const numberFormat = new Intl.NumberFormat('en-US');

  if (!coin) {
    return <LoadingSpinner name={coinId.toUpperCase()} />;
  }

  return (
    <>
      <Breadcrumb size="small">
        <Link to="/home">
          <Breadcrumb.Section link>Home</Breadcrumb.Section>
        </Link>
        <Breadcrumb.Divider icon="right chevron" />
        <Link to="/coins">
          <Breadcrumb.Section link>Cryptocurrencies</Breadcrumb.Section>
        </Link>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active>{coin.name}</Breadcrumb.Section>
      </Breadcrumb>
      <List verticalAlign="middle">
        <List.Item id="divide">
          <Image avatar src={coin.image.large} />
          <List.Content>
            <List.Header>
              {coin.name}{' '}
              <small>
                <span>{coin.symbol.toUpperCase()}</span>
              </small>
            </List.Header>
          </List.Content>
        </List.Item>
      </List>
      <Grid padded="vertically" centered divided="vertically">
        <Grid.Row columns={3}>
          <Grid.Column>
            <List>
              <List.Item>
                <Label>Rank #{coin.coingecko_rank}</Label>
              </List.Item>
              <List.Item>
                <a href={coin.links.homepage[0]}>
                  <Label as="a" content="Website" icon="linkify" />
                </a>
              </List.Item>
              <List.Item>
                <a href={coin.links.repos_url.github[0]}>
                  <Label as="a" content="Source code" icon="github" />
                </a>
              </List.Item>
            </List>
          </Grid.Column>
          <GridColumn textAlign="right">
            <List>
              <List.Item>
                <h4>
                  {coin.name} price ({coin.symbol.toUpperCase()})
                </h4>
              </List.Item>
              <List.Item>
                <h3>
                  {formatCurrency.format(coin.market_data.current_price.eur)}
                </h3>
              </List.Item>
              <List.Item>
                <List.Content floated="left">
                  24h Low:{' '}
                  <strong>
                    {formatCurrency.format(coin.market_data.low_24h.eur)}
                  </strong>
                </List.Content>
                <List.Content floated="right">
                  24h High:{' '}
                  <strong>
                    {formatCurrency.format(coin.market_data.high_24h.eur)}
                  </strong>
                </List.Content>
              </List.Item>
              <List.Item>
                <Progress
                  total={
                    coin.market_data.high_24h.eur + coin.market_data.low_24h.eur
                  }
                  value={coin.market_data.current_price.eur}
                  size="small"
                />
              </List.Item>
            </List>
          </GridColumn>
          <GridColumn textAlign="right">
            <List>
              <List.Item>
                <p>Circulating Supply</p>
                <strong>
                  {numberFormat.format(
                    +coin.market_data.circulating_supply.toFixed(3)
                  )}{' '}
                  {coin.symbol.toUpperCase()}
                </strong>
              </List.Item>
              <List.Item>
                <p>Max Supply</p>
                <strong>
                  {coin.market_data.max_supply
                    ? numberFormat.format(
                        +coin.market_data.max_supply.toFixed(3)
                      )
                    : 'n/a'}
                </strong>
              </List.Item>
              <List.Item>
                <p>Total Supply</p>
                <strong>
                  {coin.market_data.total_supply
                    ? numberFormat.format(
                        +coin.market_data.total_supply.toFixed(3)
                      )
                    : 'n/a'}
                </strong>
              </List.Item>
            </List>
          </GridColumn>
        </Grid.Row>
      </Grid>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="chart line" />
          {coin.name} Chart
        </Header>
      </Divider>
      <Container>
        <HistoryChart coinId={coinId} />
      </Container>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="tag" />
          Coin Description
        </Header>
      </Divider>
      <Container style={{ textAlign: 'justify' }}>
        {coin.description && readMore
          ? ReactHtmlParser(coin.description.en)
          : coin.description
          ? ReactHtmlParser(`${coin.description.en.substring(0, 500)} . . .`)
          : 'Description not available'}
        {coin.description.en.length > 500 ? (
          <button className="btn" onClick={() => setReadMore(!readMore)}>
            {readMore ? 'Show less' : 'Read more'}
          </button>
        ) : (
          ''
        )}
      </Container>
    </>
  );
}
