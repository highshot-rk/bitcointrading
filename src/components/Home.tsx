import React, { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Divider, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import CoinSearch from './CoinSearch';
import { useCoinApi } from '../shared/CoinApi';
import LoadingSpinner from './LoadingSpinner';
import ICoinTrending from '../types/ICoinTrending';
import CoinTrending from './CoinTrending';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

export default function Home(): ReactElement {
  const coinsTrendingURL = 'https://api.coingecko.com/api/v3/search/trending';
  const [coinsTrending] = useCoinApi<ICoinTrending>('GET', coinsTrendingURL);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (coinsTrending) {
      const lastIndex = coinsTrending?.coins.length - 1;
      if (index < 0) {
        setIndex(lastIndex);
      }
      if (index > lastIndex) {
        setIndex(0);
      }
    }
  }, [index, coinsTrending]);

  useEffect(() => {
    const slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);

    return () => clearInterval(slider);
  }, [index]);

  if (!coinsTrending) return <LoadingSpinner name="coins" />;

  const coins = coinsTrending.coins;

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column width={8}>
          <Header as="h2">
            <Icon name="chart bar outline" />
            <Header.Content>
              Welcome to CryptoStats
              <Header.Subheader>CoinGecko API</Header.Subheader>
            </Header.Content>
          </Header>
          <Link className="ui yellow button" to="/coins">
            Go to coin List
          </Link>
          <CoinSearch headline="Coin Search" />
        </Grid.Column>
        <Grid.Column width={8} textAlign="center">
          <Header as="h2">
            Top-7 trending coins on CoinGecko
            <Header.Subheader>
              as searched by users in the last 24 hours
            </Header.Subheader>
          </Header>
          <Divider />
          <Segment basic>
            {coins.length ? (
              coins.map((coin, coinIndex) => {
                let position = 'nextSlide';
                if (coinIndex === index) {
                  position = 'activeSlide';
                }
                if (
                  coinIndex === index - 1 ||
                  (index === 0 && coinIndex === coins.length - 1)
                ) {
                  position = 'lastSlide';
                }
                return (
                  <article className={position} key={coin.item.id}>
                    <Link
                      to={`/coins/${
                        coins[
                          index === coins.length
                            ? 0
                            : index === -1
                            ? coins.length - 1
                            : index
                        ].item.id
                      }`}
                    >
                      <CoinTrending coin={coin.item} />
                    </Link>
                  </article>
                );
              })
            ) : (
              <p>Data currently not available...</p>
            )}
            <button className="prev" onClick={() => setIndex(index - 1)}>
              <FiChevronLeft />
            </button>
            <button className="next" onClick={() => setIndex(index + 1)}>
              <FiChevronRight />
            </button>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
