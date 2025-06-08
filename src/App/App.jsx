import MiniChartWidget from "../MultipleChart/MiniChart/MiniChart.jsx"; // 미니 차트 위젯 컴포넌트 가지고오는거
import Multiplechart from "../multiplechart/multiplechart";
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
  const handleChange = (e) => { {/* input이 바뀔 때 실행됨됨 */}
    const value = e.target.value;
    if (/^\d*$/.test(value)) { {/* 숫자만 있는 문자인지 확인 */}
      setCount(value === "" ? "" : parseInt(value));
    }
  };

  const ifNone = () => {
    if (count === "") setCount(0);
  };

  return (
    // 화면 전체를 감싸는 div
    <div className={styles.App}>
      <div className={styles.chartContainer}>
        <Multiplechart />
      </div>
      <div className= {styles.interfaceContainer}>
        <h2 id={styles.money}>총 자산 : 100000000000</h2>
        <h3>필요 자산 : 뭐시기</h3>
        <h3>이익 : 뭐시기</h3>
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