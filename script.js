"use strict";

// DOM Elements:
const addTaskForm = document.getElementById("add-task-form");
const taskNameInput = document.getElementById("task-name-input");
const addTaskButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");

let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [
  {
    id: 1,
    name: "Buy Bananas for the pancakes",
    isChecked: false,
  },
  {
    id: 2,
    name: "Go to the Gym Sports",
    isChecked: true,
  },
  {
    id: 3,
    name: "Prepare roadmap for MVP Work",
    isChecked: false,
  },
  {
    id: 4,
    name: "Call Peter Work",
    isChecked: false,
  },
  {
    id: 5,
    name: "Read chapter 3 from Math book Study",
    isChecked: false,
  },
];

// Functions:
const saveTaskDataToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
};

const showAlertForMissingFields = (inputValue) => {
  if (!inputValue) {
    alert(`Please enter a task name before submitting!`);
  }
};

const checkDuplicateName = (searchName) => {
  const exists = tasksArray.some(
    (task) => task.name.toLowerCase() === searchName.toLowerCase()
  );
  exists
    ? alert(`A task with the name "${searchName}" already exists in your list!`)
    : null;
  return exists;
};

const toggleTaskCompletion = (taskId) => {
  tasksArray.forEach((task) => {
    if (task.id === taskId) {
      task.isChecked = !task.isChecked;
    }
  });
  saveTaskDataToLocalStorage();
  renderTasks();
};

const deleteTask = (taskId) => {
  tasksArray.forEach((task, index) => {
    if (task.id === taskId) {
      const confirmDelete = confirm(
        `Are you sure you want to permanently delete the task "${task.name}"? This action cannot be undone.`
      );
      if (confirmDelete) {
        tasksArray.splice(index, 1);
        saveTaskDataToLocalStorage();
        renderTasks();
      }
    }
  });
};

const renderTasks = () => {
  taskList.innerHTML = "";
  if (tasksArray.length > 0) {
    tasksArray.forEach((task) => {
      let listItemEle = document.createElement("li");
      listItemEle.innerHTML = `
        <div>
          <input 
            type="checkbox" 
            id="${task.id}" 
            class="check-task" ${task.isChecked ? "checked" : ""}>
          <label for="${task.id}">${task.name}</label>
        </div>
        <button class="delete-button ph-bold ph-trash" type="button"></button>
        `;
      const checkTask = listItemEle.querySelector(".check-task");
      const deleteButton = listItemEle.querySelector(".delete-button");
      checkTask.addEventListener("change", () => toggleTaskCompletion(task.id));
      deleteButton.addEventListener("click", () => deleteTask(task.id));
      taskList.prepend(listItemEle);
    });
  } else {
    taskList.innerHTML = `<li>No tasks found.</li>`;
  }
};
renderTasks();

// Event Listeners:
addTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskName = taskNameInput.value.trim();
  if (!taskName) {
    showAlertForMissingFields(taskName);
  } else if (checkDuplicateName(taskName)) {
  } else {
    tasksArray.push({
      id: Date.now(),
      name: taskName,
      isChecked: false,
    });
    saveTaskDataToLocalStorage();
    renderTasks();
    taskNameInput.value = "";
  }
});
