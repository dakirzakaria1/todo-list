"use strict";

let emptyString = "";
let categoryList = document.getElementById("category-list");
let categoryForm = document.getElementById("category-form");
let categoryInput = document.getElementById("category-input");
let addCategoryButton = document.getElementById("add-category-button");
const allTasksCount = document.getElementById("all-tasks-count");
const checkedTasksCount = document.getElementById("checked-tasks-count");
const favoritesTasksCount = document.getElementById("favorites-tasks-count");

let categoriesArray = JSON.parse(localStorage.getItem("categories")) || [
  { name: "Groceries" },
  { name: "Work" },
  { name: "Study" },
  { name: "Sports" },
];

let tasksArray = [
  {
    id: 1,
    title: "Buy Bananas for the pancakes",
    category: "Groceries",
    isChecked: true,
    isFavorites: true,
  },
  {
    id: 2,
    title: "Go to the Gym Sports",
    category: "Sports",
    isChecked: true,
    isFavorites: false,
  },
  {
    id: 3,
    title: "Prepare roadmap for MVP Work",
    category: "Work",
    isChecked: false,
    isFavorites: false,
  },
  {
    id: 4,
    title: "Call Peter Work",
    category: "Work",
    isChecked: false,
    isFavorites: false,
  },
  {
    id: 5,
    title: "Read chapter 3 from Math book Study",
    category: "Study",
    isChecked: false,
    isFavorites: false,
  },
];

const addCategory = (newCategory) => {
  const taskCount = tasksArray.filter(
    (task) => task.category.toLowerCase() === newCategory.toLowerCase()
  ).length;

  const listItemTag = document.createElement("li");
  const buttonTag = document.createElement("button");
  buttonTag.type = "button";
  buttonTag.innerHTML = `${newCategory} <span>(${taskCount})</span>`;

  listItemTag.appendChild(buttonTag);
  categoryList.appendChild(listItemTag);

  categoriesArray.push({ name: newCategory });
};

const allTasksCounter = () => {
  allTasksCount.textContent = `(${tasksArray.length})`;
};
allTasksCounter();

const checkedCounter = () => {
  checkedTasksCount.textContent = `(${
    tasksArray.filter((task) => task.isChecked === true).length
  })`;
};
checkedCounter();

const favoritesCounter = () => {
  favoritesTasksCount.textContent = `(${
    tasksArray.filter((task) => task.isFavorites === true).length
  })`;
};
favoritesCounter();

const renderCategories = () => {
  categoriesArray.forEach((category) => addCategory(category.name));
};
renderCategories();

const toggleButtonVisibility = () => {
  addCategoryButton.style.display =
    categoryInput.value.trim() !== "" ? "inline-block" : "none";
};

categoryInput.addEventListener("input", toggleButtonVisibility);
toggleButtonVisibility();

categoryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const categoryName = categoryInput.value.trim();

  if (!categoryName) {
    alert("The category input cannot be blank!");
  } else {
    const categoryExists = categoriesArray.some(
      (category) => category.name.toLowerCase() === categoryName.toLowerCase()
    );

    if (categoryExists) {
      alert("This category already exists");
    } else {
      addCategory(categoryName);
      localStorage.setItem("categories", JSON.stringify(categoriesArray));
      categoryInput.value = "";
      toggleButtonVisibility();
    }
  }
});
