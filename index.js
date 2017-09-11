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
var fee = require('./countFee');
var check = require('./checkInput');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt('');
rl.prompt();
//按行读取
rl.on('line', function (line) {
    var input = check.checkInput(line.trim());

    if (!input) {
        console.log('> Error: the booking is invalid!')
    } else {
        if (input === 'sum') {
            console.log('>收入汇总\n>---');
            console.log(fee.total(data));
            rl.close()
        } else {
            operate(input);
        }
    }
    rl.prompt()
});
rl.on('close', function () {
    process.exit(0)
});

//执行book/cancel操作
function operate(input) {
    if (input.booking) {
        switch (input.place) {
            case 'A':
                writeData_book(data.A, input);
                break;
            case 'B':
                writeData_book(data.B, input);

                break;
            case 'C':
                writeData_book(data.C, input);

                break;
            case 'D':
                writeData_book(data.D, input);
                break;
            default:
                break
        }
    } else {
        switch (input.place) {
            case 'A':
                writeData_cancel(data.A, input);
                break;
            case 'B':
                writeData_cancel(data.B, input);
                break;
            case 'C':
                writeData_cancel(data.C, input);
                break;
            case 'D':
                writeData_cancel(data.D, input);
                break;
            default:
                break
        }
    }
}

function writeData_cancel(A, input) {
    var i = 0, cancelStr = input.bookingStr.substr(0, input.bookingStr.length - 1).trim(),
        isExist = A.bookingInfo[cancelStr];
    if (isExist) {
        for (i = input.fromTime - 9; i < input.toTime - 9; i++)
            A.dateInfo[input.date][i] = 0;
        console.log('> Success: the booking is accepted!');
        delete A.bookingInfo[cancelStr];
        !A.canceled[cancelStr] ? A.canceled[cancelStr] = fee.getFee(input) / 2 : A.canceled[cancelStr] += fee.getFee(input) / 2
    } else
        console.log('> Error: the booking being cancelled does not existed!')
}

function writeData_book(A, input) {
    var i = 0;
    if (!A.dateInfo[input.date]) {
        var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = input.fromTime - 9; i < input.toTime - 9; i++)
            arr[i] = 1

        A.dateInfo[input.date] = arr;
        if (!A.bookingInfo[input.bookingStr])
            A.bookingInfo[input.bookingStr] = fee.getFee(input);
        console.log("> Success: the booking is accepted!")
    } else {
        for (i = input.fromTime - 9; i < input.toTime - 9; i++) {
            if (A.dateInfo[input.date][i] === 1) {
                console.log('> Error: the booking being conflicts with existing bookings!');
                return
            }
        }
        for (i = input.fromTime - 9; i < input.toTime - 9; i++)
            A.dateInfo[input.date][i] = 1
        A.bookingInfo[input.bookingStr] = fee.getFee(input);
        console.log("> Success: the booking is accepted!")
    }
}

// console.log(checkInput('U120 2016-06-02 20:00~22:00 A'));