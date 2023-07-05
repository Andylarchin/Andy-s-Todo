// Selectors and grabbing things form html
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Functions

const filterTodo = (e) => {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
    }
  });
};

const addTodo = (event) => {
  event.preventDefault();

  //   Todo Div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  //   Create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  // Add todo to local storage
//   saveLocalTodos(todoInput.value);

  //   Check mark button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fa fa-check"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);

  //   Delete Button
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
  deleteButton.classList.add('delete-btn');
  todoDiv.appendChild(deleteButton);
  //   Append to list
  todoList.appendChild(todoDiv);

  todoInput.value = '';
};

const deleteCheck = (e) => {
  const item = e.target;
  console.log(item.classList);
  if (item.classList[0] === 'delete-btn') {
    const todo = item.parentElement;
    todo.classList.add('fall');
    todo.addEventListener('transitionend', () => {
      todo.remove();
    });
  }

  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
};


const saveToLocalStorage = (todo) => {
    let todos; 
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage).getItem('todos');
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Event listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
