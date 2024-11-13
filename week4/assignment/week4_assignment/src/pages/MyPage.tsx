import { useState, useEffect } from "react";
import { useTheme } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import MainBtn from "../components/MainBtn";
import TextField from "../components/TextField";
import styled from "@emotion/styled";

interface ContainerProps {
  isVisible?: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
`;

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #16423c;
  padding: 1rem 6rem;
  width: 100vw;
  box-sizing: border-box;
`;

const HeaderText = styled.h1`
  font-size: 2rem;
  color: #fff;
  margin: 2rem 0;
  font-weight: bold;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  font-size: 1.6rem;
  color: white;
`;
const Title = styled.h1`
  font-size: 2.4rem;
  color: #000;
  margin: 1rem 0;
  font-weight: bold;
  text-align: center;
`;

const SubTitle = styled.h2`
  font-size: 2rem;
  color: #000;
  text-align: left;
  margin: 2rem 0;
  font-weight: bold;
`;

const StyledText = styled.p<ContainerProps>`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.gray};
  margin-top: 1rem;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")}; 
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  display: view === 'hobby' ? 'flex' : 'none';
`;

const StyledLink = styled(Link)`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.primary_700};
  text-align: center;
  padding-top: 2rem;
  cursor: pointer;
  display: inline-block;

  &:visited {
    color: ${({ theme }) =>
      theme.colors.primary_700}; /* visited 상태에서도 동일한 색상 유지 */
  }
`;

const MyPage = () => {
  const [view, setView] = useState<string>("hobby"); // 보이는화면을 결정할 state
  const [hobby, setHobby] = useState<string>(""); // API에서 받아온 취미 정보를 저장할 상태
  const [userNum, setUserNum] = useState<string>(""); //검색을 위한 state
  const [userHobby, setUserHobby] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newHobby, setNewHobby] = useState<string>("");
  const [printNum, setPrintNum] = useState("");

  const handleViewChange = (newView: string) => {
    setView(newView); // view 상태를 클릭한 버튼에 따라 변경
  };

  const theme = useTheme();
  const token = localStorage.getItem("authToken"); // 토큰 불러오기
  const navigate = useNavigate();


  const getMyHobby = async () => {
    try {
      const response = await axios.get(
        "http://211.188.53.75:8080/user/my-hobby",
        {
          headers: { token: token }, // 'token'이라는 키로 헤더에 추가
        }
      );
      console.log("취미 정보:", response.data);
      setHobby(response.data.result.hobby); // 받아온 취미 정보를 상태에 저장
    } catch (error:any) {
      if (error.status === 401) {
        alert(`마이페이지는 로그인 후 접근 가능합니다.`);
        navigate("/");
      } else if (error.status === 403) {
        alert(`유효하지 않은 회원 정보입니다. 다시 로그인 해주세요.`);
        navigate("/");
      }
      console.error("취미 정보 요청 실패", error);
    }
  };

  const getUserHobby = async () => {
    try {
      const response = await axios.get(
        `http://211.188.53.75:8080/user/${userNum}/hobby`,
        {
          headers: { token: token },
        }
      );
      console.log("다른 사람 취미 정보:", response.data);
      setUserHobby(response.data.result.hobby); // 받아온 취미 정보를 상태에 저장
      setPrintNum(userNum);
    } catch (error) {
        alert("취미 정보를 불러오는데 실패했습니다.");
      console.error("취미 정보 요청 실패", error);
    }
  };

  const postNewInformation = async () => {
    try {
      const response = await axios.put(
        `http://211.188.53.75:8080/user`,
        {
          hobby: newHobby,
          password: newPassword,
        },
        { headers: { token: token } }
      );
      console.log("내 정보 변경 완료", response.data);
    } catch (error) {
      console.error("정보 변경 실패", error);
      alert("정보 변경에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  const handleClickEdit = () => {
    if (newPassword !== "" || newHobby !== "") {
      postNewInformation();
    }
  };

  const deleteToken = () => {
    localStorage.removeItem("authToken");
  };

  useEffect(() => {
    getMyHobby();
  }, []);

  return (
    <div>
      <StyledHeader>
        <HeaderLeft>
          <HeaderText>마이페이지</HeaderText>
          <button onClick={() => handleViewChange("hobby")}>취미</button>
          <button onClick={() => handleViewChange("information")}>
            내정보
          </button>
        </HeaderLeft>
        <HeaderRight>
          <StyledLink to="/" onClick={deleteToken}>
            로그아웃
          </StyledLink>
        </HeaderRight>
      </StyledHeader>
      <Container isVisible={view === "hobby"}>
        <Title>취미</Title>
        <SubTitle>나의 취미</SubTitle>
        <StyledText isVisible={true}>{hobby}</StyledText>
        <SubTitle>다른 사람들의 취미</SubTitle>
        <TextField
          type="text"
          placeholder="사용자 번호"
          onChange={(e) => setUserNum(e.target.value)}
        />
        <MainBtn
          color={theme.colors.primary_400}
          hoverColor={theme.colors.primary_700}
          activeColor={theme.colors.primary_700}
          onClick={getUserHobby}
        >
          검색
        </MainBtn>
        <StyledText isVisible={userHobby !== ""}>
          {printNum}번 사용자의 취미: {userHobby}
        </StyledText>
      </Container>
      <Container isVisible={view === "information"}>
        <Title>내 정보 수정하기</Title>
        <SubTitle>새 비밀번호</SubTitle>
        <TextField
          type="text"
          placeholder="새 비밀번호를 입력하세요"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <SubTitle>새 취미</SubTitle>
        <TextField
          type="text"
          placeholder="새 취미를 입력하세요"
          onChange={(e) => setNewHobby(e.target.value)}
        />
        <MainBtn
          color={theme.colors.primary_400}
          hoverColor={theme.colors.primary_700}
          activeColor={theme.colors.primary_700}
          onClick={handleClickEdit}
        >
          수정하기
        </MainBtn>
      </Container>
    </div>
  );
};

export default MyPage;
