import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatePoll from './components/CreatePoll';
import VotePoll from './components/VotePoll';
import PollResults from './components/PollResults';

const App = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      const { data } = await axios.get('http://localhost:7777/polls');
      setPolls(data?.polls);
    };
    fetchPolls();
  }, []);

  return (
    <div>
      <CreatePoll />
      {polls && polls.map((poll) => (
        <div key={poll._id}>
          <VotePoll poll={poll} />
        </div>
      ))}
      {polls && polls.map((poll) => (
        <div key={poll._id}>
          <PollResults poll={poll} />
        </div>
      ))}
    </div>
  );
};

export default App;