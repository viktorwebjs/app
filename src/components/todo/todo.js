export class Todo {
  #id;
  #description;
  #title;

  constructor({ id, description, title }) {
    this.#id = id;
    this.#description = description;
    this.#title = title;
  }
  getTodo() {
    const todoWrapper = document.createElement('div');
    const title = document.createElement('p');
    const description = document.createElement('p');

    todoWrapper.className = 'todo';
    title.innerText = this.#title;
    description.innerText = this.#description;

    // todoWrapper.onclick = () => console.log(this.#id);
    todoWrapper.append(title, description);
    return todoWrapper;
  }
}
