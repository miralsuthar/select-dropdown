import { useState } from "react";
import "./App.css";
import { Select, SelectOption } from "./Select";

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
];

function App() {
  const [value1, setValue1] = useState<SelectOption[]>([options[0]]);
  const [value2, setValue2] = useState<SelectOption | undefined>(options[0]);
  const [value3, setValue3] = useState<SelectOption[]>([options[0]]);
  const [value4, setValue4] = useState<SelectOption | undefined>(options[0]);
  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Select
          variant="gray"
          options={options}
          value={value2}
          onChange={(o) => setValue2(o)}
        />
        <br />
        <Select
          variant="gray"
          multiple
          options={options}
          value={value1}
          onChange={(o) => setValue1(o)}
        />
      </div>
      <div
        style={{
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Select
          variant="white"
          options={options}
          value={value4}
          onChange={(o) => setValue4(o)}
        />
        <br />
        <Select
          variant="white"
          multiple
          options={options}
          value={value3}
          onChange={(o) => setValue3(o)}
        />
      </div>
    </div>
  );
}

export default App;
