import axios from 'axios';
import ApiEndpoint from '../config/api-endpoint';
import Config from '../config/config';
import Utils from '../utils/utils';
 
const Stories = {
  async getAll(page, size) {
    return await axios.get(ApiEndpoint.GET_ALL_STORIES, {
      headers: {
        Authorization: `Bearer ${Utils.getUserSession(Config.USER_TOKEN_KEY)}`,
      },
      params: {
        page: page,
        size: size,
      },
    });
  },

  async postStories(data) {
    return await axios.post(ApiEndpoint.POST_STORIES, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${Utils.getUserSession(Config.USER_TOKEN_KEY)}`,
      },
    });
  },
};
 
export default Stories;