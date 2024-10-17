const todoList = document.querySelector(".todo-list");
const button = document.querySelector(".add-button");
const text = document.querySelector(".text-box");
const dataArray = [];


const buttonClick = () => {
    console.log("Button clicked! li is added");
    const li = document.createElement("li");
    li.textContent= text.value;
    const deleteBtn = document.createElement("button");
    const deleteBtnText = document.createTextNode("삭제");
    

    deleteBtn.addEventListener("click", () => {
        console.log("delete button is clicked.");
        todoList.removeChild(li);
        localStorage.removeItem(li);
    });

    dataArray.push(li);
    deleteBtn.appendChild(deleteBtnText);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
    console.log(li)
    localStorage.setItem(li, text.value);

    text.value = "";
};

button.addEventListener("click", buttonClick);

// querySelector 과 querySelectorAll 의 차이점 -> 태그를 불러오면 제일 위에것만 혹은 전부다