export class Modal {
  #message;
  #fn;

  constructor(message, fn) {
    this.#message = message;
    this.#fn = fn;
  }

  showModal() {
    const body = document.getElementsByTagName('body')[0];
    const modal = document.createElement('div');
    const modalBody = document.createElement('div');
    const message = document.createElement('p');
    const btns = document.createElement('div');

    const accept = document.createElement('button');
    const decline = document.createElement('button');

    modal.className = 'modal';
    modalBody.className = 'modal-container';
    accept.className = 'btn btn-success';
    decline.className = 'btn btn-success';
    btns.className = 'btns';

    accept.innerText = 'OK';
    decline.innerHTML = 'Cancel';
    modal.setAttribute('id', 'modal');
    message.innerText = this.#message;

    decline.onclick = () => {
      modal.remove();
    };

    accept.onclick = () => {
      modal.remove();
      this.#fn();
    };

    btns.append(accept, decline);
    modalBody.append(message, btns);
    modal.append(modalBody);

    body.prepend(modal);
  }
}
