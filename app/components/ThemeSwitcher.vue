<script setup lang="ts">
const store = useAppConfigStore()
</script>

<template>
  <button 
    @click="store.toggleTheme()" 
    class="btn-theme"
    :title="store.theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'"
  >
    <span v-if="store.theme === 'light'">🌙</span>
    <span v-else>☀️</span>
    <span class="ms-2">{{ store.theme === 'light' ? 'Dark Mode' : 'Light Mode' }}</span>
  </button>
</template>

<style scoped>
.btn-theme {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #ccc;
  background: var(--bg-card);
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-theme:hover {
  opacity: 0.8;
}
</style>