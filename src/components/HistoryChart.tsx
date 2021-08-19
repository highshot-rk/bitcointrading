import React, { ReactElement, useState } from 'react';
import { useCoinApi } from '../shared/CoinApi';
import { formatChartData } from '../helpers/FormatChartData';
import ICoinHistory from '../types/ICoinHistory';
import { VictoryChart, VictoryAxis, VictoryTheme, VictoryLine } from 'victory';
import { Button } from 'semantic-ui-react';
import LoadingSpinner from './LoadingSpinner';
import { coinHistoryURL } from '../shared/URLBuilder';

interface IProps {
  coinId: string;
}

export default function HistoryChart(props: IProps): ReactElement {
  const coinId = props.coinId;
  const [days, setDays] = useState(7);

  const historyURL = coinHistoryURL('coins', coinId, days).href;
  const coinHistory = useCoinApi<ICoinHistory>('GET', historyURL)[0];

  if (!coinHistory) return <LoadingSpinner name="data" />;

  const coinPrices = formatChartData(coinHistory.prices);

  const timeFormatting = (timestamp: number): string | number => {
    return new Date(timestamp).toLocaleDateString();
  };

  const currencyFormatting = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'Eur',
  });

  return (
    <>
      <Button.Group compact floated="right" size="small">
        <Button onClick={() => setDays(1)}>24h</Button>
        <Button onClick={() => setDays(7)}>7d</Button>
        <Button onClick={() => setDays(14)}>14d</Button>
        <Button onClick={() => setDays(30)}>30d</Button>
        <Button onClick={() => setDays(90)}>90d</Button>
        <Button onClick={() => setDays(180)}>180d</Button>
        <Button onClick={() => setDays(365)}>1y</Button>
      </Button.Group>
      <VictoryChart
        height={150}
        width={300}
        padding={{ top: 20, bottom: 35, left: 40, right: 20 }}
        domainPadding={5}
        theme={VictoryTheme.material}
        animate={{
          duration: 3000,
          onLoad: { duration: 1000 },
        }}
      >
        <VictoryAxis
          style={{
            axis: { stroke: 'grey', strokeWidth: 2 },
            ticks: { stroke: 'orange' },
            tickLabels: { fontSize: 6 },
          }}
          orientation="bottom"
          tickFormat={timeFormatting}
        ></VictoryAxis>
        <VictoryAxis
          style={{
            axis: { stroke: 'grey', strokeWidth: 2 },
            ticks: { stroke: 'orange' },
            tickLabels: { fontSize: 5 },
          }}
          dependentAxis
          orientation="left"
          tickFormat={(x) => `${currencyFormatting.format(x)}`}
          label=""
          standalone={true}
        ></VictoryAxis>
        <VictoryLine
          style={{
            data: {
              stroke: 'green',
              strokeWidth: 0.5,
            },
            labels: { fontSize: 6 },
            parent: { border: '1px solid #ccc' },
          }}
          data={coinPrices}
          x="timestamp"
          y="price"
        />
      </VictoryChart>
    </>
  );
}
