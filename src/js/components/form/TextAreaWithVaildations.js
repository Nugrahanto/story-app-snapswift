import { html } from 'lit';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
 
class TextareaWithValidation extends LitWithoutShadowDom {
  static properties = {
    rows: { type: Number, reflect: true },
    inputId: { type: String, reflect: true },
    inputName: { type: String, reflect: true },
 
    required: { type: Boolean, reflect: true },
  };
 
  constructor() {
    super();
    updateWhenLocaleChanges(this);
 
    this.required = false;
  }
 
  render() {
    return html`
      <div class="mb-3">
        <label for="descriptionStory">${msg(`Description:`)}</label>
        <textarea class="form-control" id=${this.inputId} name="${this.inputName}" rows="${this.rows}" required></textarea>
        <div class="invalid-feedback">Please fill in.</div>
      </div>
    `;
  }
}
 
customElements.define('textarea-with-validation', TextareaWithValidation);