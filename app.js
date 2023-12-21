// DOM Selectors
const inputTask = document.querySelector("#inputTask");
const form = document.querySelector(".to-do-container");
const listContainer = document.querySelector("#list-container");

// Saves task to local storage on page refresh
function saveTaskStorage() {
  localStorage.setItem("task", listContainer.innerHTML);
}

//  Show the saved task on page refresh using local storage
function showTaskStorage() {
  listContainer.innerHTML = localStorage.getItem("task");
}

// Creates the Task List
function createTask(value) {
  const list = document.createElement("li");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  editButton.className = "edit fa-regular fa-pen-to-square fa-lg";
  deleteButton.className = "delete fa-solid fa-x fa-lg";
  list.innerText = value;

  list.appendChild(editButton);
  list.appendChild(deleteButton);

  listContainer.appendChild(list);
}

// Function to add list or task to the list container
function addTask(e) {
  e.preventDefault();

  // Get the value of the input and remove whitespace
  const text = inputTask.value.trim();
  if (text === "") {
    return;
  } else {
    createTask(text);
    inputTask.value = "";
    inputTask.focus();
  }

  saveTaskStorage();
}

// Edit the Task List
function editTask(e) {
  if (e.target.classList.contains("edit")) {
    // Get Parent Element (<li>) Text Value
    let value = e.target.parentElement.innerText;

    e.target.parentElement.innerHTML = `
       <input class="value" type="text" value="${value}" />
       <button class="update" type="submit">Update</button>
       `;
  }
}

// Update the Task List once editted
function updateTask(e) {
  if (e.target.classList.contains("update")) {
    let updatedValue = e.target.previousElementSibling.value;
    if (updatedValue !== "") {
      e.target.parentElement.innerHTML = `${updatedValue}<button class="edit fa-regular fa-pen-to-square fa-lg"></button><button class="delete fa-solid fa-x fa-lg"></button>`;
    } else {
      return;
    }
  }
}

// Delete the Task List
function deleteTask(e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
}

// Check Off Task Lisk once complete or done
function checkedTask(e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
  }
}

// Show Task List on load or reload
showTaskStorage();

// Event Listeners
form.addEventListener("submit", addTask);
listContainer.addEventListener("click", function (e) {
  editTask(e);
  deleteTask(e);
  checkedTask(e);
  updateTask(e);
});
