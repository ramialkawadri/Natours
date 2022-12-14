import '@babel/polyfill';
import { login, logout } from './login';

const logoutBtn = document.querySelector('.nav__el--logout');

const loginForm = document.querySelector('.form');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });
}

if (logoutBtn) logoutBtn.addEventListener('click', logout);
