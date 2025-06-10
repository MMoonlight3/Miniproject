import { useEffect, useRef, useState } from "react";
import { createChart, LineSeries } from "lightweight-charts";
import axios from "axios";

// const symbols = "AAPL"

export const getData = async(symbol) => {
  try {
    const stockData = await axios.get(`https://api.twelvedata.com/time_series?symbol=${symbol},USD/KRW&interval=1min&apikey=0c0678b9920e4a64809872434b5973c5`)
    console.log(stockData)
    const values = stockData.data[symbol].values.reverse().map((item) => ({
      time: Math.floor(new Date(item.datetime).getTime() / 1000),
      value: parseFloat(item.close),
    }))
    return values;
  } catch (error) {
    console.log('주식 정보 불러오지 못 함',error)
  }

}
  const Drawcharts = ({symbol}) => {
    const containerRef = useRef()
    useEffect(() => {
      const setChart = async() => {
        const data = await getData(symbol)
        const chart = createChart(containerRef.current,{
          width: 500,
          height: 400,
        })
        
        const lineSeries = chart.addSeries(LineSeries, { color: '#2962FF' })
        lineSeries.setData(data)
        chart.timeScale().fitContent()
      }
      setChart()
    },[symbol])
    return (
      <div>
        <h2>{symbol}</h2>
        <div ref={containerRef}></div>
      </div>
  )
  }
  
  export default Drawcharts

  
  