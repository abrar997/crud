// i have form with 2 inputs i need save data from those two inputs and post it in page then able to edit and delete it
// start define variables depending on id need for form to stop refresh page when click on submit and var to title and description

var form = document.getElementById("form");
var title = document.getElementById("title").value;
var description = document.getElementById("description").value;
var task = document.getElementById("task");
var button = document.getElementById("btn-submit");
const data = JSON.parse(localStorage.getItem("data")) || [];
let selecedItem = null;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  acceptData();
});

const acceptData = () => {
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  if (selecedItem === null) {
    data.push({
      title: title,
      description: description,
    });
  } else {
    data[selecedItem] = {
      title: title,
      description: description,
    };
    selecedItem = null;
  }

  localStorage.setItem("data", JSON.stringify(data));
  createTask();
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
};

const createTask = () => {
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
};

createTask();
