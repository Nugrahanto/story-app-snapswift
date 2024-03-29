import { LitElement, css, html } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class FooterApp extends LitElement {
  static properties = {};
 
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  static styles = css`
  :host {
    font-family: 'Signika', sans-serif;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  a:hover {
    color: #6c757d;
  }

  .about-title {
    margin: 0;
  }

  .about-description {
    text-align: justify;
    color: #6c757d;
    font-size: smaller;
  }

  .about-text {
    display: flex;
    align-items: center;    
    font-size: smaller;
    flex-wrap: wrap;
  }

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

  .select-locale:active,
  .select-locale:focus {
    outline: 0;
  }

  span {
    padding: 0px 10px;
  }

  `;
 
  render() {
    return html`
      <p class="about-title">${msg(`About Snapswift`)}</p>
      <p class="about-description">
        ${msg(`Snapswift is an application designed to provide users with an engaging platform for creating, sharing, and exploring stories. Whether it's through captivating images and descriptions, Snapswift aims to foster a creative space where users can express themselves and connect with a community of visual storytellers.`)}
      </p>
      <div class="about-text">
        <p>© 2024 Snapswift</p>
        <span>•</span>
        <p><a href="https://github.com/Nugrahanto" target="_blank">Nugrahanto</a></p>
        <span>•</span>
        <locale-picker class="d-block mb-3"></locale-picker>
      </div>
    `;
  }
}

customElements.define('footer-app', FooterApp);