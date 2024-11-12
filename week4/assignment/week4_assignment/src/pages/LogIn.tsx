import {useTheme} from "@emotion/react";
import { Link } from "react-router-dom";

import MainBtn from "../components/MainBtn";
import TextField from "../components/TextField";
import styled from '@emotion/styled'


//스타일
const Container = styled.div`
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
`;

const Title = styled.h1`
    font-size: 2.4rem;
    color: #000;
    text-align: center;
    margin: 2rem 0;
    font-weight: bold;
`;

const StyledLink = styled(Link)`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.gray};
    text-align: center;
    padding-top: 2rem;
    cursor: pointer;
    text-decoration: underline;
    display: inline-block;

    &:visited {
        color: ${({ theme }) => theme.colors.gray};  /* visited 상태에서도 동일한 색상 유지 */
    }
`;

const LogIn = () => {
    const theme = useTheme();

    return (
        <Container>
            <Title>로그인</Title>
            <TextField placeholder="아이디" />
            <TextField
                type="password"
                placeholder="비밀번호"
            />
            <MainBtn 
                color={theme.colors.primary_400}
                hoverColor={theme.colors.primary_700}
                activeColor={theme.colors.primary_700}
            >
                로그인
            </MainBtn>
            <StyledLink to="/signup">
                    회원가입
            </StyledLink>
        </Container>
    );
};

export default LogIn;