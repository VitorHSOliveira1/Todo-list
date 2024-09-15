const openAddTask = document.querySelector(".open-add-task");
const modalAddTask = document.querySelector(".modal-add-tasks");
const addTaskForm = document.querySelector("#addTaskForm");
const newTaskInput = document.querySelector("#newTaskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const todoList = document.querySelector("#todo-list");
const anaMarciaCorna = document.querySelector(".ana-marcia-corna")

let newTask;
let newTaskLi;
let liElement;
let labelElement;
let inputElement;
let newLabelElement;
let newTaskText;


let todoListItems = JSON.parse(localStorage.getItem('todoListItems')) || [];

function openAndCloseModal() {
    console.log("openAndCloseModal function called");
    modalAddTask.style.display = modalAddTask.style.display === "flex" ? "none" : "flex";
}

function addEventListenersForEditAndDeleteButtons() {

    document.querySelectorAll('.edit-btn').forEach((editButton) => {
      editButton.addEventListener('click', (event) => {
        liElement = event.target.parentNode;
        labelElement = liElement.querySelector('label');
        const editModal = document.createElement('div');
        editModal.className = 'edit-modal';
        editModal.innerHTML = `
            <div style="display: flex; flex-direction: column;">
                <input type="text" value="${labelElement.textContent}" id="edit-input" style="margin-bottom: 10px;">
                <button id="save-edit-btn" style="width: 70px;">Save</button>
            </div>
        `;
          
        liElement.appendChild(editModal);
        const saveEditBtn = editModal.querySelector('#save-edit-btn');
        saveEditBtn.addEventListener('click', (event) => {
          newTaskText = editModal.querySelector('#edit-input').value.trim();
          labelElement.textContent = newTaskText;
          const index = Array.prototype.indexOf.call(todoList.children, liElement);
          todoListItems[index].text = newTaskText;
          localStorage.setItem('todoListItems', JSON.stringify(todoListItems));
          liElement.removeChild(editModal);
        });
      });
    });

    document.querySelectorAll('.delete-btn').forEach((deleteButton) => {
      deleteButton.addEventListener('click', (event) => {
        liElement = event.target.parentNode;
        todoList.removeChild(liElement);
        const index = Array.prototype.indexOf.call(todoList.children, liElement);
        todoListItems.splice(index, 1);
        localStorage.setItem('todoListItems', JSON.stringify(todoListItems));
      });
    });
}

addTaskForm.addEventListener("submit", function(event) {
    event.preventDefault();
    newTask = newTaskInput.value.trim();
    if (newTask !== "") {
        newTaskLi = document.createElement("li");
        newTaskLi.innerHTML = `
            <input type="checkbox"> 
            <label for="">${newTask}</label>
            <button class="edit-btn"><img src="./images/lapis.png" alt="lapis"height="15px" width="15px"></button>
            <button class="delete-btn"><img src="./images/lixeira.png" alt="lixeira" height="15px" width="15px"></button>
        `;
        todoList.appendChild(newTaskLi);
        newTaskInput.value = "";

        todoListItems.push({ text: newTask, completed: false });
        localStorage.setItem('todoListItems', JSON.stringify(todoListItems));
    }
    openAndCloseModal();
    addEventListenersForEditAndDeleteButtons();
});

todoListItems.forEach((item) => {
  const newTaskLi = document.createElement("li");
  newTaskLi.innerHTML = `
    <input type="checkbox"> 
    <label for="">${item.text}</label>
    <button class="edit-btn"><img src="./images/lapis.png" alt="lapis"height="15px" width="15px"></button>
    <button class="delete-btn"><img src="./images/lixeira.png" alt="lixeira" height="15px" width="15px"></button>
  `;
  todoList.appendChild(newTaskLi);
  addEventListenersForEditAndDeleteButtons();
});

openAddTask.addEventListener("click", openAndCloseModal);

function turnAllThingsPink(){
  document.body.style.backgroundColor = 'pink';
  
  document.querySelector('#todo-list').style.color = 'pink';
  
  document.querySelectorAll('#todo-list li').forEach((li) => {
      li.style.borderColor = 'pink';
  });
  
  document.querySelectorAll('.edit-btn, .delete-btn').forEach((button) => {
      button.style.backgroundColor = 'pink';
      button.style.borderColor = 'pink';
  });
  
  document.querySelector('#addTaskBtn').style.backgroundColor = 'pink';
  document.querySelector('#addTaskBtn').style.borderColor = 'pink';
  document.querySelector('#newTaskInput').style.borderColor = 'pink';
  document.querySelector('.modal-add-tasks').style.borderColor = 'pink';
  document.querySelector('.ana-marcia-corna').style.backgroundColor = 'pink';
  document.querySelector(".center-todo").style.color = 'pink';
}

anaMarciaCorna.addEventListener("click", turnAllThingsPink)
