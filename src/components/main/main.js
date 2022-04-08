import { getUser } from '../../shared/services/local-storage-service';

export const mainPageHandler = () => {
  const headerUserName = document.getElementById('userName');
  const headerEmail = document.getElementById('email');
  const { firstName, lastName, email } = getUser();
  headerEmail.innerText = email;
  headerUserName.innerText = `${firstName} ${lastName}`;
};
