<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { init } = useAppInit()

// เรียกทำงานทันทีก่อนที่ Component จะแสดงผล (หรือใช้ onMounted ก็ได้)
onBeforeMount(() => {
  init()
})
</script>

<style>
/* 1. กำหนดสีเริ่มต้น (Light Mode) */
:root {
  --bg-color: #f8f9fa;
  --bg-card: #ffffff;
  --text-color: #212529;
  --border-color: #dee2e6;
  --primary-color: #007bff;
}

/* 2. กำหนดสีเมื่อมี Class .dark-theme (Dark Mode) */
:root.dark-theme {
  --bg-color: #121212;
  --bg-card: #1e1e1e;
  --text-color: #e0e0e0;
  --border-color: #333333;
  --primary-color: #375a7f;
}

/* 3. นำตัวแปรไปใช้กับ Body หรือองค์ประกอบหลัก */
body {
  background-color: var(--bg-color);
  color: var(--text-color);
  margin: 0;
  font-family: sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* ตัวอย่างการใช้สีกับ Card */
.card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
}
</style>