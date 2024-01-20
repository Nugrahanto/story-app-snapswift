import { LitElement, html, css } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
 
class InputImagePreview extends LitElement {
  static properties = { 
    inputId: { type: String, reflect: true },
    inputName: { type: String, reflect: true },
 
    required: { type: Boolean, reflect: true },
  };
 
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  static styles = css`
    .custom-file {
      position: relative;
      display: inline-block;
      width: 100%;
      height: 200px;
      overflow: hidden;
      border-radius: 10px;
      border: 2px dashed #ffc0cb;
      background-color: #fff;
    }

    .custom-file-input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      margin: 0;
      padding: 0;
      font-size: 20px;
      cursor: pointer;
      opacity: 0;
    }

    .custom-file-label {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }

    .preview-image-container {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .preview-image {
      max-width: 100%;
      max-height: 100%;
      display: none;
      margin: auto;
      object-fit: contain; 
    }

    .invalid-feedback-empty, .invalid-feedback-big {
      text-align: left;
      display: none;
      width: 100%;
      margin-bottom: 0.25rem;
      font-size: 0.875em;
      color: #dc3545;
    }
  `;
 
  render() {
    return html`
      <div class="custom-file">
        <input type="file" class="custom-file-input" id=${this.inputId} name="${this.inputName}" accept="image/*" @change=${this._updatePhotoPreview} ?required=${this.required}>
        <label class="custom-file-label" for="image">${msg(`Choose Image (Max Size 1MB)`)}</label>
        <div class="preview-image-container">
          <img class="preview-image" id="previewImage" src="#" alt="Preview Image">
        </div>
      </div>

      <div class="invalid-feedback-empty">${msg(`Please choose image.`)}</div>
      <div class="invalid-feedback-big">${msg(`Max size is 1MB.`)}</div>
    `;
  }
 
  _updatePhotoPreview() {
    const container = this.shadowRoot.querySelector('.custom-file');
    const previewImage = this.shadowRoot.querySelector('#previewImage');
    const customFileLabel = this.shadowRoot.querySelector('.custom-file-label');
    const textValidateImageStoryInputEmpty = this.shadowRoot.querySelector('.invalid-feedback-empty');
    const textValidateImageStoryInputBig = this.shadowRoot.querySelector('.invalid-feedback-big');
    const input = this.shadowRoot.querySelector('.custom-file-input');
    const image = input.files[0];

    container.style.width = '100%';
    container.style.height = '200px';
    
    if (image) {
      const reader = new FileReader();

      reader.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;

        img.onload = function() {            
          customFileLabel.style.display = 'none'; 
          previewImage.src = img.src;
          previewImage.style.display = 'block';

          textValidateImageStoryInputEmpty.style.display = 'none';
          textValidateImageStoryInputBig.style.display = 'none';
          container.style.display = 'transparent';
          container.style.border = '2px dashed #ffc0cb';

          if (img.width > container.offsetWidth && img.height > container.offsetHeight) {
            container.style.width = 'auto';
            container.style.height = 'auto';
          } else if (img.width > container.offsetWidth) {
            container.style.width = 'auto';
            container.style.height = previewImage.offsetHeight + 'px';
          } else if (img.height > container.offsetHeight) {
            container.style.width = 'auto';
            container.style.height = 'auto';
          } else {
            container.style.width = 'auto';
            container.style.height = previewImage.offsetHeight + 'px';
          }
        };
      };

      reader.readAsDataURL(image);
    } else {
      container.style.width = 'auto';
      container.style.height = 'auto';
      return;
    }
  }
}
 
 
customElements.define('input-image-preview', InputImagePreview);