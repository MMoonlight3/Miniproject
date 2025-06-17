function getDate() {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  let date = today.getDate();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  let milli = today.getMilliseconds();

  let string = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}.${milli}`;
  // console.log(string); // 확인함
  return string;
}
function save(symbol, price, count, balance, act) {
  try {
    localStorage.setItem("money", String(balance));

    const storedLog = localStorage.getItem("log");
    let logData = storedLog ? JSON.parse(storedLog) : {};

    if (!logData[symbol]) {
      logData[symbol] = [0]; // 0번째 인덱스는 보유주식수
    }

    logData[symbol].push({
      date: getDate(),
      price: String(price),
      count: String(count),
      act: act,
    });
    
    if (act == 'B') {
      // 매수
      logData[symbol][0] += Number(count);
    }
    else if (act == 'S') {
      logData[symbol][0] -= Number(count);
    }

    localStorage.setItem("log", JSON.stringify(logData));
    console.log(`Log data for ${symbol} updated successfully.`);
  } catch (error) {
    console.error("Failed to save data to localStorage:", error);
  }
}


export function buy(symbol, price, count, totalMoney, setTotalMoney) {
  let totalCost = price * count;

  if (count <= 0) return -1;
  if (price <= 0) return -2;
  if (symbol == "") return -3;
  if (totalCost > totalMoney) return -4;

  const balance = totalMoney - totalCost;
  setTotalMoney(balance);
  save(symbol, price, count, balance, "B");
}



export function sell( symbol, price, count, totalMoney, setTotalMoney ) {
  let totalPrice = price * count;
  let storedLog = localStorage.getItem("log")
  let logData = storedLog ? JSON.parse(storedLog) : {};

  if (logData[symbol] == null) return -1;
  if (logData[symbol][0] < count) return -2;
  if (count <= 0) return -3;
  if (price <= 0) return -4;
  if (symbol == "") return -5;
  
  const balance = Number(totalMoney) + Number(totalPrice);
  setTotalMoney(balance);
  save(symbol, price, count, balance, "S");
}