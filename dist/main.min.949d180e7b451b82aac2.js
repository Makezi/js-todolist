/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SHOW_ALL = "all";
var SHOW_ACTIVE = "active";
var SHOW_COMPLETED = "completed";

var todoInput = document.querySelector(".todo-input");
var todoCounter = document.querySelector(".todo-counter");
var todoList = document.querySelector(".todo-list");
var filters = document.querySelectorAll(".filter-btn");
var clearBtn = document.querySelector(".clear-btn");
var todos = JSON.parse(localStorage.getItem("todos")) || [{ text: "Read: Like no one ever was", completed: true }, { text: "Read: I want to be the very best", completed: true }, { text: "Clean the dishes", completed: false }];

var setFilter = SHOW_ALL;

function addTodo(e) {
  e.preventDefault();
  var text = this.querySelector("input").value;
  if (!text) return;
  todos.push({ text: text, completed: false });
  localStorage.setItem("todos", JSON.stringify(todos));
  renderList(todos, todoList);
  this.reset();
}

function renderList() {
  var todos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var todoList = arguments[1];

  todoList.innerHTML = "";
  filterList(todos).map(function (todo, index) {
    todoList.insertBefore(addTodoDOM(todo, index), todoList.firstChild);
  });
  updateCounter();
}

function addTodoDOM(todo, index) {
  var itemDOM = document.createElement("li");
  itemDOM.setAttribute("class", "todo-item");

  var completeDOM = document.createElement("input");
  completeDOM.setAttribute("type", "checkbox");
  completeDOM.setAttribute("id", "item" + index);
  completeDOM.setAttribute("data-index", index);
  if (todo.completed) completeDOM.setAttribute("checked", todo.completed);

  var checkboxDOM = document.createElement("div");
  checkboxDOM.setAttribute("class", "todo-checkbox");

  var labelDOM = document.createElement("label");
  labelDOM.setAttribute("for", "item" + index);
  labelDOM.innerText = todo.text;
  labelDOM.insertBefore(checkboxDOM, labelDOM.firstChild);

  var deleteDOM = document.createElement("button");
  deleteDOM.setAttribute("class", "todo-delete");
  deleteDOM.innerHTML = "&times;";

  itemDOM.appendChild(completeDOM);
  itemDOM.appendChild(labelDOM);
  itemDOM.appendChild(deleteDOM);

  return itemDOM;
}

function updateCounter() {
  var notCompleted = todos.reduce(function (sum, todo) {
    return sum += !todo.completed ? 1 : 0;
  }, 0);
  todoCounter.innerHTML = notCompleted + " task(s)";
}

function toggleComplete(e) {
  if (!e.target.matches("input")) return;
  var index = e.target.dataset.index;
  todos[index].completed = !todos[index].completed;
  localStorage.setItem("todos", JSON.stringify(todos));
  renderList(todos, todoList);
}

function deleteTodo(e) {
  if (!e.target.matches("button")) return;
  var index = e.target.parentNode.querySelector("input").dataset.index;
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderList(todos, todoList);
}

function filterList(todos) {
  switch (setFilter) {
    case SHOW_ACTIVE:
      return todos.filter(function (todo) {
        return !todo.completed;
      });
    case SHOW_COMPLETED:
      return todos.filter(function (todo) {
        return todo.completed;
      });
    case SHOW_ALL:
    default:
      return todos;
  }
}

function clearCompleted() {
  todos = todos.filter(function (todo) {
    return !todo.completed;
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  renderList(todos, todoList);
}

todoInput.addEventListener("submit", addTodo);
todoList.addEventListener("click", toggleComplete);
todoList.addEventListener("click", deleteTodo);
filters.forEach(function (filter) {
  return filter.addEventListener("click", function () {
    setFilter = filter.dataset.filter;
    renderList(todos, todoList);
  });
});
clearBtn.addEventListener("click", clearCompleted);

renderList(todos, todoList);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);