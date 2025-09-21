'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const methods = ['GET', 'POST', 'PUT', 'DELETE'];

export const Apiclient = () => {
  const [activeTab, setActiveTab] = useState('Query');
  const [response, setResponse] = useState('');
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [body, setBody] = useState('');
  const [lastApiRes, setLastApiRes] = useState(null);
  const [history, setHistory] = useState([]);

  // Fetch history from backend
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/history');
        setHistory(res.data);
      } catch (err) {
        console.error('Failed to fetch history:', err.message);
      }
    };
    fetchHistory();
  }, []);

  // Send request
  const handleSend = async () => {
    try {
      const apiRes = await axios({
        method: method.toLowerCase(),
        url,
        data: body ? JSON.parse(body) : undefined,
      });
      setResponse(JSON.stringify(apiRes.data, null, 2));
      setLastApiRes(apiRes.data);
    } catch (err) {
      setResponse(`Error: ${err.message}`);
    }
  };

  // Save request/response to backend
  const handleSave = async () => {
    if (!url || !lastApiRes) {
      alert('Please send a request first before saving.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/add', {
        method,
        url,
        requestBody: body,
        response: lastApiRes,
      });
      alert('Request saved successfully!');
      // Refresh history after saving
      const res = await axios.get('http://localhost:5000/api/history');
      setHistory(res.data);
    } catch (err) {
      alert(`Failed to save: ${err.message}`);
    }
  };

  return (
    <div className="flex h-screen bg-gray-800 text-white">
      {/* History Panel */}
      <div className="w-1/4 border-r p-4 bg-gray-900 overflow-auto">
        <h2 className="text-lg font-semibold mb-4 text-blue-400">History</h2>
        {history.length === 0 && (
          <p className="text-gray-500 text-sm">No history available</p>
        )}
        <ul className="space-y-2">
          {history.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setUrl(item.url);
                setMethod(item.method);
                setBody(
                  item.requestBody
                    ? JSON.stringify(item.requestBody, null, 2)
                    : ''
                );
              }}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded cursor-pointer text-sm"
            >
              <p className="font-medium">{item.method} - {item.url}</p>
              <p className="text-gray-400 text-xs">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Left Panel */}
      <div className="w-2/4 flex flex-col border p-5">
        <div className="flex gap-3 mb-4">
          <select
            onChange={(e) => setMethod(e.target.value)}
            className="bg-gray-800 text-white border p-2.5"
            value={method}
          >
            {methods.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="API URL"
            className="border-y p-2 flex-1 bg-gray-700 rounded"
          />

          <button
            onClick={handleSend}
            className="border p-2 bg-green-700 text-white rounded"
          >
            Send
          </button>

          <button
            onClick={handleSave}
            className="border p-2 bg-blue-700 text-white rounded"
          >
            Save
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 border-b border-gray-700 mb-4">
          {['Query', 'Headers', 'Body'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 ${
                activeTab === tab
                  ? 'border-b-2 border-blue-500 text-blue-400 font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-4 bg-gray-900 rounded-md">
          {activeTab === 'Query' && (
            <input
              type="text"
              placeholder="key=value"
              className="w-full p-2 bg-gray-700 rounded"
            />
          )}
          {activeTab === 'Headers' && (
            <input
              type="text"
              placeholder="Authorization: Bearer ..."
              className="w-full p-2 bg-gray-700 rounded"
            />
          )}
          {activeTab === 'Body' && (
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder='{"key": "value"}'
              className="w-full p-2 bg-gray-700 rounded"
            ></textarea>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/4 border-l p-4 overflow-auto">
        <h2 className="text-lg font-semibold mb-2">Response</h2>
        <pre className="bg-gray-900 p-4 rounded text-sm h-full">
          {response || 'Response will appear here'}
        </pre>
      </div>
    </div>
  );
};

export default Apiclient;
