import { useState, useEffect } from "react";
import axios from "axios";
const baseURL = "http://localhost:5002/getTransactions";
import "./App.css";
import SingleDay from "./Components/SingleDay";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [bezosRelated, setBezosRelated] = useState([
    "Amazon",
    "Washington Post",
    "Whole Foods",
    "Blue Origin",
  ]);
  let totalSpent = 0;
  let totalBezosSpent = 0;

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await axios.get(baseURL);
      setTransactions(res.data);
    };
    fetchTransactions();
    if (localStorage.getItem("bezosRelated")) {
      setBezosRelated(localStorage.getItem("bezosRelated").split(","));
    } else {
      localStorage.setItem("bezosRelated", bezosRelated);
    }
  }, []);

  const handleChangeBezos = (company) => {
    const index = bezosRelated.indexOf(company);
    let bezosRelatedTemp;
    if (index < 0) {
      bezosRelatedTemp = bezosRelated.concat([company]);
    } else {
      bezosRelatedTemp = bezosRelated.filter(
        (companyInArray) => companyInArray !== company
      );
    }
    setBezosRelated(bezosRelatedTemp);
    localStorage.setItem("bezosRelated", bezosRelatedTemp.toString());
  };

  return (
    <div className="App">
      <div className="total-spent">
        <br />
        <span className="totals-titles">Total Spent: </span>
        <p className="totals">
          {Math.ceil(parseFloat(localStorage.getItem("totalSpent")))}
        </p>

        <span className="totals-titles">Total Stolen by Bezos: </span>
        <p className="totals">
          {Math.ceil(parseFloat(localStorage.getItem("totalBezosSpent")))}
        </p>
        <span className="totals-titles">
          Bezos as a percentage of spending:{" "}
        </span>
        <p className="totals">
          {Math.ceil(
            (parseFloat(localStorage.getItem("totalBezosSpent")) * 100) /
              parseFloat(localStorage.getItem("totalSpent"))
          )}
          %
        </p>
      </div>
      <div className="instructions">
        <span>
          Companies related to Jeff Bezos:
        </span>
        <br />
        <span>{bezosRelated.toString()}</span>
        <br/>
        <span className="highlited-companies">The transactions related to these companies will have a teal shadow</span>
      </div>

      {Object.entries(transactions).map(([key, value]) => {
        {
          value.map((transaction) => {
            totalSpent += transaction.amount;
            localStorage.setItem("totalSpent", totalSpent);
            if (
              localStorage
                .getItem("bezosRelated")
                .includes(transaction.merchant_name)
            ) {
              totalBezosSpent += transaction.amount;
              localStorage.setItem("totalBezosSpent", totalBezosSpent);
            }
          });
        }

        return (
          <div>
            <SingleDay
              date={key}
              arrayOfTransactionsOnDay={value}
              handleChangeBezos={handleChangeBezos}
              bezosRelated={bezosRelated}
            />
          </div>
        );
      })}
    </div>
  );
}

export default App;
// <OneTransaction key={value.id} transaction={value} handleChangeBezos={handleChangeBezos}/>

// <SingleDayTransactions
//               date={key}
//               arrayOfTransactionsOnDay={value}
//             />
