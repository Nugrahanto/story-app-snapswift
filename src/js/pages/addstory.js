import '../components/form/InputImagePreview';
import { msg, str } from '@lit/localize';

const AddStory = {
  inputImagePreview: null,

  async init() {
    this._initialUI();
    this._initialListener();
  },

  _initialUI() {
    this.inputImagePreview = document.querySelector('input-image-preview');
    // const postStoryButton = document.querySelector('#postStory');

    // postStoryButton.textContent = msg(str`Post Story`);
  },

  _initialListener() {
    const addStoryForm = document.querySelector('#addStoryForm');

    addStoryForm.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();
  
        addStoryForm.classList.add('was-validated');
        this._sendPost();
      },
      false
    );
  },

  _sendPost() {
    const formData = this._getFormData();
 
    if (this._validateFormData({ ...formData })) {
      console.log('formData');
      console.log(formData);
  
      // this._goToDashboardPage();
    }
  },

  _getFormData() {
    const imageStoryInput = this.inputImagePreview.shadowRoot.querySelector('#imageStory');
    const descStoryInput = document.querySelector('#descriptionStory');
    const user = document.querySelector('#username');

    const currentTime = new Date();
    const isoFormattedTime = currentTime.toISOString();
    const timeStoryInput = isoFormattedTime;

    if (!imageStoryInput.files[0]) {
      this._validateFormDataImage();
    }
    
    return {
      name: user.innerText,
      description: descStoryInput.value,
      photoUrl: imageStoryInput.files[0],
      createdAt: timeStoryInput,
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === ''); 
    return formDataFiltered.length === 0;
  },

  _validateFormDataImage() {
    const containerImageStoryInput = this.inputImagePreview.shadowRoot.querySelector('.custom-file');
    const textValidateImageStoryInput = this.inputImagePreview.shadowRoot.querySelector('.invalid-feedback');
    containerImageStoryInput.style.border = '2px dashed #dc3545';
    textValidateImageStoryInput.style.display = 'block';
  },
 
  _goToDashboardPage() {
    window.location.href = '/';
  },
};
 
 
export default AddStory;