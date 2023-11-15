const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

accountA = 20;
accountB = 10;

function retrieveBalance() {
    console.log(accountA);
}

function withdraw() {
    amount = [2, 5, 10, 50, 100];
    if (amount > accountA) {
        console.log("Insufficient balance");
    }
    else {
        accountA = accountA - amount;
        console.log(account);
    }

}

function deposit() {
    rl.question('How much would you like to deposit? ', (answer) => {
        const number = parseInt(answer);
        accountA = number + accountA
        Console.log(account);
        rl.close();
    })
}

function fundTransfer() {

}

function bankStatement() {

}

module.exports = {
    retrieveBalance,
    withdraw,
    deposit,
    fundTransfer,
    bankStatement
}

retrieveBalance();
deposit();
