import { html, nothing } from 'lit';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
 
class InputWithValidationPass extends LitWithoutShadowDom {
  static properties = {
    type: { type: String, reflect: true },
    value: { type: String, reflect: true },
    inputId: { type: String, reflect: true },
    placeholder: { type: String, reflect: true },
    icon: { type: String, reflect: true },
    classes: { type: String, reflect: true },
 
    validFeedbackMessage: { type: String, reflect: true },
 
    required: { type: Boolean, reflect: true },
  };
 
  constructor() {
    super();
    updateWhenLocaleChanges(this);
 
    this.type = 'text';
    this.required = false;
  }
 
  render() {
    return html`
    <div class="${this.classes}">
      <span class="input-group-text">
        <i class="bi ${this.icon}"></i>
      </span>
      <input
        id=${this.inputId || nothing}
        class="form-control"
        type=${this.type}
        placeholder=${this.placeholder}
        value=${this.value || nothing}
        ?required=${this.required}
        @input=${(e) => (this.value = e.target.value)}
      />
      <button class="btn btn-sm btn-outline-secondary rounded-end" type="button" id="togglePassword">
        <i class="bi bi-eye"></i>
      </button>
      ${this._validFeedbackTemplate()}
      <div class="invalid-feedback">${msg(`Please fill in correctly.`)}</div>
    </div>
    `;
  }
 
  _validFeedbackTemplate() {
    if (this.validFeedbackMessage) {
      return html` <div class="valid-feedback">${this.validFeedbackMessage}</div> `;
    }
 
    return html``;
  }
}
 
customElements.define('input-with-validation-pass', InputWithValidationPass);