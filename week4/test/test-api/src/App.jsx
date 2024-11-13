import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";

function App() {
  const handlePostUser = async () => {
    const response = await axios.post("http://211.188.53.75:8080/user", {
      username : "공룡오",
      password : "qwerty",
      hobby : "전통주 마시기"
    });

    const userNum = response.data.result.no;
    alert(`회원가입에 성공하셨습니다. 회원번호는 ${userNum}입니다.`)
  }

  const handleLogin = async () => {
    const response = await axios.post("http://211.188.53.75:8080/login",{
      username : "공룡오",
      password : "qwerty"
    });

    const userLogin = response;
    console.log(userLogin);
  }


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handlePostUser}>
          회원가입하기
        </button>
        <button onClick={handleLogin}>
          로그인하기
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
