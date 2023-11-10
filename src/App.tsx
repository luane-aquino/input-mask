import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* input with mask */}
      <div className='wrapper'>
        <label htmlFor='input-mask'>edit money</label>
        <input type='number' id='input-mask'/>
      </div>
      {/* controls */}
      <div>
        <div>
          <input id='radio-money' type='radio' />
          <label htmlFor='radio-money'>edit money</label>
        </div>
        <div>
          <input id='radio-points' type='radio' />
          <label htmlFor='radio-points'>edit points</label>
        </div>
      </div>
    </div>
  );
}

export default App;
