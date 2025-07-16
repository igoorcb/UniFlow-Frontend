<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 md:p-10 flex flex-col gap-6">
      <div class="flex flex-col items-center gap-1 mb-2">
        <span class="text-2xl font-bold text-gray-800">{{ isLogin ? 'Entrar na conta' : 'Criar conta' }}</span>
        <span class="text-sm text-gray-400">Uniflow</span>
      </div>
      <div class="flex justify-center gap-2 mb-2">
        <button :class="[isLogin ? 'text-indigo-600 border-b-2 border-indigo-500' : 'text-gray-400', 'px-4 py-2 font-medium text-base transition-all']" @click="isLogin = true">Entrar</button>
        <button :class="[!isLogin ? 'text-indigo-600 border-b-2 border-indigo-500' : 'text-gray-400', 'px-4 py-2 font-medium text-base transition-all']" @click="isLogin = false">Registrar</button>
      </div>
      <form v-if="isLogin" @submit.prevent="handleLogin" class="flex flex-col gap-4">
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-1">Email ou Usuário</label>
          <input v-model="loginForm.email" type="text" class="input-tw" :class="{'border-red-400': loginErrors.email}" autocomplete="username" placeholder="Digite seu email ou usuário" />
          <p v-if="loginErrors.email" class="text-red-500 text-xs mt-1">{{ loginErrors.email }}</p>
        </div>
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-1">Senha</label>
          <input v-model="loginForm.password" type="password" class="input-tw" :class="{'border-red-400': loginErrors.password}" autocomplete="current-password" placeholder="Digite sua senha" />
          <p v-if="loginErrors.password" class="text-red-500 text-xs mt-1">{{ loginErrors.password }}</p>
        </div>
        <button type="submit" class="btn-tw">Entrar</button>
        <div class="flex justify-between items-center mt-1">
          <button type="button" class="text-indigo-500 text-xs hover:underline" @click="showForgot = true">Esqueci minha senha</button>
          <button class="text-gray-500 text-xs hover:underline" @click="isLogin = false">Criar conta</button>
        </div>
        <transition name="fade">
          <p v-if="loginMessage" :class="loginSuccess ? 'text-green-600' : 'text-red-500'" class="mt-2 text-center font-medium">{{ loginMessage }}</p>
        </transition>
      </form>
      <form v-else @submit.prevent="handleRegister" class="flex flex-col gap-4">
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-1">Nome</label>
          <input v-model="registerForm.name" type="text" class="input-tw" :class="{'border-red-400': registerErrors.name}" placeholder="Seu nome completo" />
          <p v-if="registerErrors.name" class="text-red-500 text-xs mt-1">{{ registerErrors.name }}</p>
        </div>
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-1">Email</label>
          <input v-model="registerForm.email" type="email" class="input-tw" :class="{'border-red-400': registerErrors.email}" placeholder="Seu melhor email" />
          <p v-if="registerErrors.email" class="text-red-500 text-xs mt-1">{{ registerErrors.email }}</p>
        </div>
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-1">Senha</label>
          <input v-model="registerForm.password" type="password" class="input-tw" :class="{'border-red-400': registerErrors.password}" placeholder="Crie uma senha" />
          <p v-if="registerErrors.password" class="text-red-500 text-xs mt-1">{{ registerErrors.password }}</p>
        </div>
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-1">Confirmar Senha</label>
          <input v-model="registerForm.confirmPassword" type="password" class="input-tw" :class="{'border-red-400': registerErrors.confirmPassword}" placeholder="Repita a senha" />
          <p v-if="registerErrors.confirmPassword" class="text-red-500 text-xs mt-1">{{ registerErrors.confirmPassword }}</p>
        </div>
        <button type="submit" class="btn-tw">Registrar</button>
        <div class="flex justify-between items-center mt-1">
          <button class="text-gray-500 text-xs hover:underline" @click="isLogin = true">Já tem conta?</button>
        </div>
        <transition name="fade">
          <p v-if="registerMessage" :class="registerSuccess ? 'text-green-600' : 'text-red-500'" class="mt-2 text-center font-medium">{{ registerMessage }}</p>
        </transition>
      </form>
      <transition name="fade">
        <div v-if="showForgot" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div class="bg-white p-6 rounded-xl shadow-xl w-80 relative animate-fade-in border border-indigo-100">
            <button class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" @click="showForgot = false">&times;</button>
            <h2 class="text-lg font-bold mb-2 text-indigo-600">Recuperar senha</h2>
            <p class="text-sm text-gray-600 mb-4">Funcionalidade visual apenas.</p>
            <input type="email" placeholder="Seu email" class="input-tw w-full mb-2" />
            <button class="btn-tw w-full" @click="showForgot = false">Enviar</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const isLogin = ref(true);
const showForgot = ref(false);

const loginForm = reactive({ email: '', password: '' });
const loginErrors = reactive({ email: '', password: '' });
const loginMessage = ref('');
const loginSuccess = ref(false);

const registerForm = reactive({ name: '', email: '', password: '', confirmPassword: '' });
const registerErrors = reactive({ name: '', email: '', password: '', confirmPassword: '' });
const registerMessage = ref('');
const registerSuccess = ref(false);

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function handleLogin() {
  loginErrors.email = '';
  loginErrors.password = '';
  loginMessage.value = '';
  loginSuccess.value = false;
  if (!loginForm.email) loginErrors.email = 'Campo obrigatório';
  if (!loginForm.password) loginErrors.password = 'Campo obrigatório';
  if (loginForm.email && !validateEmail(loginForm.email)) loginErrors.email = 'Email inválido';
  if (loginForm.password && loginForm.password.length < 6) loginErrors.password = 'Mínimo 6 caracteres';
  if (loginErrors.email || loginErrors.password) return;
  // Simulação de autenticação
  if (loginForm.email === 'admin@teste.com' && loginForm.password === '123456') {
    loginMessage.value = 'Login realizado com sucesso!';
    loginSuccess.value = true;
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('auth-success'));
    }, 800);
  } else {
    loginMessage.value = 'Credenciais inválidas';
    loginSuccess.value = false;
  }
}

function handleRegister() {
  registerErrors.name = '';
  registerErrors.email = '';
  registerErrors.password = '';
  registerErrors.confirmPassword = '';
  registerMessage.value = '';
  registerSuccess.value = false;
  if (!registerForm.name) registerErrors.name = 'Campo obrigatório';
  if (!registerForm.email) registerErrors.email = 'Campo obrigatório';
  if (!registerForm.password) registerErrors.password = 'Campo obrigatório';
  if (!registerForm.confirmPassword) registerErrors.confirmPassword = 'Campo obrigatório';
  if (registerForm.email && !validateEmail(registerForm.email)) registerErrors.email = 'Email inválido';
  if (registerForm.password && registerForm.password.length < 6) registerErrors.password = 'Mínimo 6 caracteres';
  if (registerForm.password !== registerForm.confirmPassword) registerErrors.confirmPassword = 'Senhas não coincidem';
  if (registerErrors.name || registerErrors.email || registerErrors.password || registerErrors.confirmPassword) return;
  // Simulação de registro
  registerMessage.value = 'Registro realizado! Faça login.';
  registerSuccess.value = true;
  setTimeout(() => {
    isLogin.value = true;
    registerMessage.value = '';
  }, 1200);
}
</script>

<style scoped>
.input-tw {
  @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white placeholder-gray-400 transition-all text-base;
}
.btn-tw {
  @apply bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all font-semibold shadow-sm;
}
.animate-fade-in {
  animation: fade-in 0.5s;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style> 