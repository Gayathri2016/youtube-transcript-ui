import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [youtubeURL, setYoutubeURL] = useState("");
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTranscript("");
    setSummary("");
    setError("");

    try {
      const response = await axios.post("http://localhost:5001/summarize", {
            youtube_url: youtubeURL
          }, {
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: false,
          }
);
      setTranscript(response.data.transcript);
      setSummary(response.data.summary);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="App">
      <h1>YouTube Lecture Summarizer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={youtubeURL}
          onChange={(e) => setYoutubeURL(e.target.value)}
          placeholder="Enter YouTube video URL"
        />
        <button type="submit">Get Transcript & Summary</button>
      </form>

      {error && <p className="error">{error}</p>}
      {transcript && (
        <>
          <h2>Transcript:</h2>
          <p>{transcript}</p>
        </>
      )}
      {summary && (
        <>
          <h2>Summary:</h2>
          <p>{summary}</p>
        </>
      )}
    </div>
  );
}

export default App;
