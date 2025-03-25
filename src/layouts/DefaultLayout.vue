<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <img src="/public/logo.svg" class="cursos-logo" @click="$router.push('/home')" alt="Logo" />
      </div>

      <template v-for="(section, index) in menuSections" :key="index">
        <span class="text-apps uk-margin-top">{{ section.title }}</span>
        <nav class="sidebar-menu">
          <button v-for="item in section.items" :key="item.path" class="menu-item"
            :class="{ active: $route.path === item.path }" @click="$router.push(item.path)">
            <img :src="item.icon" alt="" class="icon-menu" />
            <span class="uk-margin-small-left">{{ item.label }}</span>
          </button>
        </nav>
      </template>

      <div class="sidebar-footer">
        <span class="text-apps uk-margin-top">Paginas</span>
        <button class="menu-item" @click="$router.push('/settings')">
          <img src="/public/lock.svg" alt="" class="icon-menu" />
          <span class="uk-margin-small-left">Autenticação</span>
        </button>
      </div>
    </aside>

    <main class="main-content">
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
};
</script>

<style scoped>
.icon-menu {
  width: 15px;
  margin-top: -4px;
}

.layout {
  display: flex;
}

.cursos-logo {
  cursor: pointer;
}

.sidebar-footer {
  margin-top: auto;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sidebar {
  width: 220px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 20px;
  z-index: 1000;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar-menu {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-item {
  padding: 10px;
  font-size: 14px;
  color: #333;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background 0.3s;
  border-radius: 5px;
  margin-top: -5px;
}

.menu-item:hover {
  background: #6c63ff;
  color: white;
}

.menu-item.active {
  background: #6c63ff;
  color: white;
}

.menu-item.active .icon-menu {
  filter: invert(1) brightness(2);
  /* Torna o ícone branco */
}

.main-content {
  margin-left: 260px;
  padding: 20px;
  width: calc(100% - 260px);
}

.text-apps {
  color: #999999;
  font-weight: 400;
  line-height: 36px;
  letter-spacing: 0px;
  margin-bottom: -10px;
}
</style>