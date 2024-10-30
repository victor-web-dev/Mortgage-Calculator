import Input from "components/Input";
import { ChangeEvent, useState } from "react";
import "./App.css";

function App() {
  const [test, setTest] = useState<{ [name: string]: string }>({ valor: "" });

  const inputHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setTest((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <main style={{ padding: "2rem" }}>
        <Input
          label="Mortgage Amount"
          type="number"
          name="valor"
          handler={inputHandler}
          value={test.valor}
          symbol="%"
        />
      </main>
    </>
  );
}

export default App;
