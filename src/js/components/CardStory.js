import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';
import { updateWhenLocaleChanges } from '@lit/localize';
import Utils from '../utils/utils';
 
class CardStory extends LitWithoutShadowDom {
  static properties = {
    name: { type: String, reflect: true },
    description: { type: String, reflect: true },
    photoUrl: { type: String, reflect: true },
    createdAt: { type: String, reflect: true },
    location: { type: String, reflect: true },
  };
 
  constructor() {
    super();
    updateWhenLocaleChanges(this);

    this.name = '';
    this.description = '';
    this.photoUrl = '';
    this.createdAt = '';
    this.location = '';
  }
 
  render() {
    return html`
      <div class="card">
        <div class="d-flex align-items-center card-header bg-white p-3">
          <img
            id="imgAccount"
            class="rounded-pill"
            src="https://ui-avatars.com/api/?background=random&size=32&name=${this.name}"
            alt="User Name"
          />
          <span class="fw-bold ms-3">${this.name}</span>
        </div>
        <img src="${this.photoUrl}" alt="Story Image">
        <div class="card-body">
          <span class="card-title">${this.name}</span>
          <span class="card-text lh-sm fw-light">${this.description}</span>
          <div class="d-flex align-items-center justify-content-between">
            <div class="">
              <p class="card-text">
                <small class="text-muted">${Utils.setFormatCreatedAt(this.createdAt)}</small>
              </p>
            </div>
            <div class="">
              <button class="btn btn-sm btn-outline-base rounded-pill">
                <i class="bi bi-heart-fill"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
 
customElements.define('card-story', CardStory);