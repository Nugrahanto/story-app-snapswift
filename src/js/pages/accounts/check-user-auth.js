import Utils from '../../utils/utils';
import Config from '../../config/config';
 
const CheckUserAuth = {
  excludeRedirectPage: ['login.html', 'register.html'],
 
  checkLoginState() {
    const userToken = Utils.getUserSession(Config.USER_TOKEN_KEY);
    const isUserSignedIn = Boolean(userToken);
    const isUserOnAuthPage = this._isUserOnAuthPage(this.excludeRedirectPage);
 
    if (isUserSignedIn) {
      if (isUserOnAuthPage) {
        window.location.href = '/';
      }
    } else {
      if (!isUserOnAuthPage) {
        window.location.href = '/accounts/login.html';
      }
    }
  },
 
  _isUserOnAuthPage(pages) {
    const filteredPages = pages.filter((item) => window.location.pathname.endsWith(item));
    return Boolean(filteredPages.length);
  },
};
 
export default CheckUserAuth;