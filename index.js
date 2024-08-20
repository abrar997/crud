// i have form with 2 inputs i need save data from those two inputs and post it in page then able to edit and delete it
// start define variables depending on id need for form to stop refresh page when click on submit and var to title and description

var form = document.getElementById("form");
var title = document.getElementById("title");
var description = document.getElementById("description");
var task = document.getElementById("task");
var button = document.getElementById("btn-submit");
const data = JSON.parse(localStorage.getItem("data")) || [];
let selecedItem = null;
const titleTask = document.getElementById("task-title");

const ToggleButtonState = () => {
  if (title.value.trim() !== "" && description.value.trim() !== "") {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
};

title.addEventListener("keyup", ToggleButtonState);
description.addEventListener("keyup", ToggleButtonState);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  acceptData();
});

const acceptData = () => {
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  const titleValue = title.trim();
  const descriptionValue = description.trim();
  if (selecedItem === null) {
    data.push({
      title: titleValue,
      description: descriptionValue,
    });
  } else {
    data[selecedItem] = {
      title: titleValue,
      description: descriptionValue,
    };
    selecedItem = null;
  }

  localStorage.setItem("data", JSON.stringify(data));
  createTask();
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  ToggleButtonState();
};

const createTask = () => {
  if (data.length === 0) {
    titleTask.innerHTML = "";
  } else {
    titleTask.innerHTML = "Tasks";
  }
  task.innerHTML = "";
  data.map((i, index) => {
    return (task.innerHTML += `
    <div class='task' id=${index}>
    <h1>${i.title} </h1>
    <p>${i.description} </p>
    <div style='display:flex;gap:12px' class='buttons-task'>
    <button onclick='editTask(${index})' class='edit'>Edit</button> 
    <button onclick='deleteTask(this);createTask()' class='delete'>Delete</button> 
    </div>   
    </div>
    `);
  });
};

const deleteTask = (index) => {
  data.splice(index.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  createTask();
};

const editTask = (index) => {
  const item = data[index];
  document.getElementById("title").value = item.title;
  document.getElementById("description").value = item.description;
  selecedItem = index;
  ToggleButtonState();
};

createTask();
