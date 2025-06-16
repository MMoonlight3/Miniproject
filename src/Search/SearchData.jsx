import axios from "axios";
import styles from "./SearchData.module.css";
import { useState } from "react";
// import { symbols } from "./multiplechart/multiplechart";


// 아저씨 figma부터 고치자
// 로그인 좀 ㄱㄷ
// 내 피그마는 멈췃는데
// 안 됨?
function SearchData({data,symbols,addSymbols}){
    const add = () => {
        if (symbols.length < 3){
            if (!symbols.includes(data.symbol))
                addSymbols([...symbols,data.symbol])
            else alert("이미 추가된 차트입니다.")
        }    
        else alert("차트는 3개까지 확인할 수 있습니다")
    }
    console.log(data.symbol,data)
    if (data.exchange == "NASDAQ" || data.exchange == "NYSE"){
        return(
        <div className={styles.container}>
            <div id={styles.searched}>{data.symbol} || {data.instrument_name}</div>
            <button onClick={add}>추가</button>
        </div>
    )
    }
    
}

export default SearchData;
