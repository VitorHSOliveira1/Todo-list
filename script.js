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

// Retrieve todo list items from local storage
let todoListItems = JSON.parse(localStorage.getItem('todoListItems')) || [];

function openAndCloseModal() {
    console.log("openAndCloseModal function called");
    modalAddTask.style.display = modalAddTask.style.display === "flex" ? "none" : "flex";
}

function addEventListenersForEditAndDeleteButtons() {
    // Add event listeners to the edit buttons
    document.querySelectorAll('.edit-btn').forEach((editButton) => {
      editButton.addEventListener('click', (event) => {
        // Get the parent li element
        liElement = event.target.parentNode;
        // Get the label element
        labelElement = liElement.querySelector('label');
        // Create a new modal element
        const editModal = document.createElement('div');
        editModal.className = 'edit-modal';
        editModal.innerHTML = `
            <div style="display: flex; flex-direction: column;">
                <input type="text" value="${labelElement.textContent}" id="edit-input" style="margin-bottom: 10px;">
                <button id="save-edit-btn" style="width: 70px;">Save</button>
            </div>
        `;
        // Add the modal to the li element
        liElement.appendChild(editModal);
        // Add an event listener to the save button
        const saveEditBtn = editModal.querySelector('#save-edit-btn');
        saveEditBtn.addEventListener('click', (event) => {
          // Get the new task text
          newTaskText = editModal.querySelector('#edit-input').value.trim();
          // Replace the label element with the new text
          labelElement.textContent = newTaskText;
          // Update the todo list item in local storage
          const index = Array.prototype.indexOf.call(todoList.children, liElement);
          todoListItems[index].text = newTaskText;
          localStorage.setItem('todoListItems', JSON.stringify(todoListItems));
          // Remove the modal
          liElement.removeChild(editModal);
        });
      });
    });

    // Add event listeners to the delete buttons
    document.querySelectorAll('.delete-btn').forEach((deleteButton) => {
      deleteButton.addEventListener('click', (event) => {
        // Get the parent li element
        liElement = event.target.parentNode;
        // Remove the li element from the todo list
        todoList.removeChild(liElement);
        // Remove the todo list item from local storage
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
        // Add the new task to the todo list
        newTaskLi = document.createElement("li");
        newTaskLi.innerHTML = `
            <input type="checkbox"> 
            <label for="">${newTask}</label>
            <button class="edit-btn"><img src="./images/lapis.png" alt="lapis"height="15px" width="15px"></button>
            <button class="delete-btn"><img src="./images/lixeira.png" alt="lixeira" height="15px" width="15px"></button>
        `;
        todoList.appendChild(newTaskLi);
        newTaskInput.value = "";

        // Add the new task to local storage
        todoListItems.push({ text: newTask, completed: false });
        localStorage.setItem('todoListItems', JSON.stringify(todoListItems));
    }
    openAndCloseModal();
    addEventListenersForEditAndDeleteButtons();
});

// Load todo list items from local storage
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

// Add event listener to the "open-add-task" button
openAddTask.addEventListener("click", openAndCloseModal);

function turnAllThingsPink(){
  // Change the background color of the body
  document.body.style.backgroundColor = 'pink';
  
  // Change the text color of the todo list
  document.querySelector('#todo-list').style.color = 'pink';
  
  // Change the border color of the todo list items
  document.querySelectorAll('#todo-list li').forEach((li) => {
      li.style.borderColor = 'pink';
  });
  
  // Change the color of the edit and delete buttons
  document.querySelectorAll('.edit-btn, .delete-btn').forEach((button) => {
      button.style.backgroundColor = 'pink';
      button.style.borderColor = 'pink';
  });
  
  // Change the color of the add task button
  document.querySelector('#addTaskBtn').style.backgroundColor = 'pink';
  document.querySelector('#addTaskBtn').style.borderColor = 'pink';
  
    // Change the color of the new task input
  document.querySelector('#newTaskInput').style.borderColor = 'pink';
  
  // Change the color of the modal add tasks
  document.querySelector('.modal-add-tasks').style.borderColor = 'pink';
  
  // Change the color of the anaMarciaCorna element
  document.querySelector('.ana-marcia-corna').style.backgroundColor = 'pink';

  document.querySelector(".center-todo").style.color = 'pink';
}

anaMarciaCorna.addEventListener("click", turnAllThingsPink)