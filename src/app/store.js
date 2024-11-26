import { configureStore } from "@reduxjs/toolkit";
import transactionsSlice, { deposit, withdrawal, transfer } from "../features/transactions/transactionsSlice";

// TODO: Configure the store to use the reducer from the transactions slice.
const store = configureStore({
    reducer: {
        transactions: transactionsSlice,
        deposit: deposit,
        withdrawal: withdrawal,
        transfer: transfer, 
    },
});

export default store;
