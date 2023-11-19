const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const currentDate = new Date();

const formatter = new Intl.DateTimeFormat('en-SG', {
    day: 'numeric',
    month: 'short', // Only first 3 letters of the month
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false, // Use 24-hour format
});

const formattedDateTime = formatter.format(currentDate);

// Main account balance
let accountA = 20;

// Account used to trasnfer funds to
let accountB = 10;

// Array of bank statement
let statements = [
    {
        Transaction: 'Deposit',
        Amount: 20,
        DateTime: '17 Nov 2023, 22:58'
    },
    {
        Transaction: 'Withdraw',
        Amount: 10,
        DateTime: '18 Nov 2023, 07:26'

    },
    {
        Transaction: 'Fund Transfer',
        Amount: 5,
        DateTime: '19 Nov 2023, 13:37'
    }];


// Function to display balance of accountA 
function retrieveBalance() {
    console.log("Your current balance is: " + accountA);
}


// Function to withdraw cash from accountA
function withdraw() {
    return new Promise((resolve) => {
        // User will need to choose either 10 or 50 for withdrawal amount
        rl.question('How much would you like to withdraw? Please only choose 10, 50\n ', (answer) => {
            // input is converted from string to integer for deduction
            const amount = parseInt(answer);
            //if amount is not 10 or 50, transaction will be aborted
            if (amount == 50 || amount == 10) {
                if (amount > accountA) {
                    console.log("Insufficient balance. Transaction failed.");
                }
                else {
                    // accountA balance being deducted for withdrawal
                    accountA = accountA - amount;
                    // new statement being updated with transaction type, amount, date and time transacted
                    const transaction = {
                        Transaction: 'Withdraw',
                        Amount: amount,
                        DateTime: formattedDateTime
                    };
                    // the transaction statement being added to the 'statements' array
                    statements.push(transaction);
                    console.log("Withdrawal successful. Your remaining balance is: " + accountA);
                    console.log(statements);
                }
            }
            else {
                console.log("You have chosen an invalid amount. Please only choose 10, 50\n ");
            }
            resolve();
        })
    });
}


// Function to deposit cash into accountA
function deposit() {
    return new Promise((resolve) => {
        // Allow user to enter the amount they would like to deposit
        rl.question('How much would you like to deposit?\n ', (answer) => {
            // input is converted from string to integer for addition
            const num = parseInt(answer);
            // if amount empty, 0 or more than the account balance, transaction will be aborted
            if (isNaN(num) || num <= 0) {
                console.log("Invalid amount. Please try again.")
            }
            else {
                // accountA balance being updated with deposited amount
                accountA = accountA + num;
                // new statement being updated with transaction type, amount, date and time transacted
                const transaction = {
                    Transaction: 'Deposit',
                    Amount: num,
                    DateTime: formattedDateTime
                };
                // the transaction statement being added to the 'statements' array
                statements.push(transaction);
                console.log("Deposit successful. Your new balance is: " + accountA);
                console.log(statements);
            }
            resolve();
        })
    });
}

// Function to trasnfer funds from accoutnA to accountB
function fundTransfer() {
    return new Promise((resolve) => {
        // Allow user to enter the amount they would like to transfer
        rl.question('How much would like to transfer?\n ', (answer) => {
            // input is converted from string to integer for calculation
            const fund = parseInt(answer);
            // if amount empty, 0 or more than the account balance, transaction will be aborted
            if (isNaN(fund) || fund <= 0 || fund > accountA) {
                console.log("Invalid amount. Transfer failed.");
            }
            else {
                // accountA and accountB balance being updated with their new amounts
                accountB = accountB + answer;
                accountA = accountA - answer;
                // new statement being updated with transaction type, amount, date and time transacted
                const transaction = {
                    Transaction: 'Fund Transfer',
                    Amount: fund,
                    DateTime: formattedDateTime
                };
                // the transaction statement being added to the 'statements' array
                statements.push(transaction);
                console.log("Fund transfer successful. Your remaining balance is: " + accountA);
                console.log(statements);
            }
            resolve();
        })
    });
}


// Function to display bank statement
function findbankStatement() {
    // display statements so that users can see transactions saved
    console.log(statements);
    return new Promise((resolve) => {
        // Allow users to search for a certain transaction type
        rl.question('Enter transaction type to search: ', (answer) => {
            // it converts the text entered in the terminal into lower case and compares it with the statement array to look for transaction type by also converting it to lower case and finding a match 
            const foundTransaction = statements.find(statement => statement.Transaction.toLowerCase() === answer.toLowerCase());

            if (foundTransaction) {
                // display those transactions with the searched up transaction type
                console.log(foundTransaction);
            } else {
                console.log(`No ${answer} found.`);
            }
            resolve();
        });
    });
}

module.exports = {
    retrieveBalance,
    withdraw,
    deposit,
    fundTransfer,
    findbankStatement,
    rl,
}
