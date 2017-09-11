//输入检查
function checkInput(input) {
    if (input === '') {
        return 'sum'
    }
    input = input.replace(/\s+/, ' ');
    var arr = input.split(' ');
    var reg1 = /^U\d{3}$/,                                          //userName
        reg2 = /^\d{4}-(0[1-9]|1[12])-(0[1-9]|[12][0-9]|3[01])$/,   //date
        reg3 = /^(09|1[0-9]|2[012]):00~(1[0-9]|2[012]):00$/,        //time
        reg4 = /^[ABCD]$/;                                          //place
    if (reg1.test(arr[0]) && reg2.test(arr[1]) && reg3.test(arr[2]) && reg4.test(arr[3]) && parseInt(arr[2]) < parseInt(arr[2].substr(6, 2))) {
        if (arr.length === 4) {
            return {
                user: arr[0],
                booking: true,
                place: arr[3],
                date: arr[1],
                fromTime: parseInt(arr[2]),
                toTime: parseInt(arr[2].substr(6, 2)),
                bookingStr: input.trim()
            }
        } else if (arr.length === 5 && arr[4] === 'C') {
            return {
                user: arr[0],
                booking: false,
                place: arr[3],
                date: arr[1],
                fromTime: parseInt(arr[2]),
                toTime: parseInt(arr[2].substr(6, 2)),
                bookingStr: input.trim()

            }
        }
    }
}
exports.checkInput = checkInput;