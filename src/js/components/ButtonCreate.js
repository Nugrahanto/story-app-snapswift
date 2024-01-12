import { LitElement, html, css } from 'lit';

class ButtonCreate extends LitElement {
  static styles = css `
  :host{
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none !important;
  }

  .btn-large {
    color: #000;
    height: 34px;
    line-height: 34px;
    padding: 5px 35px;
    border-radius: 50px;
    background-color: #ffc0cb;
    border: none;
    font-family: 'Signika', sans-serif;
    cursor: pointer;
    font-size: 1rem;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  }

  .container-button-small {
    display: none;
    margin: auto;
    flex-grow: 1;
  }

  .content-button {
    position: fixed;
    bottom: 0;
    right: 0;
    margin-bottom: 30px;
    margin-right: 20px;
  }

  .btn-small {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #ffc0cb;
    color: #000;
    padding: 10px 20px;
    border: none;
    font-size: 2rem;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  }

  @media screen and (max-width: 768px) {
    .btn-large {
      display: none;
    }

    .container-button-small {
      display: block;
    }
  }
  `;
 
  render() {
    return html`
      <a class="btn-large" href="#" role="button">Create story</a>
      <div class="container-button-small">
        <div class="content-button">
          <a class="btn-small" href="#" role="button">+</a>
        </div>
      </div>
    `;
  }
}

customElements.define('button-create', ButtonCreate);