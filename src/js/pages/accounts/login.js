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
     
    if (this._validateFormData({ ...formData })) {
      console.log('formData');
      console.log(formData);
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
 
  _goToDashboardPage() {
    window.location.href = '/';
  },
};
 
export default Login;