import Config from './config';
 
const ApiEndpoint = {
  REGISTER: `${Config.BASE_URL}/register`,
  LOGIN: `${Config.BASE_URL}/login`,

  GET_ALL_STORIES: `${Config.BASE_URL}/stories`,
  POST_STORIES: `${Config.BASE_URL}/stories`,

  GET_ADDRESS_GEOCODING: `${Config.BASE_URL_MAPS}/geocode/json`,
  GET_PLACES: `${Config.BASE_URL_MAPS}/js`,
};
 
export default ApiEndpoint;