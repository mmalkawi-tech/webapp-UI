import { useState } from "react";
import "./App.css";
import { postImage } from "./services/api";

function App() {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  async function uploadTo(target) {
    const file = target === "a" ? selectedA : selectedB;

    setLoading(true);
    setResponse(null);

    try {
      const data = await postImage(`/api/${target}`, file);

      if (data?.error) {
        setResponse({
          error: true,
          message: data.message || "Request failed",
          status: data.status,
        });
      } else {
        setResponse(data);
      }
    } catch (e) {
      setResponse({
        error: true,
        message: e.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <h1>Moath Web App</h1>
      <p className="subtitle">UI → APIM → AKS → PostgreSQL</p>

      <div className="grid">
        <div className="card">
          <h2>Backend A</h2>
          <input type="file" onChange={(e) => setSelectedA(e.target.files[0])} />
          <button disabled={loading} onClick={() => uploadTo("a")}>
            {loading ? "Uploading..." : "Send to Backend A"}
          </button>
        </div>

        <div className="card">
          <h2>Backend B</h2>
          <input type="file" onChange={(e) => setSelectedB(e.target.files[0])} />
          <button disabled={loading} onClick={() => uploadTo("b")}>
            {loading ? "Uploading..." : "Send to Backend B"}
          </button>
        </div>
      </div>

      <pre className="response">
        {response
          ? JSON.stringify(response, null, 2)
          : "No response yet"}
      </pre>
    </div>
  );
}

export default App;
