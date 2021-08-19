export default interface ICoinTrending {
  coins: Coin[];
  exchanges: any[];
}

export interface Coin {
  item: Item;
}

export interface Item {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
  score: number;
}
