//全局变量，用于场馆保存预约信息，保存收入情况。
var data = {
    A: {
        bookingInfo: {
            //    'U120 2016-06-02 20:00~22:00 A': 60
        },
        canceled: {
            //    'U120 2016-06-02 20:00~22:00 A': 60
        },
        dateInfo: {
            // '2006-06-02': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            // '2006-06-03': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    },
    B: {
        bookingInfo: {},
        canceled: {},
        dateInfo: {}
    },
    C: {
        bookingInfo: {},
        canceled: {},
        dateInfo: {}
    },
    D: {
        bookingInfo: {},
        canceled: {},
        dateInfo: {}
    }
};
//输入模块
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt('');
rl.prompt();
//按行读取
rl.on('line', function (line) {
    var input = checkInput(line.trim());

    if (!input) {
        console.log('> Error: the booking is invalid!')
    } else {
        if (input === 'sum') {
            console.log('>收入汇总\n>---');
            total(data);
            rl.close()
        } else {
            calculator(input);
        }
    }

    rl.prompt()
});
rl.on('close', function () {
    process.exit(0)
});

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
    if (reg1.test(arr[0]) && reg2.test(arr[1]) && reg3.test(arr[2]) && reg4.test(arr[3])) {

        if (parseInt(arr[2]) < parseInt(arr[2].substr(6, 2))) {
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
}

//计算
function calculator(input) {
    var i = 0;
    if (input.booking) {
        switch (input.place) {
            case 'A':
                if (!data.A.dateInfo[input.date]) {
                    var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    for (i = input.fromTime - 9; i < input.toTime - 9; i++) {
                        arr[i] = 1
                    }
                    data.A.dateInfo[input.date] = arr;
                    if (!data.A.bookingInfo[input.bookingStr]) {
                        data.A.bookingInfo[input.bookingStr] = countFree(input)
                    }
                    console.log("> Success: the booking is accepted!");
                    return
                } else {
                    for (i = input.fromTime - 9; i < input.toTime - 9; i++) {
                        if (data.A.dateInfo[input.date][i] === 1) {
                            console.log('> Error: the booking being conflicts with existing bookings!');
                            return
                        }
                    }
                    for (i = input.fromTime - 9; i < input.toTime - 9; i++) {
                        data.A.dateInfo[input.date][i] = 1;
                    }
                    data.A.bookingInfo[input.bookingStr] = countFree(input);
                    console.log("> Success: the booking is accepted!");
                }
                break;
            case 'B':
                if (!data.B.dateInfo[input.date]) {
                    arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    for (i = input.fromTime - 9; i < input.toTime - 9; i++) {
                        arr[i] = 1
                    }
                    data.B.dateInfo[input.date] = arr;
                    if (!data.B.bookingInfo[input.bookingStr]) {
                        data.B.bookingInfo[input.bookingStr] = countFree(input)
                    }
                    console.log("> Success: the booking is accepted!");
                    return
                } else {
                    for (i = input.fromTime - 9; i < input.toTime - 9; i++) {
                        if (data.B.dateInfo[input.date][i] === 1) {
                            console.log('> Error: the booking being conflicts with existing bookings!');
                            return
                        }
                    }
                    for (i = input.fromTime - 9; i < input.toTime - 9; i++) {
                        data.B.dateInfo[input.date][i] = 1;
                    }
                    data.B.bookingInfo[input.bookingStr] = countFree(input);
                    console.log("> Success: the booking is accepted!");
                }
                break;
            case 'C':
                if (!data.C.dateInfo[input.date]) {
                    arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    for (i = input.fromTime - 9; i < input.toTime - 9; i++) {
                        arr[i] = 1
                    }
                    data.C.dateInfo[input.date] = arr;
                    if (!data.C.bookingInfo[input.bookingStr]) {
                        data.C.bookingInfo[input.bookingStr] = countFree(input)
                    }
                    console.log("> Success: the booking is accepted!");
                    return
                } else {
                    for (i = input.fromTime - 9; i < input.toTime - 9; i++) {
                        if (data.C.dateInfo[input.date][i] === 1) {
                            console.log('> Error: the booking being conflicts with existing bookings!');
                            return
                        }
                    }
                    for (i = input.fromTime - 9; i < input.toTime - 9; i++) {
                        data.C.dateInfo[input.date][i] = 1;
                    }
                    data.C.bookingInfo[input.bookingStr] = countFree(input);
                    console.log("> Success: the booking is accepted!");
                }
                break;
            case 'D':
                if (!data.D.dateInfo[input.date]) {
                    arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    for (i = input.fromTime - 9; i < input.toTime - 9; i++) {
                        arr[i] = 1
                    }
                    data.D.dateInfo[input.date] = arr;
                    if (!data.D.bookingInfo[input.bookingStr]) {
                        data.D.bookingInfo[input.bookingStr] = countFree(input)
                    }
                    console.log("> Success: the booking is accepted!");
                    return
                } else {
                    for (i = input.fromTime - 9; i < input.toTime - 9; i++) {
                        if (data.D.dateInfo[input.date][i] === 1) {
                            console.log('> Error: the booking being conflicts with existing bookings!');
                            return
                        }
                    }
                    for (i = input.fromTime - 9; i < input.toTime - 9; i++) {
                        data.D.dateInfo[input.date][i] = 1;
                    }
                    data.D.bookingInfo[input.bookingStr] = countFree(input);
                    console.log("> Success: the booking is accepted!");
                }
                break;
            default:
                break
        }
    } else {
        var cancelStr = input.bookingStr;
        switch (input.place) {
            case 'A':
                var isExist = data.A.bookingInfo[cancelStr.substr(0, cancelStr.length - 1).trim()];

                if (isExist) {
                    for (i = input.fromTime - 9; i < input.toTime - 9; i++)
                        data.A.dateInfo[input.date][i] = 0;
                    console.log('> Success: the booking is accepted!');
                    delete data.A.bookingInfo[cancelStr.substr(0, cancelStr.length - 1).trim()];
                    if (!data.A.canceled[cancelStr.substr(0, cancelStr.length - 1).trim()]) {
                        data.A.canceled[cancelStr.substr(0, cancelStr.length - 1).trim()] = countFree(input) / 2
                    } else {
                        data.A.canceled[cancelStr.substr(0, cancelStr.length - 1).trim()] += countFree(input) / 2
                    }
                } else
                    console.log('> Error: the booking being cancelled does not existed!')
                break;
            case 'B':
                isExist = data.B.bookingInfo[cancelStr.substr(0, cancelStr.length - 1).trim()];
                if (isExist) {
                    for (i = input.fromTime - 9; i < input.toTime - 9; i++) {
                        data.B.dateInfo[input.date][i] = 0;
                    }
                    console.log('> Success: the booking is accepted!');
                    delete data.B.bookingInfo[cancelStr.substr(0, cancelStr.length - 1).trim()];
                    if (!data.B.canceled[cancelStr.substr(0, cancelStr.length - 1).trim()]) {
                        data.B.canceled[cancelStr.substr(0, cancelStr.length - 1).trim()] = countFree(input) / 2
                    } else {
                        data.B.canceled[cancelStr.substr(0, cancelStr.length - 1).trim()] += countFree(input) / 2
                    }
                } else
                    console.log('> Error: the booking being cancelled does not existed!')
                break;
            case 'C':
                isExist = data.C.bookingInfo[cancelStr.substr(0, cancelStr.length - 1).trim()];

                if (isExist) {
                    for (i = input.fromTime - 9; i < input.toTime - 9; i++) {
                        data.C.dateInfo[input.date][i] = 0;
                    }
                    console.log('> Success: the booking is accepted!');
                    delete data.C.bookingInfo[cancelStr.substr(0, cancelStr.length - 1).trim()];
                    if (!data.C.canceled[cancelStr.substr(0, cancelStr.length - 1).trim()]) {
                        data.C.canceled[cancelStr.substr(0, cancelStr.length - 1).trim()] = countFree(input) / 2
                    } else {
                        data.C.canceled[cancelStr.substr(0, cancelStr.length - 1).trim()] += countFree(input) / 2
                    }
                } else
                    console.log('> Error: the booking being cancelled does not existed!');
                break;
            case 'D':
                isExist = data.D.bookingInfo[cancelStr.substr(0, cancelStr.length - 1).trim()];
                if (isExist) {
                    for (i = input.fromTime - 9; i < input.toTime - 9; i++) {
                        data.D.dateInfo[input.date][i] = 0;
                    }
                    console.log('> Success: the booking is accepted!');
                    delete data.D.bookingInfo[cancelStr.substr(0, cancelStr.length - 1).trim()];
                    if (!data.D.canceled[cancelStr.substr(0, cancelStr.length - 1).trim()]) {
                        data.D.canceled[cancelStr.substr(0, cancelStr.length - 1).trim()] = countFree(input) / 2
                    } else {
                        data.D.canceled[cancelStr.substr(0, cancelStr.length - 1).trim()] += countFree(input) / 2
                    }
                } else
                    console.log('> Error: the booking being cancelled does not existed!');
                break;
        }
    }
}

//计算费用。
function countFree(input) {
    var day = (new Date(input.date)).getDay();
    if (day === 0 || day === 6) {
        //周六或周日
        if (input.fromTime < 12) {
            if (input.toTime <= 12) {
                return (input.toTime - input.fromTime) * 40;
            } else if (input.toTime <= 18) {
                return (12 - input.fromTime) * 40 + (input.toTime - 12) * 50
            } else {
                return (12 - input.fromTime) * 40 + 6 * 50 + (input.toTime - 18) * 60
            }
        } else if (input.fromTime <= 18) {
            if (input.toTime <= 18) {
                return (input.toTime - input.fromTime) * 50;
            } else {
                return (18 - input.fromTime) * 50 + (input.toTime - 18) * 60
            }
        } else {
            return (input.toTime - input.fromTime) * 60;
        }
    } else {
        //周一到周五
        if (input.fromTime <= 12) {
            if (input.toTime <= 12) {
                return (input.toTime - input.fromTime) * 30;
            } else if (input.toTime <= 18) {
                return (12 - input.fromTime) * 30 + (input.toTime - 12) * 50
            } else if (input.toTime <= 20) {
                return (12 - input.fromTime) * 30 + 6 * 50 + (input.toTime - 18) * 80
            } else {
                return (12 - input.fromTime) * 30 + 6 * 50 + 2 * 80 + (input.toTime - 20) * 60
            }
        } else if (input.fromTime <= 18) {
            if (input.toTime <= 18) {
                return (input.toTime - input.fromTime) * 50;
            } else if (input.toTime <= 20) {
                return (18 - input.fromTime) * 50 + (input.toTime - 18) * 80
            } else {
                return (18 - input.fromTime) * 50 + 2 * 80 + (input.toTime - 20) * 60
            }
        } else if (input.fromTime <= 20) {
            if (input.toTime <= 20) {
                return (input.toTime - input.fromTime) * 80;
            } else {
                return (20 - input.fromTime) * 80 + (input.toTime - 20) * 60
            }
        } else {
            return (input.toTime - input.fromTime) * 60;
        }
    }
}


function total(data) {
    console.log(sum(data.A, 'A').str + '\n>\n' + sum(data.B, 'B').str + '\n>\n' + sum(data.C, 'C').str + '\n>\n' + sum(data.D, 'D').str);
    console.log('>---\n>' + '总计：' + (sum(data.A, 'A').money + sum(data.B, 'B').money + sum(data.C, 'C').money + sum(data.D, 'D').money) + '元')
}

function sum(A, a) {
    a = '>场地：' + a;
    var arr = [a];
    var money = 0, money_regret = 0;
    for (var item in A.bookingInfo) {
        money += A.bookingInfo[item];
        arr.push('>' + item.slice(5, 28) + ' ' + A.bookingInfo[item] + '元')
    }
    for (item in A.canceled) {
        money_regret += A.canceled[item];
        arr.push('>' + item.slice(5, 28) + ' 违约金 ' + A.canceled[item] + '元')
    }
    arr.push('>小计: ' + (money + money_regret) + '元');
    return {
        str: arr.join('\n'),
        money: money_regret + money
    }
}
// console.log(checkInput('U120 2016-06-02 20:00~22:00 A A'));