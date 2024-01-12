// Import our custom CSS
import '../sass/main.scss';

// Import components
import './components/index';

// Import javascript file as needed
import Dashboard from './pages/dashboard';
import * as bootstrap from 'bootstrap';

const routes = {
  '/': Dashboard,
};

const detectRoute = () => routes[window.location.pathname];
 
const initPages = () => {
    const SnapSwift = document.querySelector(".toggle-btn");

  SnapSwift.addEventListener("click", function () {
    document.querySelector("#sidebar").classList.toggle("collapse");
  });
};
 
window.addEventListener('DOMContentLoaded', async () => {
  initPages();
 
  const route = detectRoute();
  route.init();
});