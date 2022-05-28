import * as moment from 'moment';

import {
  creatUserAuthRequest,
  creatUserDataRequest,
  signInRequest,
  getUsers,
  getUser,
} from '../../api/api-handlers';
import { setToken, setUser } from '../../shared/services/local-storage-service';
import { ROUTS } from '../../shared/constants/routs';
import {
  emailValidator,
  showErrorMessage,
  hideErrorMessage,
} from '../../shared/validators';
import { Spinner } from '../../shared/spinner';
import { errorTagsIds } from '../../shared/validators';
import { showNotification } from '../../shared/notifications';

export const signUpHandler = () => {
  const firstNameInput = document.getElementById('firstNameInput');
  const lastNameInput = document.getElementById('lastNameInput');
  const birthInput = document.getElementById('birthInput');
  const emailInput = document.getElementById('emailInput');
  const passwordInput1 = document.getElementById('passwordInput1');
  const passwordInput2 = document.getElementById('passwordInput2');
  const signUpBtn = document.getElementById('signUpBtn');

  const userData = {
    firstName: '',
    lastName: '',
    birth: '',
    email: '',
    password1: '',
    password2: '',
  };

  showNotification('Email EXIST');

  firstNameInput.oninput = () => {
    userData.firstName = firstNameInput.value;

    checkFormValid();
    hideErrorMessage('required_hide', errorTagsIds.get('first_name'));
  };

  firstNameInput.onblur = () => {
    if (!firstNameInput.value) {
      firstNameInput.classList.add('invalid-input');
      showErrorMessage('required_show', errorTagsIds.get('first_name'));
    } else {
      firstNameInput.classList.remove('invalid-input');
      hideErrorMessage('required_hide', errorTagsIds.get('first_name'));
    }
  };

  lastNameInput.oninput = () => {
    userData.lastName = lastNameInput.value;

    checkFormValid();
    hideErrorMessage('required_hide', errorTagsIds.get('last_name'));
  };

  lastNameInput.onblur = () => {
    if (!lastNameInput.value) {
      lastNameInput.classList.add('invalid-input');
      showErrorMessage('required_show', errorTagsIds.get('last_name'));
    } else {
      lastNameInput.classList.remove('invalid-input');
      hideErrorMessage('required_hide', errorTagsIds.get('last_name'));
    }
  };

  birthInput.oninput = () => {
    userData.birth = moment(birthInput.value).format();

    checkFormValid();
    hideErrorMessage('required_hide', errorTagsIds.get('birth'));
  };

  birthInput.onblur = () => {
    if (!birthInput.value) {
      birthInput.classList.add('invalid-input');
      showErrorMessage('required_show', errorTagsIds.get('birth'));
    } else {
      birthInput.classList.remove('invalid-input');
      hideErrorMessage('required_hide', errorTagsIds.get('birth'));
    }
  };
  emailInput.oninput = () => {
    userData.email = emailInput.value;
    hideErrorMessage('email_hide', errorTagsIds.get('email'));
    hideErrorMessage('required_hide', errorTagsIds.get('required_email'));
    checkFormValid();
  };

  // 'Invalid email template. Please, correct it'
  emailInput.onblur = () => {
    if (!emailInput.value) {
      showErrorMessage('required_show', errorTagsIds.get('required_email'));
      hideErrorMessage('email_hide', errorTagsIds.get('email'));
      emailInput.classList.add('invalid-input');
    } else if (!emailValidator(emailInput.value)) {
      emailInput.classList.add('invalid-input');
      hideErrorMessage('required_hide', errorTagsIds.get('email'));
      showErrorMessage('email_show', errorTagsIds.get('email'));
    } else {
      emailInput.classList.remove('invalid-input');
      hideErrorMessage('email_hide', errorTagsIds.get('email'));
      hideErrorMessage('required_hide', errorTagsIds.get('required_email'));
    }
  };

  passwordInput1.oninput = () => {
    userData.password1 = passwordInput1.value;

    checkFormValid();
    hideErrorMessage('required_hide', errorTagsIds.get('pass1'));
  };
  passwordInput1.onblur = () => {
    if (!passwordInput1.value) {
      passwordInput1.classList.add('invalid-input');
      showErrorMessage('required_show', errorTagsIds.get('pass1'));
    } else {
      passwordInput1.classList.remove('invalid-input');
      hideErrorMessage('required_hide', errorTagsIds.get('pass1'));
    }
  };
  passwordInput2.oninput = () => {
    userData.password2 = passwordInput2.value;

    checkFormValid();
  };

  passwordInput2.onblur = () => {
    if (passwordInput1.value !== passwordInput2.value) {
      passwordInput2.classList.add('invalid-input');
      showErrorMessage('password_show', errorTagsIds.get('pass2'));
    } else {
      passwordInput2.classList.remove('invalid-input');
      hideErrorMessage('password_hide', errorTagsIds.get('pass2'));
    }
  };
  signUpBtn.onclick = async () => {
    const { email, password1 } = userData;
    let requestCount = 0;
    let authId = '';
    let userId = '';

    Spinner.showSpinner();
    await creatUserAuthRequest(userData)
      .then((response) => {
        authId = response.user.uid;
        requestCount++;
      })
      .catch((error) => {
        Spinner.hideSpinner();
        showNotification(error.message);
      });

    await creatUserDataRequest({ ...userData, authId })
      .then((res) => {
        userId = res.name;
        requestCount++;
      })
      .catch((error) => {
        Spinner.hideSpinner();
        showNotification(error.message);
      });

    await signInRequest({ email, password: password1 })
      .then(({ user: { accessToken } }) => {
        setToken(accessToken);
        requestCount++;
      })
      .catch((error) => {
        Spinner.hideSpinner();
        showNotification(error.message);
      });

    await getUser(userId)
      .then((res) => {
        setUser(res);
        requestCount++;
        console.log(requestCount);
        Spinner.hideSpinner();
      })
      .catch((error) => {
        Spinner.hideSpinner();
        showNotification(error.message);
      });

    if (requestCount === 4) {
      window.location.href = ROUTS.main;
    }
  };

  const checkFormValid = () => {
    const isFormValid = Object.values(userData).every((value) => !!value);
    const isPasswordsEqual = userData.password1 === userData.password2;

    isFormValid && isPasswordsEqual
      ? signUpBtn.removeAttribute('disabled')
      : signUpBtn.setAttribute('disabled', true);
  };
};
