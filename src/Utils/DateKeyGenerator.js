// this method will generate the date key based on the format: 10 May 2019 -> 20190510
const dateKeyGenerator = (date) => {
    const year = date.getFullYear();
    // month is from 0-11, so we plus 1
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if (month < 10) {
        if (day < 10) {
            return year + '0' +month + '0' + day;
        } else {
            return year + '0' +month + day;
        }
    } else {
        return '' + year + month + day;
    }
}

export default dateKeyGenerator;