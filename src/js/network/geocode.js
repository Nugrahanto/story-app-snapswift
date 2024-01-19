import axios from 'axios';
import Config from '../config/config';
 
const Geocode = {
  async getAddress(lat, lon) { 
    return await axios.get(`${Config.BASE_URL_GEOCODING}`, {
      params: {
        latlng: `${lat},${lon}`,
        key: Config.GEOCODING_API_KEY,
      },
    });
  }
};
 
export default Geocode;