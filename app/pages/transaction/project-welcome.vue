<template>
    <div class="container-xl">
        <h1>{{ store.t.pleaseEnterUsername }}</h1>
        <button @click="store.toggleTheme">Toggle Theme</button>
    </div>
</template>

<script setup lang="ts">
// 1. เรียกใช้งาน Store
const store = useAppConfigStore()

// ตัวอย่างการใช้งานสิทธิการเข้าถึง (ถ้ามี)
const canEdit = true 
</script>