const SHOW_ALL = "all";
const SHOW_ACTIVE = "active";
const SHOW_COMPLETED = "completed";

const todoInput = document.querySelector(".todo-input");
const todoCounter = document.querySelector(".todo-counter");
const todoList = document.querySelector(".todo-list");
const filters = document.querySelectorAll(".filter-btn");
const clearBtn = document.querySelector(".clear-btn");
let todos = JSON.parse(localStorage.getItem("todos")) || [
  { text: "Read: Like no one ever was", completed: true },
  { text: "Read: I want to be the very best", completed: true },
  { text: "Clean the dishes", completed: false }
];

let setFilter = SHOW_ALL;

function addTodo(e) {
  e.preventDefault();
  const text = this.querySelector("input").value;
  if (!text) return;
  todos.push({ text, completed: false });
  localStorage.setItem("todos", JSON.stringify(todos));
  renderList(todos, todoList);
  this.reset();
}

function renderList(todos = [], todoList) {
  todoList.innerHTML = "";
  filterList(todos).map((todo, index) => {
    todoList.insertBefore(addTodoDOM(todo, index), todoList.firstChild);
  });
  updateCounter();
}

function addTodoDOM(todo, index) {
  const itemDOM = document.createElement("li");
  itemDOM.setAttribute("class", "todo-item");

  const completeDOM = document.createElement("input");
  completeDOM.setAttribute("type", "checkbox");
  completeDOM.setAttribute("id", `item${index}`);
  completeDOM.setAttribute("data-index", index);
  if (todo.completed) completeDOM.setAttribute("checked", todo.completed);

  const checkboxDOM = document.createElement("div");
  checkboxDOM.setAttribute("class", "todo-checkbox");

  const labelDOM = document.createElement("label");
  labelDOM.setAttribute("for", `item${index}`);
  labelDOM.innerText = todo.text;
  labelDOM.insertBefore(checkboxDOM, labelDOM.firstChild);

  const deleteDOM = document.createElement("button");
  deleteDOM.setAttribute("class", "todo-delete");
  deleteDOM.innerHTML = "&times;";

  itemDOM.appendChild(completeDOM);
  itemDOM.appendChild(labelDOM);
  itemDOM.appendChild(deleteDOM);

  return itemDOM;
}

function updateCounter() {
  let notCompleted = todos.reduce((sum, todo) => {
    return sum += !todo.completed ? 1 : 0;
  }, 0);
  todoCounter.innerHTML = `${notCompleted} task(s)`;
}

function toggleComplete(e) {
  if (!e.target.matches("input")) return;
  const index = e.target.dataset.index;
  todos[index].completed = !todos[index].completed;
  localStorage.setItem("todos", JSON.stringify(todos));
  renderList(todos, todoList);
}

function deleteTodo(e) {
  if (!e.target.matches("button")) return;
  const index = e.target.parentNode.querySelector("input").dataset.index;
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderList(todos, todoList);
}

function filterList(todos) {
  switch (setFilter) {
    case SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
    case SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case SHOW_ALL:
    default:
      return todos;
  }
}

function clearCompleted() {
  todos = todos.filter(todo => !todo.completed);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderList(todos, todoList);
}

todoInput.addEventListener("submit", addTodo);
todoList.addEventListener("click", toggleComplete);
todoList.addEventListener("click", deleteTodo);
filters.forEach(filter => filter.addEventListener("click", () => {
  setFilter = filter.dataset.filter;
  renderList(todos, todoList);
}));
clearBtn.addEventListener("click", clearCompleted);

renderList(todos, todoList);