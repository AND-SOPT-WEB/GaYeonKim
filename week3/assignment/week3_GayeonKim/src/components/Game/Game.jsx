import { useState } from 'react'
import styles from './Game.module.css';
import Timer from '../Timer/Timer';


//App에서 넘어오는 두 값, startGame과 stopGame
const Game = ({startGame, stopGame}) => {


    // const clickTheNumber = (newCount) => {
    //     setCount(newCount); // view 상태를 클릭한 버튼에 따라 변경
    //     // console.log(`view state changed! ${view}`)
    //   };

    const handleStartGame = () => {
        startGame();
    }

    const handleStopGame = () => {
        stopGame();
    }

    return (
        <div className={styles.GameWrapper}>
            {/* <h1>다음 숫자 : {count} </h1>
            <button onClick={() => clickTheNumber(count+1)}>click!</button>
             */}
            
            <button onClick={handleStartGame}>Start Game</button>
            <button onClick={handleStopGame}>End Game</button>

            <div className={styles.BtnWrapper}>
                <div className={styles.GameBtn}>1</div>
                <div className={styles.GameBtn}>1</div>
                <div className={styles.GameBtn}>1</div>
                <div className={styles.GameBtn}>1</div>
                <div className={styles.GameBtn}>1</div>
                <div className={styles.GameBtn}>1</div>
                <div className={styles.GameBtn}>1</div>
                <div className={styles.GameBtn}>1</div>
                <div className={styles.GameBtn}>1</div>
            </div>
        </div>
    );
};

// prop-types로 props 검증 추가
Game.propTypes = {
    // icon: PropTypes.elementType.isRequired, // icon prop을 React 컴포넌트로 기대
    // link: PropTypes.string.isRequired       // link prop은 문자열로 기대
    };

export default Game;
