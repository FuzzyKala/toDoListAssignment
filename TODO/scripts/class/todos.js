import { Task } from "./task.js";
class Todos {
  #tasks = [];
  #backendRootUrl = "";
  constructor(url) {
    this.#backendRootUrl = url;
  }

  getTasks = async () => {
    return new Promise(async (resolve, reject) => {
      // console.log(this.#backendRootUrl);
      fetch(this.#backendRootUrl)
        .then((res) => {
          // res.json() should be return when there's {} but doesn't need if not.
          return res.json();
        })
        .then(
          (json) => {
            this.#readJson(json);
            resolve(this.#tasks);
          },
          (err) => {
            reject(err);
          }
        );
    });
  };

  addTask = async (task) => {
    return new Promise(async (resolve, reject) => {
      const json = JSON.stringify({ description: task });
      const body = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: json,
      };
      fetch(this.#backendRootUrl + "/new", body)
        .then((response) => response.json())
        .then(
          (json) => {
            // console.log(json);
            resolve(this.#addToArray(json.id, task));
          },
          (err) => {
            reject(err);
          }
        );
    });
  };
  // read tasks from database and push them into the local array this.#tasks
  #readJson = (tasksAsJson) => {
    // console.log(tasksAsJson[0]);
    tasksAsJson.forEach((node) => {
      // transfer json data to task class. but why?
      const task = new Task(node.id, node.description);
      this.#tasks.push(task);
      // console.log(task);
    });
  };
  // add current task from input area and push them into the local array this.#tasks

  #addToArray = (id, text) => {
    const task = new Task(id, text);
    this.#tasks.push(task);
    return task;
  };
}
export { Todos };
