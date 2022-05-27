export class Todo {
  #id;
  #description;
  #title;
  #editFn;
  #deleteFn;

  constructor({ id, description, title }, editFn, deleteFn) {
    this.#id = id;
    this.#description = description;
    this.#title = title;
    this.#editFn = editFn;
    this.#deleteFn = deleteFn;
  }
  getTodo() {
    const todoWrapper = document.createElement('div');
    const title = document.createElement('h4');
    const description = document.createElement('p');
    const editIcon = document.createElement('div');
    const deleteIcon = document.createElement('div');
    const togglerWrapper = document.createElement('div');
    const toggler = document.createElement('input');
    const togglerLabel = document.createElement('span');

    editIcon.onclick = () => this.#editFn(this.#id);
    deleteIcon.onclick = () => this.#deleteFn(this.#id);

    editIcon.innerHTML = '<i class="fa-solid fa-pen-to-square edit-icon"></i>';
    deleteIcon.innerHTML = '<i class="fa-solid fa-trash"></i>';
    todoWrapper.className = 'todo';
    togglerWrapper.className = 'form-check form-switch toggler';
    toggler.className = 'form-check-input';
    toggler.setAttribute('type', 'checkbox');
    title.innerText = this.#title;
    description.innerText = this.#description;
    togglerLabel.innerText = 'Set TODO as completed';

    togglerWrapper.append(toggler, togglerLabel);
    todoWrapper.append(
      title,
      description,
      togglerWrapper,
      editIcon,
      deleteIcon
    );

    return todoWrapper;
  }
}
