import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, withdrawal, transfer } from "./transactionsSlice";
import "./transactions.scss";

/**
 * Allows users to deposit to, withdraw from, and transfer money from their account.
 */
export default function Transactions() {
  const transactions= useSelector((state)=> state.transactions)
  console.log(transactions)
  // TODO: Get the balance from the Redux store using the useSelector hook
  const balance = useSelector((state) => state.transactions.balance);

  const [amountStr, setAmountStr] = useState("0.00");
  const [recipient, setRecipient] = useState("");
  const dispatch = useDispatch();
  /** Dispatches a transaction action based on the form submission. */
  const onTransaction = (e) => {
    e.preventDefault();

    // This changes depending on which button the user clicked to submit the form.
    // It will be either "deposit", "withdraw", or "transfer".
    const action = e.nativeEvent.submitter.name;
    
    const amount = +amountStr;

    // TODO: Dispatch the appropriate transaction action based on `action`
    if (action === "deposit") {
      dispatch(deposit({ amount }));
    } else if (action === "withdraw") {
      if (amount > balance) {
        alert("Insufficient funds for withdrawal.");
      } else {
        dispatch(withdrawal({ amount }));
      }
    } else if (action === "transfer") {
      if (!recipient) {
        alert("Please enter a recipient name for the transfer.");
        return;
      }
      dispatch(transfer({ amount, recipient }));
    }
    setAmountStr("0.00");
    setRecipient("");
  };

  return (
    <section className="transactions container">
      <h2>Transactions</h2>
      <figure>
        <figcaption>Current Balance &nbsp;</figcaption>
        <strong>${balance.toFixed(2)}</strong>
      </figure>
      <form onSubmit={onTransaction}>
        <div className="form-row">
          <label>
            Amount
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
            />
          </label>
          <div>
            <button default name="deposit">
              Deposit
            </button>
            <button name="withdraw">Withdraw</button>
          </div>
        </div>
        <div className="form-row">
          <label>
            Transfer to
            <input
              placeholder="Recipient Name"
              name="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </label>
          <button name="transfer">Transfer</button>
        </div>
      </form>
    </section>
  );
}
