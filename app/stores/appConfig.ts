// app/stores/appConfig.ts
import { defineStore } from 'pinia'

export const useAppConfigStore = defineStore('appConfig', {
  state: () => ({
    theme: 'light',
    locale: 'TH',
    // ดึงข้อมูลภาษาจากไฟล์ language.js เดิมของคุณ
    translations: {} as any 
  }),
  actions: {
    // ฟังก์ชันสลับธีม
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('ppn_theme', this.theme)
      this.applyTheme()
    },
    // ฟังก์ชันเปลี่ยนภาษา
    setLanguage(lang: string) {
      this.locale = lang
      localStorage.setItem('ppn_language', lang)
      // โหลด object ภาษาใหม่ (อ้างอิงจาก window.lang เดิม)
      if (import.meta.client && window.lang) {
        this.translations = window.lang[lang]
      }
    },
    // ใช้ Class กับ Body
    applyTheme() {
      if (import.meta.client) {
        const root = document.documentElement
        if (this.theme === 'dark') {
          root.classList.add('dark-theme')
        } else {
          root.classList.remove('dark-theme')
        }
      }
    }
  }
})