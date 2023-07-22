const inputTitle = document.querySelector("#inputTitle");
const addButton = document.querySelector("#addButton");
const listContainer = document.querySelector("#list-container");

// Function to create the list element <li></li> using javascript and innerHTML
function createList() {
  const createList = `<div class="li-flex"><li>${inputTitle.value}  <span class="close">&times</span></li></div>`;
  listContainer.insertAdjacentHTML("beforeend", createList);
}

// Function to add list or task to the list container
function addTask() {
  if (inputTitle.value === "") {
    alert("Please write something in the title");
  } else {
    createList();
  }

  // After list is added and save to local storage

  inputTitle.value = "";
  saveTask();
}

// Function to save to local storage
function saveTask() {
  localStorage.setItem("tasks", listContainer.innerHTML);
}

// Function to show the local storage on refresh of page
function showList() {
  listContainer.innerHTML = localStorage.getItem("tasks");
}

// Call showList function
showList();

addButton.addEventListener("click", addTask);

// addEventListener that targets the "LI" or "SPAN" element if clicked on.
listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
  }
});
