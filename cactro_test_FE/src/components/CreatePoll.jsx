import React, { useState } from 'react';
import axios from 'axios';

const CreatePoll = ({ setPolls }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredOptions = options.filter(opt => opt.trim());
    if (!question.trim()) {
      setError("Question is required.");
      return;
    }
    if (filteredOptions.length < 2) {
      setError("At least two options are required.");
      return;
    }
    setError('');

    try {
      const { data } = await axios.post('http://localhost:7777/polls', { question, options: filteredOptions });
      setPolls((prevPolls) => 
        [...prevPolls, data.poll].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
      setQuestion('');
      setOptions(['', '']);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-200 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 ml-6">Create a Poll</h2>
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question"
          required
        />

        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              className="flex-1 p-2 border rounded"
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
              placeholder={`Option ${index + 1}`}
              required
            />
            {options.length > 2 && (
              <button
                type="button"
                className="text-red-500 font-bold px-2"
                onClick={() => setOptions(options.filter((_, i) => i !== index))}
              >
                ✖
              </button>
            )}
          </div>
        ))}

        
        <button
          type="button"
          className="w-full bg-blue-500 text-white py-2 rounded mt-2"
          onClick={() => setOptions([...options, ''])}
        >
          Add Option
        </button>

        
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded mt-2">
          Create Poll
        </button>

        
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CreatePoll;
