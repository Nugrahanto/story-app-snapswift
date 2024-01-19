const Register = {
  async init() {
    this._initialListener();
    this._initialUI();
  },

  _initialListener() {
    const registerForm = document.querySelector('#registerForm');
    registerForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();
 
 
        registerForm.classList.add('was-validated');
        await this._getRegistered();
      },
      false,
    );
  },  

  _initialUI() {
    const toPassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#validationCustomPassword');
    const rePassword = document.querySelector('#validationCustomrePassword');

    this.titleAbout = document.querySelector('footer-app');
    const rootTitleAbout = this.titleAbout.shadowRoot.querySelector('.about-title');

    rootTitleAbout.style.display = 'none';

    toPassword.addEventListener('click', () => this._togglePasswordVisibility(password));

    password.addEventListener('keyup', () => this._handleCheckPassword(password, rePassword));
    rePassword.addEventListener('keyup', () => this._handleCheckPassword(password, rePassword));
  },

  _togglePasswordVisibility(passwordElement) {
    if (passwordElement.type === 'password') {
      passwordElement.type = 'text';
    } else {
      passwordElement.type = 'password';
    }
  },

  _handleCheckPassword(passwordElement, rePasswordElement) {
    const passwordValue = passwordElement.value;
    const rePasswordValue = rePasswordElement.value;
    
    const lengthMessage = document.querySelector('#textLengthPassword');
    const matchMessage = document.querySelector('#textMatchPassword');

    const btnRegister = document.querySelector('#btnRegister');

    if (passwordValue.length >= 8) {
      lengthMessage.classList.replace("d-block","d-none");
    } else {      
      lengthMessage.textContent = 'Password must be at least 8 characters';
      lengthMessage.classList.replace("d-none","d-block");
    }
    
    if (rePasswordValue !== "") {
      if (passwordValue === rePasswordValue) {
        matchMessage.textContent = 'Passwords match!';
        matchMessage.classList.replace("d-block","d-none");
      } else {
        matchMessage.textContent = 'Passwords do not match.';
        matchMessage.classList.replace("d-none","d-block");
      }
    }

    if (passwordValue !== rePasswordValue || passwordValue.length < 8) {      
      btnRegister.disabled = true;
    } else {      
      btnRegister.disabled = false;
    }
  },

  async _getRegistered() {
    const formData = this._getFormData();
 
    if (this._validateFormData({ ...formData })) {
      console.log('formData');
      console.log(formData);
    }
  },

  _getFormData() {
    const firstName = document.querySelector('#validationCustomfirstName');
    const lastName = document.querySelector('#validationCustomlastName');
    const email = document.querySelector('#validationCustomEmail');
    const password = document.querySelector('#validationCustomPassword');
 
    return {
      name: firstName.value+" "+lastName.value,
      email: email.value,
      password: password.value,
    };
  },
 
  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '');
 
    return formDataFiltered.length === 0;
  },

  _goToLoginPage() {
    window.location.href = '/accounts/login.html'
  }
};
 
export default Register;