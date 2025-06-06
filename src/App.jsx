import MiniChart from "./minichart"; // 미니 차트 위젯 컴포넌트 가지고오는거
import Multiplechart from "./multiplechart/multiplechart";
import styles from "./App.module.css";
import { useState } from "react";

/*
변수명 작명법
예시: testContainer
1. test_container // 풀네임으로 쓰기
2. testContainer // 풀네임으로 쓰기
3. tstContainer // 줄여서 쓰기

*/

function App() {
 const [count, setCount] = useState(0);

const increment = () => setCount(count + 1);
const decrement = () => setCount(count > 0 ? count - 1 : 0);
const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCount(value === "" ? "" : value);
    }
  };

  const ifNone = () => {
    if (count === "") setCount(0);
  };

  return (
    // 화면 전체를 감싸는 div
    <div className={styles.App}>
      {/* <MiniChart />  */} {/* 이거 대체 정체가 뭐임?? */}
      <div className={styles.chartContainer}>
        <Multiplechart />
      </div>
      <div className= {styles.interfaceContainer}>
        <h2 id={styles.money}>총 자산: 100000000000</h2>
        <div className={styles.functionContainer}>
          <div className={styles.counterContainer}>
            <button id={styles.counterButton} onClick={decrement}>-</button>
            <input id={styles.counterValue} value={count} onChange={handleChange} onBlur={ifNone}></input>
            <button id={styles.counterButton} onClick={increment}>+</button>
          </div>
          <button id = {styles.buy}>매수</button>
          <button id = {styles.sell}>매도</button>
        </div>
        <table>
          
        </table>
      </div>
    </div>
  );
}

export default App; 