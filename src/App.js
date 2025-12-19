import { useState } from "react";
import "./App.css";
import { postImage } from "./services/api";

function App() {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);
  const [response, setResponse] = useState(null);

  async function uploadTo(target) {
    const file = target === "a" ? selectedA : selectedB;

    if (!file) {
      alert("Please select a file first");
      return;
    }

    try {
      const data = await postImage(`/api/${target}`, file);
      setResponse(data);
    } catch (e) {
      setResponse({ error: e.message });
    }
  }

  return (
    <div className="App">
      <h1>Moath UI</h1>

      <div className="grid">
        <div className="card">
          <h2>Backend A</h2>
          <input type="file" onChange={(e) => setSelectedA(e.target.files[0])} />
          <button onClick={() => uploadTo("a")}>Upload to A</button>
        </div>

        <div className="card">
          <h2>Backend B</h2>
          <input type="file" onChange={(e) => setSelectedB(e.target.files[0])} />
          <button onClick={() => uploadTo("b")}>Upload to B</button>
        </div>
      </div>

      <pre className="response">{response ? JSON.stringify(response, null, 2) : "No response yet"}</pre>
    </div>
  );
}

export default App;
