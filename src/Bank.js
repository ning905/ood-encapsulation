/*Bank
  - getBalance()
  - creditAccount(date, amount)
  - debitAccount(date, amount)
  - printStatement()
*/

class Transaction {
  constructor(date, amount) {
    this.date = date;
    this.amount = amount;
    this.credit = "";
    this.debit = "";
    this.balance;
  }
  getAccountType(account) {
    if (account.constructor === CreditAccount) {
      this.credit = this.amount;
    } else if (account.constructor === DebitAccount) {
      this.debit = this.amount;
    }
  }
}

class CreditAccount {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  getBalance() {
    return this.balance;
  }

  transact(date, amount) {
    this.balance += amount;
    const transaction = new Transaction(date, amount);
    transaction.getAccountType(this);
    this.transactions.push(transaction);
    return transaction;
  }
}

class DebitAccount {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  getBalance() {
    return this.balance;
  }

  transact(date, amount) {
    this.balance += amount;
    const transaction = new Transaction(date, amount);
    transaction.getAccountType(this);
    this.transactions.push(transaction);
    return transaction;
  }
}

class Bank {
  constructor() {
    this.creditAccount = new CreditAccount();
    this.debitAccount = new DebitAccount();
    this.balance =
      this.creditAccount.getBalance() + this.debitAccount.getBalance();
    this.transactions = [
      ...this.creditAccount.transactions,
      ...this.debitAccount.transactions,
    ];
  }

  getBalance() {
    return this.creditAccount.getBalance() + this.debitAccount.getBalance();
  }

  getTransactions() {
    this.transactions.sort((a, b) => {
      return a.date - b.date;
    });
    return this.transactions;
  }

  modifyCreditAccount(date, amount) {
    const transaction = this.creditAccount.transact(date, amount);
    transaction.balance = this.getBalance();
    this.transactions.push(transaction);
  }

  modifyDebitAccount(date, amount) {
    const transaction = this.debitAccount.transact(date, amount);
    transaction.balance = this.getBalance();
    this.transactions.push(transaction);
  }

  printStatement() {
    console.log();
  }
}

const myBank = new Bank();
console.log("getBalance", myBank.getBalance());
myBank.modifyCreditAccount("2022-06-15", 500);
myBank.modifyDebitAccount("2022-06-12", 1500);
console.log("getBalance", myBank.getBalance());
console.log("getTransactions", myBank.getTransactions());
