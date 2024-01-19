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
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadData();
  }

  async loadData() {
    if (this.location !== "") {
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
          <div class="ms-auto">
            <span class="text-muted fs-6 mt-0"><small>${this.formattedAddress}</small></span>
          </div>
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

  _setLocation(results) {
    if (results.length > 0) {
      const geocodeResult = results[0].formatted_address;
      const address_parts = geocodeResult.split(", ");
      const city = address_parts[address_parts.length - 3];
      const country = address_parts[address_parts.length - 1];
      this.formattedAddress = `${city}, ${country}`;
    }
  }
}
 
customElements.define('card-story', CardStory);