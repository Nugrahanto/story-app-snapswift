import { LitElement, html, css } from 'lit';
import { allLocales } from '../../../generated/locale-codes.js';
import { getLocale, localeNames, setLocaleFromUrl } from '../../localization.js';
 
class LocalePicker extends LitElement {
  constructor() {
    super();
  }

  static styles = css`
  .select-locale {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: none;
    background: none;
    border-radius: .25rem;
    font-family: 'Signika', sans-serif;
    height: fit-content;
    cursor: pointer;
  }
  `;
 
  render() {
    return html`
      <select id="change-language" class="select-locale" @change=${this._localeChanged}>
        ${allLocales.map((locale) => {
          return html`
            <option value=${locale} ?selected=${locale === getLocale()}>
              ${localeNames[locale]}
            </option>
          `;
        })}
      </select>
    `;
  }
 
  _localeChanged(event) {
    const newLocale = event.target.value;
 
    if (newLocale !== getLocale()) {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', newLocale);
 
      window.history.pushState(null, '', url.toString());
      setLocaleFromUrl();
    }
  }
}
 
customElements.define('locale-picker', LocalePicker);