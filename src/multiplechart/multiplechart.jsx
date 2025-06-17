// MiniChartWidget 컴포넌트를 가져옴 (단일 종목 차트)
// import Charts from "./MiniChart/MiniChart.jsx";
import styles from "./multiplechart.module.css";
import Drawcharts from "./MiniChart/MiniChart.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
// import { getData } from "./MiniChart/MiniChart.jsx";
// import { symbols } from "../SearchData.jsx";
// 보여줄 종목 리스트 (심볼 코드 배열)
// const symbols = [
//   "NASDAQ:TSLA",
//   "NASDAQ:GOOGL",
//   "NASDAQ:AAPL",
//   "KOSDAQ",
//   "BTCUSD",
//   "KQ:035720",
// ];

// 여러 개의 미니 차트를 렌더링하는 컴포넌트
const Multipulchart = ({ symbols, setSymbols, setSymbol, setPrice }) => {
  if (!symbols) return;
  return (
    // 차트들을 가로로 정렬하고, 줄바꿈 허용 + 간격 20px
    <div className={styles.charts}>
      {/* 종목 배열을 반복하면서 각 종목마다 차트 컴포넌트 생성 */}
      {symbols.map((symbol) => (
        <Drawcharts
          key={symbol}
          symbols={symbols}
          symbol={symbol}
          setSymbols={setSymbols}
          setSymbol={setSymbol}
          setPrice={setPrice}
        />
      ))}
    </div>
  );
};

export default Multipulchart;
