var readline = require('readline');
var rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

rl.setPrompt('input>');
rl.prompt();

rl.on('line',function (line) {
    switch (line.trim()){
        case '1':
            console.log('you input is 1');
            break;
        case '0':
            console.log('logging out...');
            rl.close();
            break
    }
    rl.prompt()
});
rl.on('close',function () {
    process.exit(0)
})

