import PropTypes from 'prop-types';
import styles from './Timer.module.css';
import {useState, useEffect} from 'react';

const Timer = ({isRunning, onTimeUpdate}) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval;

        if (isRunning){
            const startTime = Date.now(); //시작 시간 설정
            interval = setInterval(() => {
                const playTime = (Date.now() - startTime) / 1000; 
                setTime(playTime);
                onTimeUpdate(playTime.toFixed(2));
            }, 10); //밀리초 단위로 계속 바꿔줌... 아 이거 어렵다 ㅠㅠ
        } else{
            clearInterval(interval);
            setTime(0);
        }

        return () => clearInterval(interval); 

    }, [isRunning]);  //isRunning에 대한 변경 감지 후 실행

    return (
        <div className={styles.timer}>{time.toFixed(2)}</div>
    );
};

export default Timer;
