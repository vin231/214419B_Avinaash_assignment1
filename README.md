# Avinaash_ATM
This node module represents the function of an ATM and its basic services.

# Installation
To use this node module, you will need top download Node.js. Here's a link to Node.js "https://nodejs.org/en/download"

# How to get started
An **app.js** file is included in the project work folder.

The following line at the top of your **app.js** file has been added.  
```Javascript
"const atm = require("./Avinaash_ATM.js");"
```
This allows your **app.js** file to access the contents of the node module.

This project was designed to run `synchronously` so that all the functions work as intended.

- Here is an example of the **app.js** file.
```Javascript
const atm = require("./Avinaash_ATM.js");

async function run() {
    await atm.retrieveBalance();
    await atm.deposit();
    await atm.withdraw();
    await atm.fundTransfer();

    atm.rl.close();
}

run();
```

You will need to type `await atm.<theFunctionYouNeed>();` inside the `async function run`.

- For Example,
```Javascript
async function run() {
    await atm.retrieveBalance();

    atm.rl.close();
}
```
You will not need to modify anything else in the file.

# Account balances and statement array
The following code is used to store dummy values for both the account balances and the statements of **accountA**.

- `Account balances for banking purposes`
```Javascript
let accountA = 20;
let accountB = 10;
```

- `Statement used for dummy values`
```Javascript
let statement = [
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
```

# Call a function
You can call a function you would like to use using `console.log` function.

Add **atm** followed by a '.' and then the function name.
```Javascript
console.log(atm.retrieveBalance());
```

# Retrieve account balance
This function retrieves the balance of `accountA`.

The main account used for this Node module.
```Javascript
function retrieveBalance() {
    console.log("Your current balance is: " + accountA);
}
```

# Cash withdrawal function
This function simulates the cash withdrawal process of an **ATM**.

```Javascript
function withdraw() {
    return new Promise((resolve) => {
        rl.question('How much would you like to withdraw? Please only choose 10, 50\n ', (answer) => {
            const amount = parseInt(answer);
            if (amount == 50 || amount == 10) {
                if (amount > accountA) {
                    console.log("Insufficient balance. Transaction failed.");
                }
                else {
                    accountA = accountA - amount;
                    const transaction = {
                        Transaction: 'Withdraw',
                        Amount: amount,
                        DateTime: formattedDateTime
                    };
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
```

This ATM only allows withdrawal amount of `10` or `50`.

- If the amount entered is `invalid`, the code will throw an error.

```
Insufficient balance. Transaction failed.
```

- If withdrawal was `successful`, a statement is saved in the `statement array` alongside the dummy data, followed by the remaining balance of **accountA**
```
Withdrawal successful. Your remaining balance is: 10
{
    Transaction: 'Withdraw',
    Amount: 10,
    DateTime: '18 Nov 2023, 07:26'
}
```

# Deposit function 
This function simulates the cash deposit of an **atm**

```Javascript
function deposit() {
    return new Promise((resolve) => {
        rl.question('How much would you like to deposit?\n ', (answer) => {
            const num = parseInt(answer);
            if (isNaN(num) || num <= 0) {
                console.log("Invalid amount. Please try again.")
            }
            else {
                accountA = accountA + num;
                const transaction = {
                    Transaction: 'Deposit',
                    Amount: num,
                    DateTime: formattedDateTime
                };
                statements.push(transaction);
                console.log("Deposit successful. Your new balance is: " + accountA);
                console.log(statements);
            }
            resolve();
        })
    });
}
```

- If the `deposit` is not `0` or a `string`. An error message will be displayed.
```
Invalid amount. Please try again.
```

- If the deposit was a valid amount, a statement is saved in the `statement array` alongside the dummy data, followed by the remaining balance of **accountA**
```
Deposit successful. Your new balance is: 42
{
    Transaction: 'Deposit',
    Amount: 22,
    DateTime: '17 Nov 2023, 22:58'
}
```

# Fund transfer function
This function simulates transferring from one account to another.

In this case `accountA` to `accountB`.

```Javascript
function fundTransfer() {
    return new Promise((resolve) => {
        rl.question('How much would like to transfer?\n ', (answer) => {
            const fund = parseInt(answer);
            if (isNaN(fund) || fund <= 0 || fund > accountA) {
                console.log("Invalid amount. Transfer failed.");
            }
            else {
                accountB = accountB + answer;
                accountA = accountA - answer;
                const transaction = {
                    Transaction: 'Fund Transfer',
                    Amount: fund,
                    DateTime: formattedDateTime
                };
                statements.push(transaction);
                console.log("Fund transfer successful. Your remaining balance is: " + accountA);
                console.log(statements);
            }
            resolve();
        })
    });
}
```

- The script will not allow `0` or a `string` as amount to transfer.
```Javascript
Invalid amount. Transfer failed.
```

- If the funds have transferred successfully, a statement is saved in the `statement array` alongside the dummy data, followed by the remaining balance of **accountA**
```Javascript
Fund transfer successful. Your remaining balance is: 5
{
    Transaction: 'Fund Transfer',
    Amount: 5,
    DateTime: '19 Nov 2023, 13:37'
}
```

# Retrieve bank statement
The final function allows you to search for a transaction type saved in the `statement array` alongside the dummy data.
```Javascript
function findbankStatement() {
    console.log(statements);
    return new Promise((resolve) => {
        rl.question('Enter transaction type to search: ', (answer) => {
            const foundTransaction = statements.find(statement => statement.Transaction.toLowerCase() === answer.toLowerCase());

            if (foundTransaction) {
                console.log(foundTransaction);
            } else {
                console.log(`No ${answer} found.`);
            }
            resolve();
        });
    });
}
```