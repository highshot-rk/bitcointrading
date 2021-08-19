import React, { ChangeEvent, ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ICoinListItem from '../types/ICoinListItem';
import { coinApi } from '../shared/CoinApi';
import { List, Image } from 'semantic-ui-react';
import { coinListURL } from '../shared/URLBuilder';

interface IProps {
  className?: string;
  headline?: string;
}

export default function CoinSearch(props: IProps): ReactElement {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ICoinListItem[]>([]);
  const history = useHistory();

  const coinListPath = coinListURL('coins/markets', 'eur', 10, 1).href;

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    if (inputValue.length > 0) {
      coinApi('get', coinListPath, setResults);
    } else {
      setResults([]);
    }
  };

  const onClick = (coin: ICoinListItem) => {
    setResults([]);
    setQuery('');
    history.push(`/cryptocurrencies/${coin.id}`);
  };

  // handle search query - return filtered results
  const filteredResults = results.filter((coin) =>
    coin.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {props.headline && <h2>{props.headline}</h2>}
      <div className={`ui search ${props.className}`}>
        <div className="ui icon input">
          <input
            value={query}
            onChange={onSearch}
            type="text"
            className="prompt"
          />
          <i className="search icon" />
        </div>
        {filteredResults.length > 0 && (
          <div className="results transition visible scrollable">
            {filteredResults.map((coin) => (
              <div
                onClick={() => onClick(coin)}
                key={coin.id}
                className="result"
              >
                <List verticalAlign="middle">
                  <List.Item>
                    <Image src={coin.image} size="tiny" />
                    <List.Content>
                      <List.Header>
                        {coin.name}{' '}
                        <small>
                          <span id="grey">{coin.symbol.toUpperCase()}</span>
                        </small>
                      </List.Header>
                    </List.Content>
                  </List.Item>
                </List>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
