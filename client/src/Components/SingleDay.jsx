import React, { useState } from "react";
import OneTransaction from "./OneTransaction";
import "./SingleDay.css";
export default function SingleDay({
  date,
  arrayOfTransactionsOnDay,
  handleChangeBezos,bezosRelated
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="single-day">
      <button onClick={()=>{setVisible(!visible)}}>{date}</button>

      <div className="single-day-transactions"  >
        {visible && arrayOfTransactionsOnDay.map((transaction) => {
          return (
            <OneTransaction
              transaction={transaction}
              key={transaction.id}
              handleChangeBezos={handleChangeBezos}
              bezosRelated = {bezosRelated}

            />
          );
        })}
      </div>
    </div>
  );
}
