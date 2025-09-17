'use client';
import React, { useState } from 'react';

export const Apiclient = () => {
  const [activeTab, setActiveTab] = useState('Query'); // track active tab
  const [response, setResponse] = useState(''); // store API response

  return (
    <div className="flex h-screen bg-gray-800 text-white">
      {/* Left Panel */}
      <div className="w-2/3 flex flex-col border p-5">
        {/* API URL Section */}
        <div className="flex gap-3 mb-4">
          <select className="bg-gray-800 text-white border p-2.5">
            <option>GET</option>
            <option>PUT</option>
            <option>DELETE</option>
            <option>POST</option>
          </select>

          <input
            type="text"
            placeholder="API URL"
            className="border-y p-2 flex-1 bg-gray-700 rounded"
          />

          <button className="border p-2 bg-green-700 text-white rounded">
            Send
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

        {/* Tabs Content */}
        <div className="p-4 bg-gray-900 rounded-md">
          {activeTab === 'Query' && (
            <div>
              <p className="text-sm text-gray-400 mb-2">Add query parameters:</p>
              <input
                type="text"
                placeholder="key=value"
                className="w-full p-2 bg-gray-700 rounded"
              />
            </div>
          )}

          {activeTab === 'Headers' && (
            <div>
              <p className="text-sm text-gray-400 mb-2">Add custom headers:</p>
              <input
                type="text"
                placeholder="Authorization: Bearer ..."
                className="w-full p-2 bg-gray-700 rounded"
              />
            </div>
          )}

          {activeTab === 'Body' && (
            <div>
              <p className="text-sm text-gray-400 mb-2">Request body (JSON):</p>
              <textarea
                placeholder='{"key": "value"}'
                className="w-full p-2 bg-gray-700 rounded"
              ></textarea>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel (Response) */}
      <div className="w-1/3 border-l p-4 overflow-auto">
        <h2 className="text-lg font-semibold mb-2">Response</h2>
        <pre className="bg-gray-900 p-4 rounded text-sm h-full">
          {response || 'Response will appear here'}
        </pre>
      </div>
    </div>
  );
};

export default Apiclient;
