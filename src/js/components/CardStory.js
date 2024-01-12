import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';
 
class CardStory extends LitWithoutShadowDom {
  static properties = {
    name: { type: String, reflect: true },
    description: { type: String, reflect: true },
    photoUrl: { type: String, reflect: true },
    createdAt: { type: String, reflect: true },
  };
 
  constructor() {
    super();

    this.name = '';
    this.description = '';
    this.photoUrl = '';
    this.createdAt = '';
  }
 
  render() {
    return html`
      <div class="card">
        <img src="${this.photoUrl}" class="card-img-top" alt="Story Image">
        <div class="card-body">
          <h5 class="card-title">${this.name}</h5>
          <p class="card-text lh-sm fw-light">${this.description}</p>
          <p class="card-text"><small class="text-muted">${this.createdAt}</small></p>
        </div>
      </div>
    `;
  }
}
 
customElements.define('card-story', CardStory);