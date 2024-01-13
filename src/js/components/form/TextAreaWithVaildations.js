import { html, nothing } from 'lit';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';
 
class TextareaWithValidation extends LitWithoutShadowDom {
  static properties = {
    rows: { type: Number, reflect: true },
    inputId: { type: String, reflect: true },
    inputName: { type: String, reflect: true },
 
    validFeedbackMessage: { type: String, reflect: true },
    invalidFeedbackMessage: { type: String, reflect: true },
 
    required: { type: Boolean, reflect: true },
  };
 
  constructor() {
    super();
 
    this.required = false;
  }
 
  render() {
    return html`
      <div class="mb-3">
        <label for="descriptionStory">Description:</label>
        <textarea class="form-control" id=${this.inputId} name="${this.inputName}" rows="${this.rows}" required></textarea>
        ${this._validFeedbackTemplate()}
        <div class="invalid-feedback">${this.invalidFeedbackMessage}</div>
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
 
customElements.define('textarea-with-validation', TextareaWithValidation);