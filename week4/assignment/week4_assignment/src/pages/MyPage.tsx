import { useState } from "react";
import {useTheme} from "@emotion/react";
import { Link } from "react-router-dom";

import MainBtn from "../components/MainBtn";
import TextField from "../components/TextField";
import styled from '@emotion/styled'

interface ContainerProps {
    isVisible: boolean;
}

const Container = styled.div<ContainerProps>`
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #16423C;
  padding: 1rem 6rem;
  width: 100vw;
  box-sizing: border-box;
`

const HeaderText = styled.h1`
    font-size: 2rem;
    color: #fff;
    margin: 2rem 0;
    font-weight: bold;
`

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  font-size: 1.6rem;
  color: white;
`
const Title = styled.h1`
    font-size: 2.4rem;
    color: #000;
    margin: 2rem 0;
    font-weight: bold;
    text-align : center;
`;

const SubTitle = styled.h2`
    font-size: 2rem;
    color: #000;
    text-align: left;
    margin: 2rem 0;
    font-weight: bold;
`;

const StyledText = styled.p`
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.gray};
`

const HeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  display: view === 'hobby' ? 'flex' : 'none';
`

const StyledLink = styled(Link)`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.primary_700};
    text-align: center;
    padding-top: 2rem;
    cursor: pointer;
    display: inline-block;

    &:visited {
        color: ${({ theme }) => theme.colors.primary_700};  /* visited 상태에서도 동일한 색상 유지 */
    }
`;

const MyPage = () => {
    const [view, setView] = useState<string>('hobby'); // 일단 들어가자마자 보이는건 게임 state

    const handleViewChange = (newView:string) => {
        setView(newView); // view 상태를 클릭한 버튼에 따라 변경
      };

    const theme = useTheme();

    return (
        <div>
            <StyledHeader>
                <HeaderLeft>
                    <HeaderText>마이페이지</HeaderText>
                    <button onClick={() => handleViewChange('hobby')}>취미</button>
                    <button onClick={() => handleViewChange('information')}>내정보</button>
                </HeaderLeft>
                <HeaderRight>
                    <StyledLink to="/">
                        로그아웃
                    </StyledLink>
                </HeaderRight>
            </StyledHeader>
            <Container isVisible={view === "hobby"}>
                <Title>취미</Title>
                <SubTitle>나의 취미</SubTitle>
                <StyledText>독서</StyledText>
                <SubTitle>다른 사람들의 취미</SubTitle>
                <TextField
                    type="text"
                    placeholder="사용자 번호"
                />
                <MainBtn
                    color={theme.colors.primary_400}
                    hoverColor={theme.colors.primary_700}
                    activeColor={theme.colors.primary_700}
                >
                    검색
                </MainBtn>
            </Container>
            <Container isVisible={view === "information"}>
                <Title>내 정보 수정하기</Title>
                <SubTitle>새 비밀번호</SubTitle>
                <TextField
                    type="text"
                    placeholder="새 비밀번호를 입력하세요"
                />
                <SubTitle>새 취미</SubTitle>
                <TextField
                    type="text"
                    placeholder="새 취미를 입력하세요"
                />
                <MainBtn
                    color={theme.colors.primary_400}
                    hoverColor={theme.colors.primary_700}
                    activeColor={theme.colors.primary_700}
                >
                    수정하기
                </MainBtn>
            </Container>
        </div>
      )
}

export default MyPage;