import { getUsers, signInRequest } from '../../api/api-handlers';
import { ROUTS } from '../../shared/constants/routs';
import { setToken, setUser } from '../../shared/services/local-storage-service';
import { getToken } from '../../shared/services/local-storage-service';
import { Spinner } from '../../shared/spinner';
import {
  emailValidator,
  showErrorMessage,
  hideErrorMessage,
  errorTagsIds,
} from '../../shared/validators';

import { showNotification } from '../../shared/notifications';

export const signInHandler = () => {
  const signInBtn = document.getElementById('signInBtn');
  const passwordInput = document.getElementById('passwordInput');
  const emailInput = document.getElementById('emailInput');
  const userData = {
    email: '',
    password: '',
  };

  emailInput.oninput = () => {
    userData.email = emailInput.value;
    checkFormValid();
  };

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

  passwordInput.oninput = () => {
    userData.password = passwordInput.value;
    checkFormValid();
    hideErrorMessage('required_hide', errorTagsIds.get('pass1'));
  };

  passwordInput.onblur = () => {
    if (!passwordInput.value) {
      passwordInput.classList.add('invalid-input');
      showErrorMessage('required_show', errorTagsIds.get('pass1'));
    } else {
      passwordInput.classList.remove('invalid-input');
      hideErrorMessage('required_hide', errorTagsIds.get('pass1'));
    }
  };

  const checkFormValid = () => {
    const isFormValid = Object.values(userData).every((value) => !!value);

    isFormValid
      ? signInBtn.removeAttribute('disabled')
      : signInBtn.setAttribute('disabled', true);
  };

  signInBtn.onclick = async () => {
    let userId = '';
    let count = 0;

    Spinner.showSpinner();
    await signInRequest(userData)
      // .then((res) => {

      .then(({ user: { accessToken, uid } }) => {
        setToken(accessToken);
        userId = uid;
        count++;
        // console.log(res);
        // window.location.href = ROUTS.main;
      })
      .catch((err) => {
        Spinner.hideSpinner();
        showNotification(err.message);
      });
    await getUsers()
      .then((response) => {
        const users = Object.keys(response).map((userId) => ({
          ...response[userId],
          userId,
        }));
        const user = users.find((user) => user.authId === userId);
        setUser(user);
        Spinner.hideSpinner();
        count++;
      })
      .catch((err) => {
        Spinner.hideSpinner();
        showNotification(err.message);
      });

    if (count === 2) {
      window.location.href = ROUTS.main;
    }
  };
};

// const signInBtn = document.getElementById('signInBtn');
// const passwordInput = document.getElementById('passwordInput');
// const emailInput = document.getElementById('emailInput');
// const userData = {
//   email: '',
//   password: '',
// };

// passwordInput.oninput = () => {
//   userData.password = passwordInput.value;
//   checkFormValid();
// };

// emailInput.oninput = () => {
//   userData.email = emailInput.value;
//   checkFormValid();
// };

// const checkFormValid = () => {
//   const isFormValid = Object.values(userData).every((value) => !!value);

//   isFormValid
//     ? signInBtn.removeAttribute('disabled')
//     : signInBtn.setAttribute('disabled', true);
// };

// signInBtn.onclick = () => {
//   signInRequest(userData)
//     .then(({ user: { accessToken } }) => {
//       setToken(accessToken);
//     })
//     .catch((err) => console.log('error ->'));
// };

//headers.payload.signature
//jwt google.com   accesstoken

// "eyJhbGciOiJSUzI1NiIsImtpZCI6ImIwNmExMTkxNThlOGIyODIxNzE0MThhNjdkZWE4Mzc0MGI1ZWU3N2UiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmlyc3QtNTUwMTgiLCJhdWQiOiJmaXJzdC01NTAxOCIsImF1dGhfdGltZSI6MTY0Nzk2ODUyNiwidXNlcl9pZCI6IjVIVVB3TjdWSjBRZTdTVmpiTjJOM1ZRdFhMbjIiLCJzdWIiOiI1SFVQd043VkowUWU3U1ZqYk4yTjNWUXRYTG4yIiwiaWF0IjoxNjQ3OTY4NTI2LCJleHAiOjE2NDc5NzIxMjYsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0QHRlc3QuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.nAspJ_Zu3XBt8mLYyM0JQ6ZcUyzLlbWqSYl4DGFae2GHNoNXLR1l_lSbfLsrN0RY9PnxcJX48Biq_2S9UlcuvE1rMtSMmy01JVCEGcoIu4fIz1prIXfaqjrPbK-41JoUsEV75GjkeBvCqe9jEQNlCkzrBWyysG8nygd00N8BPgzUCIN72E_kS8dkhEXr2IgVk0J7Nj_1R2FFp3RFGUtRtEc1_q0UqlAD8GnoUIFnBwwgRzqMwn8CNgTlFBrBphEV-GudM76x3WH43_dS_5QxMCXzaDg_T6SZ83_X0uXWl9uf3h2cUnkv15QWOcF6M_QAVWJpmapdEdE9etARO_TRXA"
