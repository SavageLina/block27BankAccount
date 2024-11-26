import "./transactionHistory.scss";
import { useSelector } from "react-redux";
import transactionsSlice, { selectHistory } from "./transactionsSlice";
import { useContext } from 'react';

/** Displays a table row with transaction information  */
const TransactionRow = ({ transaction: { type, amount, balance } }) => (
  <tr>
    <th scope="row">{type}</th>
    <td>{amount.toFixed(2)}</td>
    <td>{balance.toFixed(2)}</td>
  </tr>
);

export default function TransactionHistory() {
  const transactions= useSelector((state)=> state.transactions.history)
  // console.log(transactions)
  // TODO: Get the transaction history from the Redux store using the useSelector hook
  // const history = selectHistory;

  return (
    <section className="transactions-history container">
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Amount</th>
            <th scope="col">Balance</th>
          </tr>
        </thead>
        <tbody>

        {transactions.map((transaction,i)=> {
          return(
            <tr key= {i}>
            <th scope="col">{transaction.type}</th>
            <th scope="col">{transaction.amount}</th>
            <th scope="col">{transaction.balance}</th>
          </tr>
          )
         })}
        </tbody>
      </table>
    </section>
  );
}
