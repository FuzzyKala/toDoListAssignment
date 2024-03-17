import { Todos } from "./class/todos.js";
const backendRootUrl = "https://todolistassignment.onrender.com";
// const backendRootUrl = "http://localhost:3001";

const todos = new Todos(backendRootUrl);
// input.disabled = true;
// console.log(todos);

const list = document.querySelector("ul");
const input = document.querySelector("input");

const renderTask = (task) => {
  const li = document.createElement("li");
  li.setAttribute("class", "list-group-item");
  li.setAttribute("data-key", task.getId().toString());
  // li.innerHTML = task.getText();
  renderSpan(li, task.getText());
  renderLink(li, task.getId());
  list.append(li);
};

// assignment 5 - renderSpan
const renderSpan = (li, text) => {
  const span = li.appendChild(document.createElement("span"));
  span.innerHTML = text;
};
// assignment 5 - renderLink
const renderLink = (li, id) => {
  const a = li.appendChild(document.createElement("a"));
  a.innerHTML = '<i class="bi bi-trash"></i>';
  a.setAttribute("style", "float:right");
  a.addEventListener("click", (event) => {
    todos
      .removeTask(id)
      .then((removeId) => {
        const liToRemove = document.querySelector(`[data-key="${removeId}"]`);
        if (liToRemove) {
          list.removeChild(liToRemove);
        }
      })
      .catch((err) => alert(err));
  });
};

// assignment 4 - getTasks
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
// const saveTasks = async (task) => {
//   try {
//     const json = JSON.stringify({ description: task });
//     const body = {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: json,
//     };
//     const response = await fetch(backendRootUrl + "/new", body);
//     return response.json();
//   } catch (error) {
//     alert("Error saving task " + error.message);
//   }
// };

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
      todos.addTask(task).then((e) => {
        console.log(e);
        renderTask(e);
        input.value = "";
        input.focus();
        // console.log(todos.addTask(task));
      });
    }
  }
});

getTasks();

// queries for assignment 4
// 1. how could I divide code into different parts? base on what kinds of philosophy or logic?
// 2. why does the meaning of using readJson function to transfer json data to be objects.
// they're already objects. what are the advantages?

// 4. I get a promise when I use fetch method(with await maybe) in async function, is that same as promise I get in "return new promise"
// 5. how a promise is resolved? by resolve? (todos.addTask(task))

// queries for assignment 5
// why should I use async function for delete but doesn't have to for get and post?

// queries for assignment 6
// what's the values paras in the query for? is it values = [] an array?

// queries for assignment 7
//
