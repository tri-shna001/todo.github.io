
const todoInput = document.getElementById('todo_input');
const addButton = document.getElementById('add_button');
const lists = document.getElementById('lists');
const completedCount = document.querySelector('.completed');
const notCompletedCount = document.querySelector('.notcompleted');


let tasks = [];


function addTask() {
  const task = todoInput.value.trim();
  if (task === '') {
    alert('Please fill the task');
  } else {
    tasks.push({ text: task, completed: false });
    todoInput.value = '';
    renderTasks();
  }
}


function renderTasks() {
  lists.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskHTML = `
      <div class="task">
        <div class="content">
          <input type="checkbox" class="text" ${task.completed? 'checked' : ''}>
          <span class="inputed_text" ${task.completed? 'tyle="text-decoration: line-through;"' : ''}>${task.text}</span>
        </div>
        <div class="actions">
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </div>
      </div>
    `;
    lists.innerHTML += taskHTML;
  });
  updateCounts();
}

function updateCounts() {
  const completedTasks = tasks.filter(task => task.completed);
  const notCompletedTasks = tasks.filter(task =>!task.completed);
  completedCount.textContent = `Completed: ${completedTasks.length}`;
  notCompletedCount.textContent = `Not completed: ${notCompletedTasks.length}`;
}

function editTask(taskIndex) {
  const task = tasks[taskIndex];
  const editText = prompt('Edit task:', task.text);
  if (editText!== null && editText!== '') {
    task.text = editText;
    renderTasks();
  }
}


addButton.addEventListener('click', addTask);
lists.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    const taskIndex = Array.prototype.indexOf.call(lists.children, e.target.parentNode.parentNode);
    if (confirm(`Are you sure to delete "${tasks[taskIndex].text}"?`)) {
      tasks.splice(taskIndex, 1);
      renderTasks();
    }
  } else if (e.target.classList.contains('edit')) {
    const taskIndex = Array.prototype.indexOf.call(lists.children, e.target.parentNode.parentNode);
    editTask(taskIndex);
  } else if (e.target.classList.contains('text')) {
    const taskIndex = Array.prototype.indexOf.call(lists.children, e.target.parentNode.parentNode);
    tasks[taskIndex].completed = e.target.checked;
    const taskText = e.target.parentNode.querySelector('.inputed_text');
if (e.target.checked) {
      taskText.style.textDecoration = 'line-through';
      updateCounts();
    } else {
      taskText.style.textDecoration = 'none';
      updateCounts();
    }
  }
});


renderTasks();