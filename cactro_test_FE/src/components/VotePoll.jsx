import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VotePoll = ({ poll }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleVote = async () => {
    await axios.post(`http://localhost:7777/polls/${poll._id}/vote`, {
      optionId: selectedOption,
    });
  };

  return (
    <div>
      <h3>{poll.question}</h3>
      {poll.options.map((option) => (
        <div key={option._id}>
          <input
            type="radio"
            name="option"
            value={option._id}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          {option.text}
        </div>
      ))}
      <button onClick={handleVote}>Vote</button>
    </div>
  );
};

export default VotePoll;