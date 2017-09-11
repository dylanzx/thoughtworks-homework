//计算费用总和。
function total(data) {
    var str1 = (sum(data.A, 'A').str + '\n>\n' + sum(data.B, 'B').str + '\n>\n' + sum(data.C, 'C').str + '\n>\n' + sum(data.D, 'D').str);
    var str2 = ('\n>---\n>' + '总计：' + (sum(data.A, 'A').money + sum(data.B, 'B').money + sum(data.C, 'C').money + sum(data.D, 'D').money) + '元');
    return str1 + str2
}

function getFee(input) {
    var day = (new Date(input.date)).getDay();
    if (day === 0 || day === 6) {
        //周六或周日
        if (input.fromTime < 12) {
            if (input.toTime <= 12) {
                return (input.toTime - input.fromTime) * 40
            } else if (input.toTime <= 18) {
                return (12 - input.fromTime) * 40 + (input.toTime - 12) * 50
            } else {
                return (12 - input.fromTime) * 40 + 6 * 50 + (input.toTime - 18) * 60
            }
        } else if (input.fromTime <= 18) {
            return input.toTime <= 18 ? (input.toTime - input.fromTime) * 50 : (18 - input.fromTime) * 50 + (input.toTime - 18) * 60
        } else {
            return (input.toTime - input.fromTime) * 60
        }
    } else {
        //周一到周五
        if (input.fromTime <= 12) {
            if (input.toTime <= 12) {
                return (input.toTime - input.fromTime) * 30
            } else if (input.toTime <= 18) {
                return (12 - input.fromTime) * 30 + (input.toTime - 12) * 50
            } else if (input.toTime <= 20) {
                return (12 - input.fromTime) * 30 + 6 * 50 + (input.toTime - 18) * 80
            } else {
                return (12 - input.fromTime) * 30 + 6 * 50 + 2 * 80 + (input.toTime - 20) * 60
            }
        } else if (input.fromTime <= 18) {
            if (input.toTime <= 18) {
                return (input.toTime - input.fromTime) * 50
            } else if (input.toTime <= 20) {
                return (18 - input.fromTime) * 50 + (input.toTime - 18) * 80
            } else {
                return (18 - input.fromTime) * 50 + 2 * 80 + (input.toTime - 20) * 60
            }
        } else if (input.fromTime <= 20) {
            return input.toTime <= 20 ? (input.toTime - input.fromTime) * 80 : (20 - input.fromTime) * 80 + (input.toTime - 20) * 60
        } else {
            return (input.toTime - input.fromTime) * 60
        }
    }
}

//计算每块场地的费用(包括预订成功和取消预订)。
function sum(A, a) {
    a = '>场地：' + a;
    var arr = [a];
    var money = 0, money_regret = 0;
    for (var item in A.bookingInfo) {
        money += A.bookingInfo[item];
        arr.push('>' + item.slice(5, 28) + A.bookingInfo[item] + '元')
    }
    for (item in A.canceled) {
        money_regret += A.canceled[item];
        arr.push('>' + item.slice(5, 28) + '违约金 ' + A.canceled[item] + '元')
    }
    arr.push('>小计: ' + (money + money_regret) + '元');
    return {
        str: arr.join('\n'),
        money: money_regret + money
    }
}

exports.getFee = getFee;
exports.total = total;