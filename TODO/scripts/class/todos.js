import { Task } from "./task.js";
class Todos {
  #tasks = [];
  #backendRootUrl = "";
  constructor(url) {
    this.#backendRootUrl = url;
  }

  getTasks = async () => {
    return new Promise(async (resolve, reject) => {
      //   console.log(this.#backendRootUrl);
      fetch(this.#backendRootUrl)
        .then((res) => {
          res.json();
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
  #readJson = (tasksAsJson) => {
    tasksAsJson.forEach((node) => {
      // transfer json data to task class. but why.
      const task = new Task(node.id, node.description);
      this.#tasks.push(task);
    });
  };
}

export { Todos };
