const Game = () => {
    return (
        <div>게임 창입니다.</div>
    );
};

// prop-types로 props 검증 추가
Game.propTypes = {
    // icon: PropTypes.elementType.isRequired, // icon prop을 React 컴포넌트로 기대
    // link: PropTypes.string.isRequired       // link prop은 문자열로 기대
    };

export default Game;
