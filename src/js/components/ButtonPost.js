import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class ButtonPost extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }
 
  render() {
    return html`
      <div class="d-grid gap-2">
        <button id="postStory" class="btn btn-block btn-base rounded-pill py-2">${msg(`Post Story`)}</button>
      </div>
    `;
  }
}

customElements.define('button-post', ButtonPost);