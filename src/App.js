import { useState } from 'react';
import './index.scss';

function App() {

  const [count, setCount] = useState(0);

  const clickPlus = () => {
    setCount(count + 1)
  }

  const clickMinus = () => {
    setCount(count - 1)
  }
  
  return (
    <div className="App">
      <div>
        <h2>Счетчик:</h2>
        <h1>{count}</h1>
        <button onClick={clickMinus} className="minus">- Минус</button>
        <button onClick={clickPlus} className="plus">Плюс +</button>
      </div>
    </div>
  );
}

export default App;
