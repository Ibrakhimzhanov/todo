//! Global

const todoList = document.getElementById("todo-list");
const userSelect = document.getElementById("user-todo");

let users = [];

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  Promise.all([getAllTodos()]).then((values) => {
    [users] = values;
    users.forEach((user) => createUsers(user));
    console.log(users);
  });
}
function getUserName(userId) {
  const user = users.find((item) => item.id === userId);
  console.log(user);
  return user.name;
}

function createUsers({ id, userId, title }) {
  const li = document.createElement("li");
  li.className = "todo-item";
  li.dataset.id = id;
  li.innerHTML = `<span>${title}, <i>by</i> <b>${getUserName(
    userId
  )}</b></span>`;

  todoList.prepend(li);
}
async function getAllTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();

  return data;
}
