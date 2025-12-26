<template>
    <div class="container-xl">
        <h1>{{ store.t.pleaseEnterUsername }}</h1>
        <LangSwitcher />
        <ThemeSwitcher />
    </div>

        <div class="card p-4 shadow-sm">
        <h5>{{ store.t.profileTitle }}</h5>
        <p>{{ store.t.languagetext }}: <strong>{{ store.locale }}</strong></p>
        
        <div class="mt-3">
            <button class="btn btn-success">{{ store.t.save }}</button>
            <button class="btn btn-light ms-2">{{ store.t.cancel }}</button>
        </div>

        <div class="card p-4 shadow-sm">
            <p>Content will change colors based on the theme.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
// 1. เรียกใช้งาน Store
const store = useAppConfigStore()

// ตัวอย่างการใช้งานสิทธิการเข้าถึง (ถ้ามี)
const canEdit = true 
</script>