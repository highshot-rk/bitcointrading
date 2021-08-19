// handle data for chart display
export function formatChartData(
  data: number[][]
): { timestamp: number; price: number }[] {
  return data.map((el) => {
    return {
      timestamp: el[0],
      price: +el[1].toFixed(2),
    };
  });
}