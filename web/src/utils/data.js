function formatDate(){
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    month = month > 9 ? month : '0' + month
    let day = date.getDate()
    day = day > 9 ? day : '0' + day
    let hour = date.getHours()
    hour = hour > 9 ? hour : '0' + hour
    let min = date.getMinutes()
    min = min > 9 ? min : '0' + min
    let sec = date.getSeconds()
    sec = sec > 9 ? sec : '0' + sec
    let str = `${year}-${month}-${day}  ${hour}:${min}:${sec}`
    return str
}
export default formatDate