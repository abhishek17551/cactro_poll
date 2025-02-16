import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PollResults = ({ poll }) => {
  const [results, setResults] = useState(poll);

  useEffect(() => {
    const interval = setInterval(async () => {
      const { data } = await axios.get(`http://localhost:7777/polls/${poll._id}`);
      setResults(data?.poll);
    }, 5000);
    return () => clearInterval(interval);
  }, [poll._id]);

  return (
    <div>
      <h2>Poll Results</h2>
      <h3>{results.question}</h3>
      {results && results.options.map((option) => (
        <div key={option._id}>
          {option.text}: {option.voteCount} votes
        </div>
      ))}
    </div>
  );
};

export default PollResults;