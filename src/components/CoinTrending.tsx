import React, { ReactElement } from 'react';
import { Image, Header, Label } from 'semantic-ui-react';
import { Item } from '../types/ICoinTrending';

interface IProps {
  coin: Item;
}

export default function CoinTrending(props: IProps): ReactElement {
  const coin = props.coin;

  return (
    <Header as="h1" icon textAlign="center">
      <Header.Content as="h2">
        #{coin.score + 1} {coin.name}
      </Header.Content>
      <Image circular src={coin.large} />
      <Header.Content as="h2">{coin.symbol}</Header.Content>
      <Header.Subheader>
        Market Cap Rank: {coin.market_cap_rank}
      </Header.Subheader>
    </Header>
  );
}
