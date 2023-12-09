import "./styles.css";
import { useState } from "react";
import { arrayData, rubros, marca } from "./config";
import useFilter from "./useFilter";
import Select from "./Select";

export default function App() {
  const [data, setData] = useState(arrayData);

  const { filterByRubro, filteredExpenses } = useFilter(data);
  console.log(filteredExpenses);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Select
        filterByRubro={(e) => filterByRubro(e.target.value)}
        rubros={rubros}
      />
      <Select
        filterByRubro={(e) => filterByRubro(e.target.value, true)}
        rubros={marca}
      />
      {filteredExpenses.map((object) => (
        <div style={{ border: "1px solid black", margin: "10px 0" }}>
          {Object.entries(object).map(([key, value]) => (
            <div
              style={{
                display: "flex",
                justifycontent: "center",
                alignItems: "center"
              }}
            >
              <p style={{ color: "red", margin: "0 20px" }}>{key}</p>
              <p>{value}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
