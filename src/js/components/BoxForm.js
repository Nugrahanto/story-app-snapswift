import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class BoxForm extends LitWithoutShadowDom {
  static properties = {
    formType : { type: String, reflect: true },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }
 
  render() {
    let content;
        
    if (this.formType === 'login') {
      content = html `
      <form id="loginForm" novalidate>
        <input-with-validation
          type="email"
          inputId="validationCustomEmail"
          placeholder="${msg(`Email`)}"
          icon="bi-envelope"
          classes="mb-3 input-group"
          required
        ></input-with-validation>
        <input-with-validation-pass
          type="password"
          inputId="validationCustomPassword"
          placeholder="${msg(`Password`)}"
          icon="bi-lock"
          classes="mb-3 input-group"
          required
        ></input-with-validation-pass>
        <p class="text-secondary">${msg(`Don't have an account?`)} <a href="./register.html" class="text-dark"><b>${msg(`Sign up`)}</b></a></p>
        <div class="text-end">
          <button type="submit" id="btnLogin" class="btn btn-base rounded-pill">${msg(`Log in`)}</button>
        </div>
      </form>`;
    } else {
      content = html `
      <form id="registerForm" novalidate>
        <div class="row">
          <div class="col-lg-6 col-md-12 mb-3">
            <input-with-validation
                type="text"
                inputId="validationCustomfirstName"
                placeholder="${msg(`Firstname`)}"
                icon="bi-person"
                classes="input-group"
                required
              ></input-with-validation>
          </div>
          <div class="col-lg-6 col-md-12 mb-3">
            <input-with-validation
              type="text"
              inputId="validationCustomlastName"
              placeholder="${msg(`Lastname`)}"
              icon="bi-person"
              classes="input-group"
              required
            ></input-with-validation>
          </div>
        </div>
        <input-with-validation
          type="email"
          inputId="validationCustomEmail"
          placeholder="${msg(`Email`)}"
          icon="bi-envelope"
          classes="mb-3 input-group"
          required
        ></input-with-validation>
        <input-with-validation-pass
          type="password"
          inputId="validationCustomPassword"
          placeholder="${msg(`Password (at least 8 characters)`)}"
          icon="bi-lock"
          classes="input-group"
          required
        ></input-with-validation-pass>
        <div id="textLengthPassword" class="invalid-feedback d-none">textLengthPassword</div>
        <input-with-validation
          type="password"
          inputId="validationCustomrePassword"
          placeholder="${msg(`Confirm Password`)}"
          icon="bi-lock"
          classes="mt-3 input-group"
          required
        ></input-with-validation>
        <div id="textMatchPassword" class="invalid-feedback d-none">textMatchPassword</div>
        <p class="text-secondary mt-3">${msg(`Have an account?`)} <a href="./login.html" class="text-dark"><b>${msg(`Log in`)}</b></a></p>
        <div class="text-end">
          <button type="submit" id="btnRegister" class="btn btn-base rounded-pill">${msg(`Sign up`)}</button>
        </div>
      </form>
      `;
    }
    return html`
      <div class="border border-1 py-4">
        ${this.formType === 'login' ? html`<p class="text-center h1 fw-bold mx-1">${msg(`Log in`)}</p>` : html`<p class="text-center h1 fw-bold mx-1">${msg(`Sign up`)}</p>` }
        <div class="container mt-4">
          ${content}
        </div>
      </div>
    `;
  }
}

customElements.define('box-form', BoxForm);