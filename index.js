//let balance = 500.00;


class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    // Calculate the balance using the transaction objects
    return this.transactions.reduce((acc, transaction) => acc + transaction.value, 0);
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }


}


class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) return false;
        // Keep track of the time of the transaction
        this.time = new Date();
        // Add the transaction to the account
        this.account.addTransaction(this);
        return true;
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount
  }
  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }
  isAllowed() {

    return (this.account.balance - this.amount >= 0);
  }
}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

// Can only withdraw up to 120
const t2 = new Withdrawal(125.00, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount.balance);
