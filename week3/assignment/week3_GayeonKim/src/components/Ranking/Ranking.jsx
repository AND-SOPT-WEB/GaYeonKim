import { useState, useEffect } from 'react';
import styles from './Ranking.module.css';  // CSS 모듈 임포트

const Ranking = () => {
    const [rankingData, setRankingData] = useState([]);

    const getGameDataFromLocalStorage = () => {
        const gameData = [];
        //for문을 돌면서 데이터를 들고옴.
        for (let i = 0; i < localStorage.length; i++) {
            const gameDataItem = JSON.parse(localStorage.getItem(localStorage.key(i)));
            gameData.push(gameDataItem);
        }
        return gameData;
    }

    // 랭킹 데이터를 로컬스토리지에서 불러온 다음 data로 설정함.
    useEffect(() => {
        const data = getGameDataFromLocalStorage();
        setRankingData(data);
    }, []);

    // 초기화 버튼 클릭 시 로컬스토리지의 데이터를 초기화
    const resetRankingData = () => {
        localStorage.clear();  // 로컬스토리지 전체 초기화
        setRankingData([]);  // 랭킹 데이터 상태도 초기화 해줘야함
    };

    return (
        <div className={styles.tableWrapper}>
            <div className={styles.headerWrapper}>
                <h1>랭킹</h1>
                <button className={styles.resetButton} onClick={resetRankingData}>초기화</button>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>타임스탬프</th>
                        <th>레벨</th>
                        <th>플레이 시간</th>
                    </tr>
                </thead>
                <tbody>
                        {/* 랭킹이 있다면(길이가 0이상이라면) 맵 돌면서 row 찍기 */}
                        {rankingData.length > 0 ? (
                            rankingData.map((data, index) => (
                                <tr key={index}>
                                    <td>{new Date(data.startTime).toLocaleString()}</td>
                                    <td>{data.level}</td>
                                    <td>{data.playTime}s</td>
                                </tr>
                            ))
                            // 아니라면 저장된 랭킹 없지롱~
                        ) : (
                            <tr>
                                <td colSpan="3">저장된 랭킹이 없습니다.</td>
                            </tr>
                        )}
                        {/* <td>2024-11-06 오후 8시 00분</td>
                        <td>1</td>
                        <td>10.23s</td> */}
                </tbody>
            </table>
        </div>
    );
};

export default Ranking;
