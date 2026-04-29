// Login elements
const loginPage = document.getElementById("loginPage");
const loginScreen = document.getElementById("loginScreen");
const startBtn = document.getElementById("startBtn");
const usernameInput = document.getElementById("usernameInput");

// Main page elements
const appScreen = document.getElementById("appScreen");
const welcomeMessage = document.getElementById("welcomeMessage");
const logoutBtn = document.getElementById("logoutBtn");

startBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const name = usernameInput.value.trim();

  if (name === "") {
    alert("Please enter your name.");
    return;
  }

  localStorage.setItem("username", name);
  showApp(name);
});

function showApp(name) {
  loginPage.classList.add("d-none");
  appScreen.classList.remove("d-none");

  currentUser = name;
  tasks = JSON.parse(localStorage.getItem("tasks_" + currentUser)) || [];

  welcomeMessage.textContent = name;
  displayTasks();
}

logoutBtn.addEventListener("click", function () {
  appScreen.classList.add("d-none");
  loginPage.classList.remove("d-none");

  usernameInput.value = "";
  currentUser = "";
});

// Task form elements
const openTaskFormBtn = document.getElementById("openTaskFormBtn");
const taskFormBox = document.getElementById("taskFormBox");
const searchTaskInput = document.getElementById("searchTaskInput");
const taskNameInput = document.getElementById("taskNameInput");
const taskDateInput = document.getElementById("taskDateInput");
const taskImportanceInput = document.getElementById("taskImportanceInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const emptyMessage = document.getElementById("emptyMessage");
const taskList = document.getElementById("taskList");

// JSON elements
const exportBtn = document.getElementById("exportBtn");
const importBtn = document.getElementById("importBtn");
const importFile = document.getElementById("importFile");

// Filter elements
const filterBtn = document.getElementById("filterBtn");
const filterMenu = document.getElementById("filterMenu");
const filterOptions = document.querySelectorAll(".filter-option");

let currentUser = localStorage.getItem("username") || "";
let tasks = [];
let currentFilter = "all";

if (currentUser !== "") {
  tasks = JSON.parse(localStorage.getItem("tasks_" + currentUser)) || [];
}

openTaskFormBtn.addEventListener("click", function () {
  taskFormBox.classList.toggle("d-none");
});

searchTaskInput.addEventListener("input", function () {
  displayTasks();
});

filterBtn.addEventListener("click", function () {
  filterMenu.classList.toggle("d-none");
});

filterOptions.forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.getAttribute("data-filter");
    filterMenu.classList.add("d-none");
    displayTasks();
  });
});

addTaskBtn.addEventListener("click", function () {
  const taskName = taskNameInput.value.trim();
  const taskDate = taskDateInput.value;
  const taskImportance = taskImportanceInput.value;

  if (taskName === "" || taskDate === "" || taskImportance === "") {
    alert("Please fill in all fields.");
    return;
  }

  const task = {
    id: Date.now(),
    name: taskName,
    date: taskDate,
    importance: taskImportance,
    completed: false
  };

  tasks.push(task);
  saveTasks();

  taskNameInput.value = "";
  taskDateInput.value = "";
  taskImportanceInput.value = "";

  displayTasks();
});

function saveTasks() {
  localStorage.setItem("tasks_" + currentUser, JSON.stringify(tasks));
}

// Search bar and filters
function displayTasks() {
  taskList.innerHTML = "";

  const searchText = searchTaskInput.value.toLowerCase();

  tasks.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });

  if (tasks.length === 0) {
    emptyMessage.classList.remove("d-none");
  } else {
    emptyMessage.classList.add("d-none");
  }

  tasks.forEach(function (task) {
    if (!task.name.toLowerCase().includes(searchText)) {
      return;
    }

    if (currentFilter === "today") {
      const todayDate = new Date();

      const year = todayDate.getFullYear();
      const month = String(todayDate.getMonth() + 1).padStart(2, "0");
      const day = String(todayDate.getDate()).padStart(2, "0");

      const today = year + "-" + month + "-" + day;

      if (task.date !== today) {
        return;
      }
    }

    if (currentFilter === "pending" && task.completed === true) {
      return;
    }

    if (currentFilter === "completed" && task.completed === false) {
      return;
    }

    if (currentFilter === "high" && task.importance !== "High") {
      return;
    }

    if (currentFilter === "medium" && task.importance !== "Medium") {
      return;
    }

    if (currentFilter === "low" && task.importance !== "Low") {
      return;
    }

    let importanceClass = "";

    if (task.importance === "Low") {
      importanceClass = "low";
    } else if (task.importance === "Medium") {
      importanceClass = "medium";
    } else if (task.importance === "High") {
      importanceClass = "high";
    }

    const date = new Date(task.date);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en", { month: "short" });
    const year = date.getFullYear();

    const statusText = task.completed ? "Completed" : "Pending";
    const statusClass = task.completed ? "completed-btn" : "pending-btn";

    taskList.innerHTML += `
      <div class="task-card">

        <div class="task-date-box">
          <span class="task-day">${day}</span>
          <span class="task-month">${month} ${year}</span>
        </div>

        <div class="task-info">
          <h4>${task.name}</h4>
          <p class="${importanceClass}">Priority: ${task.importance}</p>
        </div>

        <div class="task-buttons">
          <button onclick="toggleCompleted(${task.id})" class="${statusClass}">
            ${statusText}
          </button>

          <button onclick="editTask(${task.id})" class="edit-btn">
            Edit
          </button>

          <button onclick="deleteTask(${task.id})" class="delete-btn">
            Delete
          </button>
        </div>

      </div>
    `;
  });
}

// When task completed
function toggleCompleted(id) {
  tasks.forEach(function (task) {
    if (task.id === id) {
      task.completed = !task.completed;
    }
  });

  saveTasks();
  displayTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });

  saveTasks();
  displayTasks();
}

function editTask(id) {
  tasks.forEach(function (task) {
    if (task.id === id) {
      const editedName = prompt("New task name:", task.name);

      if (editedName === null) {
        return;
      }

      const editedDate = prompt("New task date (YYYY-MM-DD):", task.date);

      if (editedDate === null) {
        return;
      }

      const editedImportance = prompt("New importance (Low, Medium, High):", task.importance);

      if (editedImportance === null) {
        return;
      }

      if (editedName.trim() === "" || editedDate.trim() === "" || editedImportance.trim() === "") {
        alert("Please fill in all fields.");
        return;
      }

      if (
        editedImportance !== "Low" &&
        editedImportance !== "Medium" &&
        editedImportance !== "High"
      ) {
        alert("Use only Low, Medium or High.");
        return;
      }

      task.name = editedName.trim();
      task.date = editedDate;
      task.importance = editedImportance;
    }
  });

  saveTasks();
  displayTasks();
}

// JSON import and export
exportBtn.addEventListener("click", function () {
  const data = JSON.stringify(tasks, null, 2);

  const blob = new Blob([data], { type: "application/json" });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "tasks_" + currentUser + ".json";

  link.click();

  URL.revokeObjectURL(url);
});

importBtn.addEventListener("click", function () {
  importFile.click();
});

importFile.addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      const importedTasks = JSON.parse(e.target.result);

      if (!Array.isArray(importedTasks)) {
        alert("Invalid file.");
        return;
      }

      tasks = importedTasks;
      saveTasks();
      displayTasks();

      alert("Tasks imported successfully.");
    } catch (error) {
      alert("Error importing JSON file.");
    }
  };

  reader.readAsText(file);
});

window.onload = function () {
  const savedName = localStorage.getItem("username");

  if (savedName) {
    showApp(savedName);
  }
};