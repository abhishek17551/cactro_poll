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
    <div className="bg-white p-4 rounded-lg shadow mt-4">
      <h2 className="text-lg font-bold">Poll Result</h2>
      {results.options.map((option) => (
        <div key={option._id} className="flex justify-between items-center bg-gray-100 p-2 rounded my-1">
          <span>{option.text}</span>
          <span className="font-bold">{option.voteCount} votes</span>
        </div>
      ))}
    </div>
  );
};

export default PollResults;
