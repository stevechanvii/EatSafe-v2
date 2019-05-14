// this method will generate the date key based on the format: 10 May 2019 -> 20190510
// import this file, then use fileName(date) to call this function
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
        if (day < 10) {
            return '' + year + month + '0' + day;
        } else {
            return '' + year + month + day;
        }
    }
}

// month and year need to be number, e.g. monthKeyGenerator(5, 2019), if today is 6 May 2019, 
// this method will generate a list of [20190501, 20190502, 20190503, 20190504, 20190505, 20190506],
// if today is 6 Jun 2019, it will generate [20190501, ... , 20190531]
monthKeyGenerator = (month, year) => {
    const currentDate = new Date();
    const dateKeyList = [];
    // if current month, not need to generate future
    if (year === currentDate.getFullYear() && month === currentDate.getMonth() + 1) {
        for (let i = 1; i <= currentDate.getDate(); i++) {
            dateKeyList.push('' + year + (month < 10 ? '0' + month : month) + (i < 10 ? '0' + i : i));
        }
    } else {
        for (let i = 1; i <= new Date(year, month, 0).getDate(); i++) {
            dateKeyList.push('' + year + (month < 10 ? '0' + month : month) + (i < 10 ? '0' + i : i));
        }
    }
    return dateKeyList;
}

export default {dateKeyGenerator, monthKeyGenerator};