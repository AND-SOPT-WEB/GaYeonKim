import { useState, useEffect } from 'react';
import styles from './Ranking.module.css';  // CSS 모듈 임포트

const Ranking = () => {

    return (
        <div className={styles.tableWrapper}>
            <div className={styles.headerWrapper}>
                <h1>랭킹</h1>
                <button className={styles.resetButton}>초기화</button>
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
                    <tr>
                        <td>2024-11-06 오후 8시 00분</td>
                        <td>1</td>
                        <td>10.23s</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Ranking;
