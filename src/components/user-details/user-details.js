import { Spinner } from '../../shared/spinner';
import { Header } from './../header/header';
import { getUser } from './../../api/api-handlers';
import { getUserId } from '../../shared/services/local-storage-service';
import { showNotification } from '../../shared/notifications';

export const userDetailsHandler = async () => {
  const header = document.querySelector('.sect');

  Header.getHeader(header);
  Spinner.showSpinner();
  await getUser(getUserId())
    .then((user) => {
      console.log(user);
    })
    .catch((error) => {
      Spinner.hideSpinner();
      showNotification(error.message);
    });
};
