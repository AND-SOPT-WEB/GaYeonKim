import { useState } from 'react'
import './App.css'
import Timer from './components/Timer/Timer'
import Game from './components/Game/Game';
import Ranking from './components/Ranking/Ranking';

function App() {
  //const [count, setCount] = useState(0)
  const [view, setView] = useState('game'); // 일단 들어가자마자 보이는건 게임 state
  
  const handleViewChange = (newView) => {
    setView(newView); // view 상태를 클릭한 버튼에 따라 변경
    // console.log(`view state changed! ${view}`)
  };
  
  return (
    <>
      <header>
        <div className='HeaderLeft'>
          <h1>1 to 50</h1>
          <button onClick={() => handleViewChange('game')}>게임</button>
          <button onClick={() => handleViewChange('ranking')}>랭킹</button>
        </div>
        <div className='HeaderRight' style={{ display: view === 'game' ? 'block' : 'none' }} >
          <select name="level" id="level">
            <option value="level1">Level 1</option>
            <option value="level2">Level 2</option>
            <option value="level3">Level 3</option>
          </select>
          <Timer />
        </div>
      </header>
      <section>
        {view === 'game' && <Game />}
        {view === 'ranking' && <Ranking />}
      </section>
    </>
  )
}

export default App
