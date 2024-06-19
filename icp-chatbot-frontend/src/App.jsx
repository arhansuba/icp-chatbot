import React, { useState } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../declarations/icp_chatbot';

const agent = new HttpAgent();
const chatbot = Actor.createActor(idlFactory, { agent, canisterId: 'YOUR_CANISTER_ID' });

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleQuery = async () => {
    const res = await chatbot.get_response(query);
    setResponse(res);
  };

  return (
    <div>
      <h1>ICP Chatbot</h1>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={handleQuery}>Ask</button>
      <p>{response}</p>
    </div>
  );
}

export default App;
