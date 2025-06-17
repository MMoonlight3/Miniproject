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
      logData[symbol] = [];
    }

    logData[symbol].push({
      date: getDate(),
      price: String(price),
      count: String(count),
      act: act,
    });

    localStorage.setItem("log", JSON.stringify(logData));
    console.log(`Log data for ${symbol} updated successfully.`);
  } catch (error) {
    console.error("Failed to save data to localStorage:", error);
  }
}

function load(key) {
  return localStorage.getItem(key);
}

export function buy(symbol, price, count, totalMoney, setTotalMoney) {
  const date = getDate();
  let totalCost = price * count;

  if (count <= 0) return -1;
  if (price <= 0) return -1;
  if (symbol == "") return -1;
  if (totalCost > totalMoney) return -1;

  const balance = totalMoney - totalCost;
  setTotalMoney(balance);
  save(symbol, price, count, balance, "B");
}

export function sell({ price, count, setTotalMoney }) {}