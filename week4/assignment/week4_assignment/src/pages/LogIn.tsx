import { useState } from "react";
import {useTheme} from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";

import MainBtn from "../components/MainBtn";
import TextField from "../components/TextField";
import styled from '@emotion/styled'

import axios from "axios";


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
    display: block;

    &:visited {
        color: ${({ theme }) => theme.colors.gray};  /* visited 상태에서도 동일한 색상 유지 */
    }
`;

const LogIn = () => {
    const theme = useTheme();

    //상태 추가 -> 여기로 값을 받아서 api 호출
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://211.188.53.75:8080/login", {
                username: username,
                password: password,
            });
            const token = response.data.result.token;
            localStorage.setItem("authToken", token); // 토큰 저장
            console.log("로그인 성공!", response.data);
            navigate("/mypage");
            }
            catch (error) {
                console.error("로그인 실패", error);
                alert(`사용자 정보를 다시 확인해주세요.`)
            }
        }

    return (
        <Container>
            <Title>로그인</Title>
            <TextField 
                placeholder="아이디" 
                onChange={(e) => setUsername(e.target.value)} // 아이디 업데이트
            />
            <TextField
                type="password"
                placeholder="비밀번호"
                onChange={(e) => setPassword(e.target.value)} // 비밀번호 업데이트
            />
            <MainBtn 
                color={theme.colors.primary_400}
                hoverColor={theme.colors.primary_700}
                activeColor={theme.colors.primary_700}
                onClick={handleLogin}
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