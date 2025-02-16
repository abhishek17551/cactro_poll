import React, { useState } from 'react';
import axios from 'axios';

const VotePoll = ({ poll }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleVote = async () => {
    if (!selectedOption) return;
    await axios.post(`http://localhost:7777/polls/${poll._id}/vote`, {
      optionId: selectedOption,
    });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">{poll.question}</h3>
      {poll.options.map((option) => (
        <div key={option._id} className="flex items-center gap-2">
          <input
            type="radio"
            name={`poll-${poll._id}`}
            value={option._id}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="accent-blue-500"
          />
          {option.text}
        </div>
      ))}
      <button
        onClick={handleVote}
        className="mt-4  mx-auto w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Vote
      </button>
    </div>
  );
};

export default VotePoll;
