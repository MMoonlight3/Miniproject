import MiniChart from "./minichart"; // 미니 차트 위젯 컴포넌트 가지고오는거
import Multipulchart from "./multipulchart";

function App() {
 
  return (
    // 화면 전체를 감싸는 div
    <div className="App">
      <h1>미니차트</h1> 
      <MiniChart /> 
      <Multipulchart />
    </div>
  );
}

export default App; 
