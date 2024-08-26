document.addEventListener('DOMContentLoaded', () => {
  const todoList = document.getElementById('todoList');
  const addTodoBtn = document.getElementById('addTodoBtn');
  const todoForm = document.getElementById('todoForm');
  const todoInput = document.getElementById('todoInput');
  const emptyState = document.getElementById('emptyState');
  
  let todos = [];

  function updateEmptyState() {
      emptyState.style.display = todos.length === 0 ? 'block' : 'none';
  }

  function renderTodos() {
      todoList.innerHTML = '';
      todos.forEach((todo, index) => {
          const todoItem = document.createElement('li');
          todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;

          const todoText = document.createElement('span');
          todoText.textContent = todo.text;
          todoItem.appendChild(todoText);

          const actionsContainer = document.createElement('div');
          actionsContainer.className = 'todo-actions';

          const toggleBtn = document.createElement('button');
          toggleBtn.textContent = todo.completed ? 'Uncomplete' : 'Complete';
          toggleBtn.onclick = () => toggleTodoStatus(index);
          actionsContainer.appendChild(toggleBtn);

          const editBtn = document.createElement('button');
          editBtn.textContent = 'Edit';
          editBtn.onclick = () => editTodoItem(index);
          actionsContainer.appendChild(editBtn);

          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Delete';
          deleteBtn.onclick = () => deleteTodoItem(index);
          actionsContainer.appendChild(deleteBtn);

          todoItem.appendChild(actionsContainer);
          todoList.appendChild(todoItem);
      });
      updateEmptyState();
  }

  function addTodo() {
      const todoText = todoInput.value.trim();
      if (todoText !== '') {
          todos.push({ text: todoText, completed: false });
          todoInput.value = '';
          renderTodos();
      }
  }

  function editTodoItem(index) {
      const newText = prompt('Edit your task:', todos[index].text);
      if (newText !== null && newText.trim() !== '') {
          todos[index].text = newText.trim();
          renderTodos();
      }
  }

  function deleteTodoItem(index) {
      todos.splice(index, 1);
      renderTodos();
  }

  function toggleTodoStatus(index) {
      todos[index].completed = !todos[index].completed;
      renderTodos();
  }

  addTodoBtn.addEventListener('click', () => {
      todoForm.classList.toggle('hidden');
  });

  addTodoBtn.addEventListener('click', addTodo);

  updateEmptyState();
});
