import axios from "axios";
import Multiplechart from "../multiplechart/multiplechart";
import styles from "./App.module.css";
import Drawcharts from "../multiplechart/MiniChart/MiniChart";
import { getData } from "../multiplechart/MiniChart/MiniChart";
import { useEffect, useState } from "react";
import SearchData from "../Search/SearchData";
// import BuySell from "./BuySell";
import { buy } from "./BuySell.jsx";
import { sell } from "./BuySell.jsx";

function App() {
  const [count, setCount] = useState(0);
  const [symbols, setSymbols] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [searchData, setSearchData] = useState([]);
  // const [searchData,searched] = useState("")
  const [text, setText] = useState("");
  const [totalMoney, setTotalMoney] = useState(1000000);
  const [price, setPrice] = useState(0); //  주식 가격을 여기다가 저장해줘

  // localStorage 값 가져오기
  
  useEffect(function () {
    let money = localStorage.getItem("money")
    if (money != null) setTotalMoney(money);
  })

  const onChange = (e) => {
    setText(e.target.value);
  };
  const search = async () => {
    try {
      const response = await axios.get(
        `https://api.twelvedata.com/symbol_search?symbol=${text}&apikey=0c0678b9920e4a64809872434b5973c5`
      );
      // console.log(text, response.data.data);
      setSearchData(response.data.data);
      // addSymbols(...symbols,searchData)/
    } catch (error) {
      console.log("에러", err);
    }
  };
  const searchKeyDown = (event) => {
    // console.log(event.key);
    if (event.key === "Enter") {
      search();
    }
  };

  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count > 0 ? count - 1 : 0);
  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      { /* 숫자만 있는 문자인지 확인 */ }
      setCount(value === "" ? 0 : parseInt(value));
    }
  };

  const checkInputValue = (event) => {
    const counterValue = document.getElementById(styles.counterValue);
    if (event.target.value === "") {
      counterValue.innerHTML = "0";
      setCount(0);
    }
  };

  return (
    // 화면 전체를 감싸는 div
    <div className={styles.App}>
      <div className={styles.chartContainer}>
        <h1 id={styles.title}>Stock Simulator</h1>
        <Multiplechart
          symbols={symbols}
          setSymbols={setSymbols}
          setSymbol={setSymbol}
          setPrice={setPrice}
        />
      </div>
      <div className={styles.interfaceContainer}>
        <div id={styles.money}>총 자산 : {totalMoney}</div>
        <div className={styles.tradeContainer}>
          <div className={styles.functionContainer}>
            <div className={styles.counterContainer}>
              <button id={styles.counterButton} onClick={decrease}>
                -
              </button>
              <input
                id={styles.counterValue}
                value={count}
                onChange={handleChange}
                onBlur={checkInputValue}
              ></input>
              <button id={styles.counterButton} onClick={increase}>
                +
              </button>
            </div>
            {/* <div id={styles.cost}>{count * }원</div> */}
            <button
              id={styles.buy}
              onClick={() =>
                  buy(symbol, price, count, totalMoney, setTotalMoney)
              }
            >
              매수
            </button>
            <button id={styles.sell}>매도</button>
          </div>
          <div className={styles.searchContainer}>
            <div>
              <input
                id={styles.searchInput}
                placeholder="주식 검색"
                onKeyDown={searchKeyDown}
                onChange={onChange}
              ></input>
              <button id={styles.searchButton} onClick={search}>
                검색
              </button>
            </div>
            <div className={styles.searchResult}>
              {searchData.map((data, item) => (
                <SearchData
                  key={item}
                  data={data}
                  symbols={symbols}
                  addSymbols={setSymbols}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
