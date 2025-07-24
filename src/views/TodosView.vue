<template>
  <header class="flex shadow-md py-4 px-4 sm:px-10 bg-white min-h-[70px] tracking-wide relative z-50">
    <div class="flex flex-wrap items-center justify-between gap-5 w-full">
      <span class="text-2xl font-bold text-blue-600">Todo App</span>
      <div class="flex items-center gap-4">
        <button 
          @click="openCreateModal"
          type="button"
          class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Criar Tarefa
        </button>
      </div>
    </div>
  </header>

  <div class="flex mt-10 px-4 sm:px-10">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">
              Título
            </th>
            <th scope="col" class="px-6 py-3">
              Descrição
            </th>
            <th scope="col" class="px-6 py-3">
              Status
            </th>
            <th scope="col" class="px-6 py-3">
              Data de Criação
            </th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading" class="bg-white border-b border-gray-200">
            <td colspan="5" class="px-6 py-4 text-center">
              <div class="flex items-center justify-center">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span class="ml-2">Carregando tarefas...</span>
              </div>
            </td>
          </tr>
          <tr v-else-if="todos.length === 0" class="bg-white border-b border-gray-200">
            <td colspan="5" class="px-6 py-4 text-center text-gray-500">
              Nenhuma tarefa encontrada
            </td>
          </tr>
          <tr 
            v-for="todo in todos" 
            :key="todo.id" 
            class="bg-white border-b border-gray-200 hover:bg-gray-50">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ todo.title }}
            </th>
            <td class="px-6 py-4">
              {{ todo.description }}
            </td>
            <td class="px-6 py-4">
              <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Ativa
              </span>
            </td>
            <td class="px-6 py-4">
              {{ formatDate(todo.created_at) }}
            </td>
            <td class="px-6 py-4 text-right">
              <button 
                @click="editTodo(todo)"
                class="font-medium text-blue-600 hover:underline mr-3">
                Editar
              </button>
              <button 
                @click="deleteTodo(todo.id)"
                class="font-medium text-red-600 hover:underline">
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal para criar/editar tarefa -->
  <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div class="mt-3">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ editingTodo ? 'Editar Tarefa' : 'Criar Nova Tarefa' }}
        </h3>
        <form @submit.prevent="editingTodo ? updateTodo() : createTodo()">
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
              Título
            </label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o título da tarefa"
            />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
              Descrição
            </label>
            <textarea
              id="description"
              v-model="form.description"
              required
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite a descrição da tarefa"
            ></textarea>
          </div>
          <div class="flex justify-end gap-3">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="submitting"
              class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {{ submitting ? 'Salvando...' : (editingTodo ? 'Atualizar' : 'Criar') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'TodoView',
  data() {
    return {
      todos: [],
      loading: false,
      showModal: false,
      submitting: false,
      editingTodo: null,
      form: {
        title: '',
        description: ''
      }
    };
  },
  async mounted() {
    await this.loadTodos();
  },
  methods: {
    async loadTodos() {
      this.loading = true;
      try {
        const response = await api.get('/todos');
        this.todos = response.data;
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      } finally {
        this.loading = false;
      }
    },

    openCreateModal() {
      this.editingTodo = null;
      this.form = {
        title: '',
        description: ''
      };
      this.showModal = true;
    },

    editTodo(todo) {
      this.editingTodo = todo;
      this.form = {
        title: todo.title,
        description: todo.description
      };
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.editingTodo = null;
      this.form = {
        title: '',
        description: ''
      };
    },

    async createTodo() {
      this.submitting = true;
      try {
        const response = await api.post('/todos', this.form);
        this.todos.push(response.data);
        this.closeModal();
      } catch (error) {
        console.error('Erro ao criar tarefa:', error);
      } finally {
        this.submitting = false;
      }
    },

    async updateTodo() {
      this.submitting = true;
      try {
        const response = await api.put(`/todos/${this.editingTodo.id}`, this.form);
        const index = this.todos.findIndex(todo => todo.id === this.editingTodo.id);
        if (index !== -1) {
          this.todos[index] = response.data;
        }
        this.closeModal();
      } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
      } finally {
        this.submitting = false;
      }
    },

    async deleteTodo(id) {
      if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        try {
          await api.delete(`/todos/${id}`);
          this.todos = this.todos.filter(todo => todo.id !== id);
        } catch (error) {
          console.error('Erro ao excluir tarefa:', error);
        }
      }
    },

    formatDate(dateString) {
      if (!dateString) return '-';
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
};
</script>