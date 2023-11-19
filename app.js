const atm = require("./Avinaash_ATM.js");

async function run() {
    // type the function you would like to call after 'await atm.'
    await atm.retrieveBalance();
    await atm.deposit();
    await atm.withdraw();
    await atm.fundTransfer();

    atm.rl.close();
}

run();