// Import our custom CSS
import '../sass/main.scss';

// Import components
import './components/index';

// Import javascript file as needed
import Dashboard from './pages/dashboard';
import AddStory from './pages/addstory';
import Register from './pages/accounts/register';
import Login from './pages/accounts/login';
import * as bootstrap from 'bootstrap';

const routes = {
  '/': Dashboard,  
  '/addstory.html': AddStory,

  '/accounts/register.html': Register,
  '/accounts/login.html': Login,
};

const detectRoute = () => routes[window.location.pathname];
 
const initPages = () => {
  const SnapSwift = document.querySelector('.toggle-btn');

  if (SnapSwift) {
    SnapSwift.addEventListener('click', function () {
      document.querySelector('#sidebar').classList.toggle('collapse');
    });
  }
};
 
window.addEventListener('DOMContentLoaded', async () => {
  initPages();
 
  const route = detectRoute();
  route.init();
});