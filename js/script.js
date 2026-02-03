const form = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const filter = document.getElementById("filter");
const deleteAllBtn = document.getElementById("delete-all");

let todos = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (todoInput.value === "" || dateInput.value === "") {
    alert("Please fill all fields!");
    return;
  }

  todos.push({
    text: todoInput.value,
    date: dateInput.value,
    status: "Pending"
  });

  todoInput.value = "";
  dateInput.value = "";

  renderTodos();
});

filter.addEventListener("change", renderTodos);

deleteAllBtn.addEventListener("click", function () {
  todos = [];
  renderTodos();
});

function renderTodos() {
  todoList.innerHTML = "";

  if (todos.length === 0) {
    todoList.innerHTML = `
      <tr>
        <td colspan="4" class="empty">No task found</td>
      </tr>
    `;
    return;
  }

  const today = new Date().toISOString().split("T")[0];

  todos.forEach((todo, index) => {
    if (filter.value === "today" && todo.date !== today) return;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${todo.text}</td>
      <td>${todo.date}</td>
      <td><span class="status">${todo.status}</span></td>
      <td>
        <button class="delete" onclick="deleteTodo(${index})">Delete</button>
      </td>
    `;
    todoList.appendChild(row);
  });
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}
