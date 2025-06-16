import { useEffect, useRef, useState } from "react";
import { createChart, LineSeries } from "lightweight-charts";
import axios from "axios";
import styles from "./minichart.module.css"
// import { symbols } from "../multiplechart";


// const symbols = "AAPL"

export const getData = async(symbol) => {
  try {
    const stockData = await axios.get(`https://api.twelvedata.com/time_series?symbol=${symbol},USD/KRW&interval=1min&apikey=13143e1979c247f795e245449922f36a`)
    console.log(symbol,stockData)
    const values = stockData.data[symbol].values.reverse().map((item) => ({
      time: Math.floor(new Date(item.datetime).getTime() / 1000),
      value: parseFloat(item.close),
    }))
    return values;
  } catch (error) {
    console.log('주식 정보 불러오지 못 함',error)
  }
}

 function Drawcharts({symbol,symbols,setSymbols}){
  const remove = () =>{
      setSymbols(symbols.filter((s) => s !== symbol));;
  };
  // const [selectedSymbol, setSelectedSymbol] = useState(null);
  const containerRef = useRef()
  const chartRef = useRef()
  useEffect(() => {
    const setChart = async() => {
      const data = await getData(symbol)
      const chart = createChart(containerRef.current,{
        width: 400,
        height: 400,
        handleScroll: { mouseWheel: false, pressedMouseMove: false },
        handleScale: { axisPressedMouseMove: false, mouseWheel: false, pinch: false }
      })
      
      chartRef.current = chart.addSeries(LineSeries, { color: '#2962FF' })
      chartRef.current.setData(data)
      chart.timeScale().fitContent()
    }
    setChart()
    const interval = setInterval(async() => {
      const latest = await getData(symbol)

      chartRef.current.update(latest.at(-1))
    },60000)

    return() => {
      clearInterval(interval)
      if (chartRef.current) chartRef.current.remove()
      
    }
  },[symbol])


  return (
    <div className={styles.chart}>
    {/* <div>   */}
      <h2>{symbol}</h2>
      <div ref={containerRef}></div>
      <div className={styles.buttons}>
        <button>선택</button>
        <button onClick={remove}>제거</button>
      </div>
    </div>
)
}



export default Drawcharts


