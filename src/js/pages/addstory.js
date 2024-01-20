import '../components/form/InputImagePreview';
import CheckUserAuth from './accounts/check-user-auth';
import Geocode from '../network/geocode';
import Stories from '../network/stories';
import Utils from '../utils/utils';

const AddStory = {
  inputImagePreview: null,
  lat: null,
  lng: null,
 
  async init() {
    CheckUserAuth.checkLoginState();
    await this._loadGoogleMapsApi();
    this._initialUI();
    this._initialListener();
  },

  _initialUI() {
    this.inputImagePreview = document.querySelector('input-image-preview');

    if (typeof google !== 'undefined' && google.maps) {
      const addressInput = document.getElementById('addressInput');
      const autocomplete = new google.maps.places.Autocomplete(addressInput);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            console.error('Place has no geometry');
            return;
        }

        const { lat, lng } = place.geometry.location;
        
        this.lat = lat();
        this.lng = lng();
      });
    } else {
      console.error('Google Maps API is not available');
    }
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

  async _loadGoogleMapsApi() {
    try {
      const response = await Geocode.getLoadGoogleMapsApi();
      const scriptText = response.data;
      const scriptElement = document.createElement('script');
      scriptElement.innerHTML = scriptText;
      document.body.appendChild(scriptElement);
    } catch (error) {
      console.error('Failed to load Google Maps API:', error);
    }    
  },

  async _sendPost() {
    const formData = this._getFormData();
    const btnPost = document.querySelector('#postStory');

    if (formData) {
      if (this._validateFormData({ ...formData })) {
        btnPost.disabled = true;
        console.log('formData');
        console.log(formData);
  
        try {
          await Stories.postStories(formData);
          const toastReturn = Utils.setToast('Story upload successfully!', 'success');
          this._toastTimeOut(toastReturn);
        } catch (error) {
          console.error(error);
          btnPost.disabled = false;
          if (error.response && error.response.data) {
            const errorMessage = error.response.data.message || 'An unknown error occurred.';
            const toastReturn = Utils.setToast(`Error: ${errorMessage}`, 'error');
            this._toastTimeOut(toastReturn);
          } else {
            console.error(error);
            const toastReturn = Utils.setToast('An unexpected error occurred. Please try again.', 'error');
            this._toastTimeOut(toastReturn);
          }
        }
      }
    }    
  },

  _getFormData() {
    const imageStoryInput = this.inputImagePreview.shadowRoot.querySelector('#imageStory');
    const descStoryInput = document.querySelector('#descriptionStory');

    if (!imageStoryInput.files[0]) {
      this._validateFormDataImage('Empty');
    } else {
      const fileSize = imageStoryInput.files[0].size; // Ukuran file dalam byte
      const maxSize = 1024 * 1024;
      if (fileSize > maxSize) {
        this._validateFormDataImage('Big');
      } else {
        return {
          description: descStoryInput.value,
          photo: imageStoryInput.files[0],
          lat: this.lat,
          lon: this.lng,
        };
      }
    }
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === ''); 
    return formDataFiltered.length === 0;
  },

  _validateFormDataImage(Status) {
    const containerImageStoryInput = this.inputImagePreview.shadowRoot.querySelector('.custom-file');
    const textValidateImageStoryInputEmpty = this.inputImagePreview.shadowRoot.querySelector('.invalid-feedback-empty');
    const textValidateImageStoryInputBig = this.inputImagePreview.shadowRoot.querySelector('.invalid-feedback-big');
    
    containerImageStoryInput.style.border = '2px dashed #dc3545';

    if (Status === 'Empty') {
      textValidateImageStoryInputEmpty.style.display = 'block';
    } else if (Status === 'Big') {
      textValidateImageStoryInputBig.style.display = 'block';
    }
  },

  _toastTimeOut(status) {
    const toastContainer = document.querySelector('#toastContainer').firstChild;
    
    setTimeout(() => {
      toastContainer.remove();
      if (status === 'success') {        
        this._goToDashboardPage();
      }
    }, 3000);
  },
 
  _goToDashboardPage() {
    window.location.href = '/';
  },
};
 
 
export default AddStory;