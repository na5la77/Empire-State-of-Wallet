import React from "react";
import "./OneTransaction.css";

export default function OneTransaction({ transaction, handleChangeBezos,bezosRelated }) {
  let bezosFlag = false;
  if (
    bezosRelated.includes(transaction.merchant_name)
  ) {
    bezosFlag = !bezosFlag;
  }
  return (
    <div className={`single-transaction${bezosFlag ? "-bezos" : ""}`}>
      <div
        className="transaction-card"
        onClick={(event) => {
          console.log("CLICK");
          handleChangeBezos(transaction.merchant_name);
        }}
      >
        <p className="trans-id">{transaction.id}</p>

        <p className="trans-details">{transaction.merchant_name}</p>

        <p className="trans-details">{transaction.amount}$</p>
      </div>
    </div>
  );
}
