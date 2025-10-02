document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const taskList = document.getElementById("taskList");
  const li = createTaskElement(taskText);
  taskList.appendChild(li);

  saveTaskToStorage(taskText);
  input.value = "";
}

function createTaskElement(text) {
  const li = document.createElement("li");
  li.textContent = text;

  li.addEventListener("click", () => {
    li.classList.toggle("done");
  });

  const delBtn = document.createElement("button");
  delBtn.innerHTML = "🗑️";
  delBtn.onclick = () => {
    li.remove();
    removeTaskFromStorage(text);
  };

  li.appendChild(delBtn);
  return li;
}

function saveTaskToStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromStorage(taskToRemove) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task !== taskToRemove);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  tasks.forEach(task => {
    const li = createTaskElement(task);
    taskList.appendChild(li);
  });
}
