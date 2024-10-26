// 함수의 기본형  () => {}
import { useState } from 'react'
import styled from "@emotion/styled"

const Card = ({name, engname, gitHubID}) => {
    const [like, setLike] = useState(0);

    const handleClickButton = () => {
        setLike((prev) => prev+1);
    };

    return (
        <CardContainer>
            <h1>
                {`이름: ${name}`}
            </h1>
            <p>
                {`영어이름: ${engname}`}
            </p>
            <p>
                {`깃허브아이디: ${gitHubID}`}
            </p>
            <div>
                <span>{`좋아요 수: ${like}`}</span>
                <button onClick={handleClickButton}>좋아요</button>
            </div>
        </CardContainer>
    )

}

export default Card


// 태그 이름을 잘 설정하면 나중에 코드 가독성이 올라감.
const CardContainer = styled.div`
    padding: 20px;
    border: 1px solid #000;
    border-radius: 4px;
`;