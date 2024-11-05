import PropTypes from 'prop-types';
import styles from './Timer.module.css';
import {useState, useEffect} from 'react';

const Timer = ({isRunning, onTimeUpdate}) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval;

        if (isRunning){
            const startTime = Date.now() - time;
            interval = setInterval(() => {
                const playTime = (Date.now() - startTime) / 1000;
                setTime(playTime);
                onTimeUpdate(playTime.toFixed(2));
            }, 10);
        } else if (!isRunning && time !== 0){
            clearInterval(interval);
            setTime(0);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    return (
        <div>{time.toFixed(2)}</div>
    );
};

// // prop-types로 props 검증 추가
// Timer.propTypes = {
//     // icon: PropTypes.elementType.isRequired, // icon prop을 React 컴포넌트로 기대
//     // link: PropTypes.string.isRequired       // link prop은 문자열로 기대
//     };

export default Timer;
