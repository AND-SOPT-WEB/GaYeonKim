import { useState } from 'react'
import './App.css'
import Card from './components/Card'
import {members} from "./data"

function App() {
  const name = "김가연";
  const engname = "GaYeonKim";
  const gitHubID = "ayla-12";
  return (
    <>
    {
      // 중괄호 안에 있는거는 js 라고 생각을 함 react가.. 똑독하네
      members.map((member)=>{
        return(
          <Card name={member.name} engname={member.englishName} gitHubID={member.github}/>
        )
      })
    }

    </>
  )
}

export default App
