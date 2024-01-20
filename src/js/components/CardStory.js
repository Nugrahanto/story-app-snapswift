import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';
import { updateWhenLocaleChanges } from '@lit/localize';
import Utils from '../utils/utils';
import Geocode from '../network/geocode';
 
class CardStory extends LitWithoutShadowDom {
  static properties = {
    id: { type: String, reflect: true },
    name: { type: String, reflect: true },
    description: { type: String, reflect: true },
    photoUrl: { type: String, reflect: true },
    createdAt: { type: String, reflect: true },
    location: { type: String, reflect: true },
  };
 
  constructor() {
    super();
    updateWhenLocaleChanges(this);

    this.id = '';
    this.name = '';
    this.description = '';
    this.photoUrl = '';
    this.createdAt = '';
    this.location = '';
    this.formattedAddress = '';
    this.truncatedDescription = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadDataLocation();
    this._initialData();
  }

  async _loadDataLocation() {
    if (this.location !== "null, null") {
      const locationUser = this.location.split(', ');
      const lat = parseFloat(locationUser[0]);
      const lon = parseFloat(locationUser[1]);

      try {
        const response = await Geocode.getAddress(lat, lon);
        const results = response.data.results;
  
        this._setLocation(results);
      } catch (error) {
        console.error('Error fetching geocode:', error.message);
      }
    }
    this.requestUpdate();
  }

  _initialData() {
    const maxLength = 200;
    this.truncatedDescription = this.description.length > maxLength
      ? `${this.description.slice(0, maxLength)}...`
      : this.description;
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
          <div class="row w-100">
            <div class="col-lg-5 col-md-12 ps-4">
              <span class="fw-bold">${this.name}</span>
            </div>
            <div class="col-lg-7 col-md-12 ps-4 ${this._isLargeScreen() ? 'text-end' : 'text-left'} ${!this.formattedAddress ? 'd-none' : ''}">
              <span class="text-muted fs-6 mt-0"><small>${this.formattedAddress}</small></span>
            </div>
          </div>
        </div>
        <img src="${this.photoUrl}" alt="Story Image">
        <div class="card-body">
          <span class="card-title fw-bold">${this.name}</span>
          <span id="textDesc" class="card-text lh-sm fw-light">
          ${this.truncatedDescription}
          ${this.description.length > 200 && this.truncatedDescription.length < this.description.length
            ? html`
              <span              
                id="seeMore"
                class="fw-bold"
                role="button"
                @click="${this._toggleDescription}"
              >
                See more
              </span>`
            : ''}
          </span>
          <span id="seeMore" class="fw-bold d-none">see more</span>
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <p class="card-text">
                <small class="text-muted">${Utils.setFormatCreatedAt(this.createdAt)}</small>
              </p>
            </div>
            <div>
              <button class="btn btn-sm btn-outline-base rounded-pill">
                <i class="bi bi-heart-fill"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  _toggleDescription() {
    this.truncatedDescription = this.truncatedDescription === this.description
    ? `${this.description.slice(0, 200)}...`
    : this.description;
    this.requestUpdate();
  }

  _isLargeScreen() {
    return window.innerWidth >= 992;
  }

  _setLocation(results) {
    if (results.length > 0) {
      const geocodeResult = results[0].formatted_address;
      const addressParts = geocodeResult.split(", ");
      const city = addressParts[addressParts.length - 3];
      const country = addressParts[addressParts.length - 1];
      this.formattedAddress = `${city}, ${country}`;
    }
  }
}
 
customElements.define('card-story', CardStory);