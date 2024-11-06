import { useState } from 'react'
import './App.css'
import Timer from './components/Timer/Timer'
import Game from './components/Game/Game';
import Ranking from './components/Ranking/Ranking';

function App() {
  //const [count, setCount] = useState(0)
  const [view, setView] = useState('game'); // 일단 들어가자마자 보이는건 게임 state
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [playTime, setPlayTime] = useState(0);

  const [level, setLevel] = useState(1); // 기본 레벨 1 (일단 심화과제 할 수 있으면 하기)


  const handleViewChange = (newView) => {
    setView(newView); // view 상태를 클릭한 버튼에 따라 변경
    // console.log(`view state changed! ${view}`)
  };

  const startGame = () => {
    setStartTime(new Date()); // 시작 한 시간 기록하기
    setIsRunning(true); // 시작했다면 타이머를 굴려
  }
  
//타이머 멈추는 함수 선언
const stopGame = () => {
  setIsRunning(false); //끝났으니 도는거 멈춰야됨
  const gameData = {
      startTime,
      level,
      playTime
  };
  localStorage.setItem(`game_${Date.now()}`, JSON.stringify(gameData));
  setPlayTime(0); //리셋하기
};

//플레이타임 업데이트
const handleTimeUpdate = (time) => {
  setPlayTime(time);
};


  return (
    <>
      <header>
        <div className='HeaderLeft'>
          <h1>1 to 50</h1>
          <button onClick={() => handleViewChange('game')}>게임</button>
          <button onClick={() => handleViewChange('ranking')}>랭킹</button>
        </div>
        <div className='HeaderRight' style={{ display: view === 'game' ? 'flex' : 'none' }} >
          <select name="level" id="level">
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
          </select>
          {/* 타이머로 타이머 돌아가는지랑, 설정된 시간 보내줘야함*/}
          <Timer isRunning={isRunning} onTimeUpdate={handleTimeUpdate} playTime={playTime} />
        </div>
      </header>
      <section>
        {/* 게임쪽에는 몇레벨인지(일단 아직 구현은 못햇지만...) 게임 시작했는지, 게임 끝났는지 보내줘야함 */}
        {view === 'game' && <Game 
          startGame = {startGame}
          stopGame = {stopGame}
          playTime={playTime}
        />}
        {view === 'ranking' && <Ranking />}
      </section>
    </>
  )
}

export default App
