import { useEffect, useRef } from "react";
import { createChart, LineSeries } from "lightweight-charts";
import axios from "axios";
import styles from "./minichart.module.css";

export const getData = async (symbol, setPrice) => {
  try {
    const stockData = await axios.get(
      `https://api.twelvedata.com/time_series?symbol=${symbol},USD/KRW&interval=1min&apikey=13143e1979c247f795e245449922f36a`
    );
    console.log(symbol, stockData);
    setPrice(
      Math.floor(
        Number(stockData.data["USD/KRW"].values[0].close) *
          Number(stockData.data[symbol].values[0].close)
      )
    );
    const values = stockData.data[symbol].values.reverse().map((item) => ({
      time: Math.floor(new Date(item.datetime).getTime() / 1000),
      value: parseFloat(item.close),
    }));
    return values;
  } catch (error) {
    console.log("주식 정보 불러오지 못 함", error);
  }
};

function Drawcharts({ symbol, symbols, setSymbols, setSymbol, setPrice }) {
  const remove = () => {
    setSymbols(symbols.filter((s) => s !== symbol));
  };

  const containerRef = useRef();
  const chartInstanceRef = useRef(null);
  const lineSeriesRef = useRef(null);

  useEffect(() => {
    const setChart = async () => {
      const data = await getData(symbol, setPrice);
      const chart = createChart(containerRef.current, {
        width: 400,
        height: 400,
        handleScroll: { mouseWheel: false, pressedMouseMove: false },
        handleScale: {
          axisPressedMouseMove: false,
          mouseWheel: false,
          pinch: false,
        },
      });

      chartInstanceRef.current = chart;
      lineSeriesRef.current = chart.addSeries(LineSeries, { color: "#2962FF" });
      lineSeriesRef.current.setData(data);
      chart.timeScale().fitContent();
    };
    setChart();

    const interval = setInterval(async () => {
      const latest = await getData(symbol, setPrice);
      if (lineSeriesRef.current && latest && latest.length > 0) {
        lineSeriesRef.current.update(latest.at(-1));
      }
    }, 60000);

    return () => {
      clearInterval(interval);
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose();
      }
    };
  }, [symbol, setPrice]);

  return (
    <div className={styles.chart}>
      <h2>{symbol}</h2>
      <div ref={containerRef}></div>
      <div className={styles.buttons}>
        <button onClick={() => setSymbol(symbol)}>선택</button>
        <button onClick={remove}>제거</button>
      </div>
    </div>
  );
}

export default Drawcharts;