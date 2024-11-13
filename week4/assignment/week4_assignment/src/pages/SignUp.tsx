import { useState } from "react";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import MainBtn from "../components/MainBtn";
import TextField from "../components/TextField";
import styled from '@emotion/styled';

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

const Title = styled.h1`
    font-size: 2.4rem;
    color: #000;
    text-align: center;
    margin: 2rem 0;
    font-weight: bold;
`;

const SubTitle = styled.h2`
    font-size: 2rem;
    color: #000;
    text-align: left;
    margin: 2rem 0;
`;

const StyledLink = styled(Link)`
    color: ${({ theme }) => theme.colors.primary_700};
    cursor: pointer;
    text-decoration: underline;

    &:visited {
        color: ${({ theme }) => theme.colors.primary_700};
    }
`;

const Caption = styled.p`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.gray};
    text-align: center;
    padding-top: 2rem;
`;

interface FormValues {
    name: string;
    password: string;
    confirmPassword: string;
    hobby: string;
}

const SignUp = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [step, setStep] = useState<number>(1);
    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        password: '',
        confirmPassword: '',
        hobby: ''
    });

    const handleChange = (field: keyof FormValues, value: string) => {
        setFormValues((prevValues) => ({ ...prevValues, [field]: value }));
    };

    //저번처럼 game||ranking이 아닌 숫자로 구현. +1만 하면 된다!
    const handleNextStep = () => {
        setStep(step + 1);
    };

    const isNextButtonActive = (step: number): boolean => {
        if (step === 1) return !!formValues.name;
        if (step === 2) return !!(formValues.password && (formValues.password === formValues.confirmPassword));
        if (step === 3) return !!formValues.hobby;
        return false;
    };

    const handlePostUser = async () => {
        try{
            const response = await axios.post("http://211.188.53.75:8080/user", {
                username : formValues.name,
                password : formValues.password,
                hobby : formValues.hobby
        });
        const userNum = response.data.result.no;
        alert(`회원가입에 성공하셨습니다. 회원번호는 ${userNum}입니다.`)
        navigate("/"); 
        } catch (error) {
            alert(`예상치 못한 문제가 발생하였습니다. 관리자에게 문의해주세요.`)
        }
    }


    return (
        <div>
            <Container isVisible={step === 1}>
                <Title>회원가입</Title>
                <SubTitle>이름</SubTitle>
                <TextField
                    placeholder="사용자 이름을 입력해주세요"
                    value={formValues.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
                />
                <MainBtn
                    color={theme.colors.primary_400}
                    hoverColor={theme.colors.primary_700}
                    activeColor={theme.colors.primary_700}
                    active={isNextButtonActive(1)}
                    onClick={handleNextStep}
                >
                    다음
                </MainBtn>
                <Caption>
                    이미 회원이신가요? <StyledLink to="/">로그인</StyledLink>
                </Caption>
            </Container>

            <Container isVisible={step === 2}>
                <Title>회원가입</Title>
                <SubTitle>비밀번호</SubTitle>
                <TextField
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    value={formValues.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('password', e.target.value)}
                    showToggleIcon={true}
                />
                <TextField
                    type="password"
                    placeholder="비밀번호 확인"
                    value={formValues.confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('confirmPassword', e.target.value)}
                />
                <MainBtn
                    color={theme.colors.primary_400}
                    hoverColor={theme.colors.primary_700}
                    activeColor={theme.colors.primary_700}
                    active={isNextButtonActive(2)}
                    onClick={handleNextStep}
                >
                    다음
                </MainBtn>
                <Caption>
                    이미 회원이신가요? <StyledLink to="/">로그인</StyledLink>
                </Caption>
            </Container>

            <Container isVisible={step === 3}>
                <Title>회원가입</Title>
                <SubTitle>취미</SubTitle>
                <TextField
                    placeholder="취미를 입력해주세요"
                    value={formValues.hobby}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('hobby', e.target.value)}
                />
                <MainBtn
                    color={theme.colors.primary_400}
                    hoverColor={theme.colors.primary_700}
                    activeColor={theme.colors.primary_700}
                    active={isNextButtonActive(3)}
                    onClick={handlePostUser}
                >
                    회원가입
                </MainBtn>
                <Caption>
                    이미 회원이신가요? <StyledLink to="/">로그인</StyledLink>
                </Caption>
            </Container>
        </div>
    );
};

export default SignUp;
