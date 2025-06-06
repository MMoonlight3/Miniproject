import { useEffect, useRef } from "react";

const MiniChartWidget = ({ symbol, width = 500, height = 300 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!symbol) return; // symbol 없으면 차트 생성 안 함

    // 이미 위젯 스크립트가 있으면 다시 불러오지 않음
    if (containerRef.current && containerRef.current.querySelector("script")) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;

    // 위젯 설정 JSON 문자열로 변환해서 스크립트에 넣음
    script.innerHTML = JSON.stringify({
      symbol: symbol,          // 표시할 주식 심볼 (필수)
      width: width,            // 차트 가로 크기 (기본 500)
      height: height,          // 차트 세로 크기 (기본 300)
      locale: "kr",            // 한국어 설정
      dateRange: "1D",         // 12개월 데이터 표시
      colorTheme: "light",     // 밝은 테마 사용
      trendLineColor: "#2196F3", // 선 색상 
      underLineColor: "rgba(33, 150, 243, 0.15)", // 차트 아래 색상
      isTransparent: false,    // 배경 투명 여부
      autosize: false,         // 컨테이너에 맞춰 크기 자동 조절 여부
      largeChartUrl: ""        // 위젯 클릭 시 이동할 링크 (설정 안함)
    });

    // 위젯을 담을 div에 스크립트 추가
    containerRef.current.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거해서 정리
    return () => {
      if (containerRef.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
      }
    };
  }, [symbol, width, height]); // symbol, width, height 변경 시 다시 실행

  return (
    <div
      className="tradingview-widget-container"
      ref={containerRef}
      style={{ marginBottom: 20 }} // 차트 아래 여백 추가
    >
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default MiniChartWidget;