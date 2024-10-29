import { members } from "./data.js";

// 로컬 스토리지 
//setItem
//이미 불러와져있는 data가 없으면 setItem 함수 호출
if (!localStorage.getItem('data')) {
    localStorage.setItem('data', JSON.stringify(members));
}

// 로컬스토리지에서 멤버 데이터를 가져오는 함수
function getMembers() {
    const members = localStorage.getItem('data');
    //JSON.parse() : 문자열을 자바스크립트 객체로 바꾸는 것!
    return JSON.parse(members);
}

//로컬 스토리지에 멤버를 저장하는 함수 : 삭제&추가 반영할 때 씀
function saveMembers(members){
    localStorage.setItem('data', JSON.stringify(members));
}

const tableBody = document.querySelector('tbody'); 

// 각 멤버 데이터를 표의 행으로 추가
// 삼항 연산자 활용 : female이면 여자로, 아니면 남자로
// 멤버 추가 됐을 때 다시 테이블 업데이트 해야하므로 렌더링이 필요함 -> 함수형으로 변경
function renderTable(members = getMembers()) {
    tableBody.innerHTML = ''; // 기존 테이블 내용을 초기화
    members.forEach(member => {
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
}

renderTable();

//하나라도 해제되면 전체 선택 체크박스 해제해야함...ㅠㅠㅠ!! 
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

// '선택삭제' 버튼을 눌렀을 때 체크된 row들을 삭제하는 함수
document.querySelector('#delete').addEventListener('click', function() {
    let members = getMembers();
    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]:checked'); // 체크된 체크박스 선택

    checkboxes.forEach(checkbox => {
        const row = checkbox.closest('tr'); //가장 가까운 부모 tr 찾기!
        const memberName = row.children[1].innerText; //그 부모 tr내 children[1]이 name이니까
        members = members.filter(member => member.name !== memberName);
        row.remove(); // row 삭제
    });

    saveMembers(members); // 변경된 멤버 데이터 로컬 스토리지에 저장하기
});

//모달 JS

//모달 요소들 들고오기
const modal = document.querySelector('.modal');
const modalOpenBtn = document.querySelector('#add');
const modalCloseBtn = document.querySelector('.close-btn');
const addMemberBtn = document.querySelector('#add-member');

//열기 버튼을 눌렀을 때 모달팝업이 열림
modalOpenBtn.addEventListener('click',function(){
  	//'on' class 추가
    modal.classList.add('on');
});

//닫기 버튼을 눌렀을 때 모달팝업이 닫힘
modalCloseBtn.addEventListener('click',function(){
    //'on' class 제거
    modal.classList.remove('on');
});

// 새로운 멤버 추가 함수
function addMember(member) {
    const members = getMembers();
    members.push(member);
    saveMembers(members);
    renderTable(); // 테이블 업데이트
    modal.classList.remove('on'); // 멤버 추가 후 모달 닫기
}

//들고온 멤버 로컬 스토리지에 저장하기


// '추가' 버튼 클릭 시 입력 값 가져와 멤버 추가
addMemberBtn.addEventListener('click', () => {
    // 모달 내 입력 필드 값 가져오기
    const name = document.querySelector('#add-name').value;
    const englishName = document.querySelector('#add-engName').value;
    const github = document.querySelector('#add-githubID').value;
    const gender = document.querySelector('#add-gender').value;
    const role = document.querySelector('#add-role').value;
    const firstWeekGroup = document.querySelector('#add-week1').value;
    const secondWeekGroup = document.querySelector('#add-week2').value;

    const lastID = members[members.length-1].id;

    // 새 멤버 객체 생성
    const newMember = {
        id: lastID+1,
        name,
        englishName,
        github,
        gender,
        role,
        firstWeekGroup: parseInt(firstWeekGroup),
        secondWeekGroup: parseInt(secondWeekGroup),
    };

    // 멤버 추가
    addMember(newMember);
});

//필터링 기능 구현

//초기화 버튼 구현
document.querySelector('#reset').addEventListener('click', function() {
    document.querySelectorAll('.text-box').forEach(input => input.value = ''); // 텍스트 입력 필드 초기화
    document.querySelectorAll('select').forEach(select => select.value = ''); // 선택 필드 초기화
    renderTable(); //필터링 초기화
});


//필터링
function filtering(){
    const members = getMembers();
    const nameFilter = document.querySelector('#filter-name').value;
    const engNameFilter = document.querySelector('#filter-engName').value;
    const githubIDFilter = document.querySelector('#filter-githubID').value;
    const genderFilter = document.querySelector('#filter-gender').value;
    const roleFilter = document.querySelector('#filter-role').value;
    const firstWeekGroupFilter = document.querySelector('#filter-week1').value;
    const secondWeekGroupFilter = document.querySelector('#filter-week2').value;

    let filteredMembers = members;

    // 변수에 값이 있을 시, 필터에 적힌 값과 멤버 배열에 담긴 값을 비교해서, filteredMembers로 반환한다!
    if (nameFilter) {
        filteredMembers = filteredMembers.filter(member => member.name === nameFilter);
    }
    if (engNameFilter) {
        filteredMembers = filteredMembers.filter(member => member.englishName === engNameFilter);
    }
    if (githubIDFilter) {
        filteredMembers = filteredMembers.filter(member => member.github == githubIDFilter);
    }
    if (genderFilter) {
        filteredMembers = filteredMembers.filter(member => member.gender === genderFilter);
    }
    if (roleFilter) {
        filteredMembers = filteredMembers.filter(member => member.role === roleFilter);
    }
    if (firstWeekGroupFilter) {
        filteredMembers = filteredMembers.filter(member => member.firstWeekGroup == firstWeekGroupFilter);
    }
    if (secondWeekGroupFilter) {
        filteredMembers = filteredMembers.filter(member => member.secondWeekGroup == secondWeekGroupFilter);
    }
    

    console.log(filteredMembers);
    // 필터링 결과를 테이블에 렌더링
    renderTable(filteredMembers);
}

// 필터 버튼 클릭 시 필터링 적용
document.querySelector('#search').addEventListener('click', filtering);




