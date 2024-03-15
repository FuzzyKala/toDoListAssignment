import { Todos } from "./class/todos.js";
const backendRootUrl = "http://localhost:3001";
const todos = new Todos(backendRootUrl);
// input.disabled = true;

// console.log(todos);
const list = document.querySelector("ul");
const input = document.querySelector("input");

const renderTask = (task) => {
  // console.log(task);

  const li = document.createElement("li");
  li.setAttribute("class", "list-group-item");
  li.innerHTML = task.getText();
  list.append(li);
};

const getTasks = async () => {
  // because the return value in getTasks is a promise, so we can chain it with then.... like fetch
  todos
    .getTasks()
    .then((tasks) => {
      tasks.forEach((task) => {
        renderTask(task);
      });
    })
    .catch((err) => {
      alert(err);
    });
};

// assignment 3 - getTasks
// const getTasks = async () => {
//   try {
//     const response = await fetch(backendRootUrl);
//     const json = await response.json();
//     json.forEach((task) => {
//       renderTask(task.description);
//     });
//     // input.disabled;
//   } catch (error) {
//     alert("Error retrieving tasks " + error.message);
//   }
// };

// assignment 3 - saveTasks
const saveTasks = async (task) => {
  try {
    const json = JSON.stringify({ description: task });
    const body = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    };
    const response = await fetch(backendRootUrl + "/new", body);
    return response.json();
  } catch (error) {
    alert("Error saving task " + error.message);
  }
};

// assignment 3 - EventListener
// input.addEventListener("keypress", (event) => {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     const task = input.value.trim();
//     if (task !== "") {
//       saveTasks(task).then((e) => {
//         renderTask(task);
//       });
//       input.value = "";
//     }
//   }
// });

// assignment 4 - EventListener
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const task = input.value.trim();
    if (task !== "") {
      todos.addTask(task).then((task) => {
        renderTask(task);
        input.value = "";
        input.focus();
      });
    }
  }
});
getTasks();
