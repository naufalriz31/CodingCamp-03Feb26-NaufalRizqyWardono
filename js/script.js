const form = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const filter = document.getElementById("filter");

let todos = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (todoInput.value === "" || dateInput.value === "") {
    alert("Please fill in all fields!");
    return;
  }

  const todo = {
    text: todoInput.value,
    date: dateInput.value
  };

  todos.push(todo);
  todoInput.value = "";
  dateInput.value = "";

  displayTodos();
});

filter.addEventListener("change", displayTodos);

function displayTodos() {
  todoList.innerHTML = "";

  const today = new Date().toISOString().split("T")[0];

  todos.forEach((todo, index) => {
    if (filter.value === "today" && todo.date !== today) return;

    const li = document.createElement("li");

    li.innerHTML = `
      <div>
        <strong>${todo.text}</strong><br>
        <span>${todo.date}</span>
      </div>
      <button class="delete-btn" onclick="deleteTodo(${index})">Delete</button>
    `;

    todoList.appendChild(li);
  });
}

function deleteTodo(index) {
  todos.splice(index, 1);
  displayTodos();
}
