import axios from 'axios';
import Config from '../config/config';
import ApiEndpoint from '../config/api-endpoint';
 
const Geocode = {
  async getAddress(lat, lon) { 
    return await axios.get(ApiEndpoint.GET_ADDRESS_GEOCODING, {
      params: {
        latlng: `${lat},${lon}`,
        key: Config.GO_API_KEY,
      },
    });
  },

  async getLoadGoogleMapsApi() {
    return await axios.get(ApiEndpoint.GET_PLACES, {
      params: {
        key: Config.GO_API_KEY,
        libraries: `places`,
      },
    });
  },
};
 
export default Geocode;