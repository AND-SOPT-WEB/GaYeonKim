import { useState, useEffect } from 'react'
import styles from './Game.module.css';


//App에서 넘어오는 두 값, startGame과 stopGame
const Game = ({startGame, stopGame}) => {
    const [numbers, setNumbers] = useState([]);
    const [currentNumber, setCurrentNumber] = useState(1);
    const [isRunning, setIsRunning] = useState(false);
    const [availableNumbers, setAvailableNumbers] = useState([]);
    const [playTime, setPlayTime] = useState(0);

    // const clickTheNumber = (newCount) => {
    //     setCount(newCount); // view 상태를 클릭한 버튼에 따라 변경
    //     // console.log(`view state changed! ${view}`)
    //   };

    //처음 랜덤으로 배치될 1~9
    useEffect(() => {
        setNumbers(shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]));
        setAvailableNumbers(shuffleArray([10, 11, 12, 13, 14, 15, 16, 17, 18]));
    }, []);

    //랜덤으로 섞기
    const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

    const handleTimeUpdate = (time) => {
        setPlayTime(time);
    };

    const resetGame = () => {
        setNumbers(shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]));
        setAvailableNumbers(shuffleArray([10, 11, 12, 13, 14, 15, 16, 17, 18]));
        setCurrentNumber(1);
        setIsRunning(false);
        setPlayTime(0);
    };

    //어떤 숫자를 클릭하는지에 따라 컨트롤 하는 방식이 다름.
    const handleNumberClick = (num, index) => {
        if (num === currentNumber) {
            //1 클릭하면 타이머 시작
            if (currentNumber === 1) {
                setIsRunning(true);
                startGame();
            }

            const updatedNumbers = [...numbers];

            // 1~9를 순서대로 클릭하는 중이라면, 사용 가능한 숫자 중 하나를 랜덤으로 선택하여 대체
            if (currentNumber <= 9) {
                const nextNumber = availableNumbers[0];  // 사용 가능한 숫자 중 첫 번째 숫자 선택
                updatedNumbers[index] = nextNumber;
                setAvailableNumbers(availableNumbers.slice(1));  // 사용된 숫자 제거
                setNumbers(updatedNumbers);
            } 
            // 10~18을 순서대로 클릭하는 중이라면, 클릭한 위치를 빈칸으로 변경
            else if (currentNumber > 9) {
                updatedNumbers[index] = null;  // 빈칸으로 설정
                setNumbers(updatedNumbers);
            }

            setCurrentNumber(currentNumber + 1);  // 다음 숫자로 업데이트

            // 18까지 모두 클릭한 경우 게임 종료
            if (currentNumber === 18) {
                setIsRunning(false);
                stopGame();
                alert(`Game Over! 걸린 시간 : ${playTime}`);
                resetGame();
            }
        }
    };

    return (
        <div className={styles.GameWrapper}>
            <div className={styles.GameHeader}>다음 숫자: {currentNumber}</div>
            <div className={styles.BtnWrapper}>
                {numbers.map((num, index) => (
                    <button
                        key={index}
                        className={styles.GameBtn}
                        onClick={() => handleNumberClick(num, index)}
                        disabled={num === null}  // 빈칸은 클릭 비활성화
                        style={{ opacity: num === null ? 0 : 1 }}
                    >
                        {num !== null ? num : ''}  {/* 빈칸일 경우 표시 X */}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Game;
