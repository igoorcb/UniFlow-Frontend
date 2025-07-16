<template>
  <div class="flex">
    <aside class="fixed left-0 top-0 h-screen w-[220px] bg-white shadow-[2px_0_10px_rgba(0,0,0,0.1)] flex flex-col p-5 z-[1000]">
      <div class="flex items-center justify-between">
        <img src="/public/logo.svg" class="cursor-pointer" @click="$router.push('/home')" alt="Logo" />
      </div>
      <template v-for="(section, index) in menuSections" :key="index">
        <span
          :class="[
            'font-normal leading-9 tracking-[0px] mb-[-10px] mt-4 transition-colors duration-300',
            section.items.some(item => $route.path === item.path)
              ? 'text-[#6c63ff] font-bold'
              : 'text-[#999]'
          ]"
        >
          {{ section.title }}
        </span>
        <nav class="mt-5 flex flex-col gap-2.5">
          <button
            v-for="item in section.items"
            :key="item.path"
            @click="$router.push(item.path)"
            :class="[
              'menu-item px-2.5 py-2 text-sm bg-transparent border-0 text-left cursor-pointer transition-colors duration-300 rounded-md mt-[-5px] flex items-center gap-2.5',
              $route.path === item.path
                ? 'bg-[#6c63ff] text-black font-semibold shadow-md'
                : 'text-[#333] hover:bg-[#6c63ff] hover:text-white'
            ]"
          >
            <img
              :src="item.icon"
              alt=""
              class="w-[15px] mt-[-4px]"
              :class="$route.path === item.path ? 'filter invert brightness-200' : ''"
            />
            <span class="ml-2">{{ item.label }}</span>
          </button>
        </nav>
      </template>
      <div class="mt-auto mb-8 flex flex-col gap-2.5">
        <span class="text-[#999] font-normal leading-9 tracking-[0px] mb-[-10px] mt-4">Paginas</span>
        <button
          class="menu-item px-2.5 py-2 text-sm text-[#333] bg-transparent border-0 text-left cursor-pointer transition-colors duration-300 rounded-md mt-[-5px] flex items-center gap-2.5 hover:bg-[#6c63ff] hover:text-white"
          @click="$router.push('/settings')"
          :class="$route.path === '/settings' ? 'bg-[#6c63ff] text-purple-500 font-semibold shadow-md' : ''"
        >
          <img src="/public/lock.svg" alt="" class="w-[15px] mt-[-4px]" :class="$route.path === '/settings' ? 'filter invert brightness-200' : ''" />
          <span class="ml-2">Autenticação</span>
        </button>
        <button class="menu-item mt-2 text-red-500 flex items-center gap-2.5 px-2.5 py-2 text-sm bg-transparent border-0 text-left cursor-pointer transition-colors duration-300 rounded-md" @click="logout">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-[15px] mt-[-4px] inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" /></svg>
          <span class="ml-2">Sair</span>
        </button>
      </div>
    </aside>
    <main class="ml-[260px] p-5 w-[calc(100%-260px)]">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "SidebarLayout",
  data() {
    return {
      menuSections: [
        {
          title: "Ferramentas",
          items: [
            { path: "/dashboard", label: "Dashboard", icon: "/public/home.svg" },
            { path: "/ecommerce", label: "E-commerce", icon: "/public/ecommerce.svg" },
          ],
        },
        {
          title: "Apps",
          items: [
            { path: "/to-do", label: "To-do", icon: "/public/check-square.svg" },
            { path: "/calendar", label: "Calendário", icon: "/public/calendar.svg" },
          ],
        },
      ],
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('isAuthenticated');
      window.location.reload();
    },
  },
};
</script>

