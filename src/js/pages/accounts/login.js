import Auth from '../../network/auth';
import Utils from '../../utils/utils';
import Config from '../../config/config';

const Login = {
  async init() {
    this._initialListener();
    this._initialUI();
  },

  _initialListener() {
    const loginForm = document.querySelector('#loginForm');
    loginForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        event.stopPropagation(); 
 
        loginForm.classList.add('was-validated');
        await this._getLogged();
      },
      false,
    );
  },

  _initialUI() {    
    const password = document.querySelector('#validationCustomPassword');
    const toPassword = document.querySelector('#togglePassword');

    this.titleAbout = document.querySelector('footer-app');
    const rootTitleAbout = this.titleAbout.shadowRoot.querySelector('.about-title');
    const rootDescAbout = this.titleAbout.shadowRoot.querySelector('.about-description');

    rootTitleAbout.style.display = 'none';
    rootDescAbout.style.display = 'none';

    toPassword.addEventListener('click', () => this._togglePasswordVisibility(password));
  },

  _togglePasswordVisibility(passwordElement) {
    if (passwordElement.type === 'password') {
      passwordElement.type = 'text';
    } else {
      passwordElement.type = 'password';
    }
  },

  async _getLogged() {
    const formData = this._getFormData();
    const btnLogin = document.querySelector('#btnLogin');
     
    if (this._validateFormData({ ...formData })) {
      btnLogin.disabled = true;
      Utils.setToast('Loading...');
      console.log('formData');
      console.log(formData);

      try {
        const response = await Auth.login({
          email: formData.email,
          password: formData.password,
        });

        const userData = {
          [Config.USER_ID_KEY]: response.data.loginResult.userId,
          [Config.USER_NAME_KEY]: response.data.loginResult.name,
          [Config.USER_TOKEN_KEY]: response.data.loginResult.token,
        };
        
        Utils.setMultipleSessionStorage(userData);
        const toastReturn = Utils.setToast('Successfully signed in. Happy exploring!', 'success');
        this._toastTimeOut(toastReturn);
      } catch (error) {
        btnLogin.disabled = false;
        console.error(error);
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message || 'An unknown error occurred.';          
          const toastReturn = Utils.setToast(`Error: ${errorMessage}`, 'error');
          this._toastTimeOut(toastReturn);
        } else {
          console.error(error);
          const toastReturn = Utils.setToast('An unexpected error occurred. Please try again.', 'error');
          this._toastTimeOut(toastReturn);
        }
      }
    }
  },
 
  _getFormData() {
    const email = document.querySelector('#validationCustomEmail');
    const password = document.querySelector('#validationCustomPassword');
 
    return {
      email: email.value,
      password: password.value,
    };
  },
 
  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '');
 
    return formDataFiltered.length === 0;
  },

  _toastTimeOut(status) {
    const toastContainer = document.querySelector('#toastContainer').firstChild;
    
    setTimeout(() => {
      toastContainer.remove();
      if (status === "success") {        
        this._goToDashboardPage();
      }
    }, 3000);
  },
 
  _goToDashboardPage() {
    window.location.href = '/';
  },
};
 
export default Login;