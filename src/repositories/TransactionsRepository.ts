import Transaction from '../models/Transaction';
import GetValueFromType from '../utils/GetValueFromType';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDto {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome = GetValueFromType({
      transactions: this.transactions,
      type: 'income',
    });

    const totalOutcome = GetValueFromType({
      transactions: this.transactions,
      type: 'outcome',
    });

    const total = totalIncome - totalOutcome;
    const balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDto): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
