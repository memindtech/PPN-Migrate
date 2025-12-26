<script setup lang="ts">
const store = useAppConfigStore()

// รายละเอียดภาษาเพื่อใช้แสดงผลใน UI
const langMap = {
  TH: { label: 'ไทย', flag: '🇹🇭' },
  EN: { label: 'English', flag: '🇺🇸' },
  CN: { label: '中文', flag: '🇨🇳' }
}
</script>

<template>
  <div class="lang-switcher">
    <button @click="store.toggleLanguage()" class="btn btn-outline-primary d-flex align-items-center gap-2">
      <span>{{ langMap[store.locale].flag }}</span>
      <span>{{ langMap[store.locale].label }}</span>
    </button>

    <select 
      :value="store.locale" 
      @change="(e) => store.setLanguage((e.target as HTMLSelectElement).value as any)"
      class="form-select mt-2"
    >
      <option value="TH">🇹🇭 ภาษาไทย</option>
      <option value="EN">🇺🇸 English</option>
      <option value="CN">🇨🇳 中文</option>
    </select>
  </div>
</template>

<style scoped>
.lang-switcher {
  display: inline-block;
}
</style>