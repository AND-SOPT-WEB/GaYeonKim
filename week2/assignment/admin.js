import { members } from "./data.js";

const modal = document.querySelector('.modal');
const modalOpen = document.querySelector('#add');
const modalClose = document.querySelector('.close-btn');

//열기 버튼을 눌렀을 때 모달팝업이 열림
modalOpen.addEventListener('click',function(){
  	//'on' class 추가
    modal.classList.add('on');
});

//닫기 버튼을 눌렀을 때 모달팝업이 닫힘
modalClose.addEventListener('click',function(){
    //'on' class 제거
    modal.classList.remove('on');
});

// 로컬 스토리지 

//setItem
localStorage.setItem('data', JSON.stringify(members));

// 로컬스토리지에서 멤버 데이터를 가져오는 함수
function getMembers() {
    const members = localStorage.getItem('data');
    //JSON.parse() : 문자열을 자바스크립트 객체로 바꾸는 것!
    return JSON.parse(members);
}


const member = getMembers(); //객체를 member에 담음
const tableBody = document.querySelector('tbody'); 

// 각 멤버 데이터를 표의 행으로 추가
member.forEach(member => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td><input type="checkbox" name="checkbox" /></td>
    <td>${member.name}</td>
    <td>${member.englishName}</td>
    <td><a target="_blank" href="https://github.com/${member.github}" style="text-decoration: underline">${member.github}</a></td>
    <td>${member.gender === 'female' ? '여자' : '남자'}</td>
    <td>${member.role}</td>
    <td>${member.firstWeekGroup}</td>
    <td>${member.secondWeekGroup}</td>
    `;
    tableBody.appendChild(row);
});


document.querySelector('#checkAll');
checkAll.addEventListener('click', function(){

    const isChecked = checkAll.checked;

    if(isChecked){
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        for(const checkbox of checkboxes){
            checkbox.checked = true;
        }
    }

    else{
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        for(const checkbox of checkboxes){
            checkbox.checked = false;
        }
    }
})
