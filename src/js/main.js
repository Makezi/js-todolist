import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from './constants';

(function() {
  // Element selectors
  const todoInput = document.querySelector('.todo-input');
  const todoCounter = document.querySelector('.todo-counter');
  const todoList = document.querySelector('.todo-list');
  const filters = document.querySelector('.filters');
  const clearBtn = document.querySelector('.clear-btn');

  let todos = JSON.parse(
    localStorage.getItem('todos') || [
      { text: 'Read: Like no one ever was', completed: true },
      { text: 'Read: I want to be the very best', completed: true },
      { text: 'Clean the dishes', completed: false }
    ]
  );
  let activeFilter = SHOW_ALL;

  function addTodo(event) {
    // Prevent the form from refreshing the page
    event.preventDefault();
    const text = this.querySelector('input').value;
    if (!text) return;
    todos.push({ text, completed: false });
    localStorage.setItem('todos', JSON.stringify(todos));
    renderList(todos, todoList);
    this.reset();
  }

  function renderList(todos = [], todoList) {
    todoList.innerHTML = '';
    filterList(todos).map((todo, index) => {
      todoList.insertBefore(addTodoDOM(todo, index), todoList.firstChild);
    });
    updateCounter();
  }

  function addTodoDOM(todo, index) {
    // List item
    const itemDOM = document.createElement('li');
    itemDOM.setAttribute('class', 'todo-item');

    // Input checkbox
    const completeDOM = document.createElement('input');
    completeDOM.setAttribute('type', 'checkbox');
    completeDOM.setAttribute('id', `item${index}`);
    completeDOM.setAttribute('data-index', index);
    if (todo.completed) completeDOM.setAttribute('checked', todo.completed);

    // Custom checkbox div
    const checkboxDOM = document.createElement('div');
    checkboxDOM.setAttribute('class', 'todo-checkbox');

    // Label linked to input checkbox
    const labelDOM = document.createElement('label');
    labelDOM.setAttribute('for', `item${index}`);
    labelDOM.innerText = todo.text;
    labelDOM.insertBefore(checkboxDOM, labelDOM.firstChild);

    // Delete button
    const deleteDOM = document.createElement('button');
    deleteDOM.setAttribute('class', 'todo-delete');
    deleteDOM.innerHTML = '&times;';

    // Append input checkbox, label and delete button to list item DOM
    itemDOM.appendChild(completeDOM);
    itemDOM.appendChild(labelDOM);
    itemDOM.appendChild(deleteDOM);

    return itemDOM;
  }

  function updateCounter() {
    const notCompleted = todos.reduce((sum, todo) => {
      return (sum += !todo.completed ? 1 : 0);
    }, 0);
    todoCounter.innerHTML = `${notCompleted} task(s)`;
  }

  function toggleComplete(event) {
    // Only keep track of element that are "input"
    if (!event.target.matches('input')) return;
    const index = event.target.dataset.index;
    todos[index].completed = !todos[index].completed;
    localStorage.setItem('todos', JSON.stringify(todos));
    renderList(todos, todoList);
  }

  function deleteTodo(event) {
    // Only keep track of elements that are passed that are "button"
    if (!event.target.matches('button')) return;
    const index = event.target.parentNode.querySelector('input').dataset.index;
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderList(todos, todoList);
  }

  function filterList(todos) {
    switch (activeFilter) {
      case SHOW_ACTIVE:
        return todos.filter(todo => !todo.completed);
      case SHOW_COMPLETED:
        return todos.filter(todo => todo.completed);
      case SHOW_ALL:
      default:
        return todos;
    }
  }

  function setActiveFilter(event) {
    activeFilter = event.target.dataset.filter;
    renderList(todos, todoList);
  }

  function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderList(todos, todoList);
  }

  // Event listeners
  todoInput.addEventListener('submit', addTodo);
  todoList.addEventListener('click', toggleComplete);
  todoList.addEventListener('click', deleteTodo);
  filters.addEventListener('click', setActiveFilter);
  clearBtn.addEventListener('click', clearCompleted);

  renderList(todos, todoList);
})();
