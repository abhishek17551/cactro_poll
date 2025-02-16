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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Polling App</h1>

        <CreatePoll setPolls={setPolls} />

        {polls.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Active Polls</h2>
            <div className="space-y-6">
              {polls.map((poll) => (
                <div key={poll._id} className="bg-white p-4 rounded-lg shadow">
                  <VotePoll poll={poll} />
                  <PollResults poll={poll} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
