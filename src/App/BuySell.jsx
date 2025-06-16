function getDate() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();

    let string = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
    console.log(string)
    return string
}

/** cost는 원화로 주셔야됩니다. */
export function buy({cost, count, totalMoney}) {
    const date = getDate();
    let totalCost = cost * count;
    if (totalCost > totalMoney) return -1;
    if ()
}

export function sell({cost, count, setTotalMoney}) {

}