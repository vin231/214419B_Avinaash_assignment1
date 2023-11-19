const atm = require("./Avinaash_ATM.js");

async function run() {
    await atm.retrieveBalance();
    await atm.deposit();
    await atm.withdraw();
    await atm.fundTransfer();

    atm.rl.close();
}

run();