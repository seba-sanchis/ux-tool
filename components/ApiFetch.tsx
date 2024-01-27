"use client";

import { useState } from "react";

export default function ApiFetch() {
  const [api, setApi] = useState("");
  const [data, setData] = useState<String[]>([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(api);

      const data = await response.json();

      if (Array.isArray(data)) {
        setData(data);
        setError("");
      } else {
        setError("Invalid data format. Expected an array.");
      }
    } catch (error) {
      setError("Error fetching data from the API.");
      setData([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 className="title">API status</h2>

      <div className="flex items-center gap-4">
        <div className="input-container w-4/5">
          <label htmlFor="api" className="subtitle">
            API
          </label>
          <input
            id="api"
            type="text"
            value={api}
            onChange={(e) => setApi(e.target.value)}
            className="input w-full"
          />
        </div>

        <button className="button flex-1">Fetch</button>
      </div>

      {error && <div className="text-xs text-[--wv-red]">{error}</div>}

      <pre className="max-w-screen-lg h-80 bg-gray-800 text-white p-4 rounded-md overflow-scroll">
        {Array.isArray(data) ? JSON.stringify(data, null, 2) : "No data"}
      </pre>
    </form>
  );
}
