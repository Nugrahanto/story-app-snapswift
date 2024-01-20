import '../components/form/InputImagePreview';
import CheckUserAuth from './accounts/check-user-auth';
import Geocode from '../network/geocode';

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

    const currentTime = new Date();
    const isoFormattedTime = currentTime.toISOString();
    const timeStoryInput = isoFormattedTime;

    if (!imageStoryInput.files[0]) {
      this._validateFormDataImage();
    }
    
    return {
      description: descStoryInput.value,
      photoUrl: imageStoryInput.files[0],
      lat: this.lat,
      lon: this.lng,
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