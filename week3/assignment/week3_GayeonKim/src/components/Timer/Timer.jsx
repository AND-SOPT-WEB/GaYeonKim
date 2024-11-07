import PropTypes from 'prop-types';
import styles from './Timer.module.css';
import {useState, useEffect} from 'react';

const Timer = ({isRunning, onTimeUpdate, playTime}) => {
    useEffect(() => {
        let interval;

        if (isRunning){
            const startTime = Date.now(); //시작 시간 설정
            interval = setInterval(() => {
                const newPlayTime = (Date.now() - startTime) / 1000; 
                onTimeUpdate(newPlayTime);
            }, 10); //밀리초 단위로 계속 바꿔줌... 아 이거 어렵다 ㅠㅠ
        } else{
            clearInterval(interval);
        }

        return () => clearInterval(interval); 

    }, [isRunning]);  //isRunning에 대한 변경 감지 후 실행

    return (
        <div className={styles.timer}>{playTime.toFixed(2)}</div>
    );
};

export default Timer;
