import { reactive } from 'vue';

const state = reactive({
  token: localStorage.getItem('token') || null,
  user: null,
});

function setToken(token) {
  state.token = token;
  localStorage.setItem('token', token);
}

function logout() {
  state.token = null;
  localStorage.removeItem('token');
}

export default {
  state,
  setToken,
  logout,
};
