// Import our custom CSS
import '../sass/main.scss';

// Import javascript file as needed
import Dashboard from './pages/dashboard';
import * as bootstrap from 'bootstrap';

const routes = {
  '/': Dashboard,
};

const detectRoute = () => routes[window.location.pathname];
 
const initPages = () => {};
 
window.addEventListener('DOMContentLoaded', async () => {
  initPages();
 
  const route = detectRoute();
  route.init();
});