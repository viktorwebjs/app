import { Header } from '../header/header';

export const findUser = () => {
  const section = document.querySelector('.header__section');
  const div = document.createElement('div');
  div.innerText = 'div';
  Header.getHeader(section);
};
