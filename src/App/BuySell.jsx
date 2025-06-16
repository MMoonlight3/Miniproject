function getDate() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let milli = today.getMilliseconds();

    let string = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}.${milli}`
    console.log(string)
    return string
}

function save(head, key, value) {
    let data = JSON.parse(load(head))
    data[key]
}

function saveAs(key, value) {
    localStorage.setItem(key, value);
}

function load(key) {
    return localStorage.getItem(key);
}

export function buy({cost, count, totalMoney, setTotalMoney}) {
    const date = getDate();
    let totalCost = cost * count;
    
    if (totalCost > totalMoney) return -1;
    

    setTotalMoney(totalMoney - totalCost)
    
}

export function sell({cost, count, setTotalMoney}) {

}