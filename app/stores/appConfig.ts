import { defineStore } from 'pinia'
import { translations, type Locale } from '../utils/translations'

export const useAppConfigStore = defineStore('appConfig', {
  state: () => ({
    theme: 'light',
    locale: 'TH' as Locale,
  }),
  getters: {
    // นิยาม t เป็น Getter เพื่อให้ดึงข้อมูลภาษาตาม locale ปัจจุบัน
    t: (state) => translations[state.locale]
  },

  actions: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      if (import.meta.client) {
        localStorage.setItem('ppn_theme', this.theme)
        this.applyTheme()
      }
    },
    setLanguage(lang: Locale) {
      this.locale = lang // เปลี่ยนแค่ locale
      if (import.meta.client) {
        localStorage.setItem('ppn_language', lang)
      }
    },
    applyTheme() {
      if (import.meta.client) {
        const root = document.documentElement
        if (this.theme === 'dark') {
          root.classList.add('dark-theme')
        } else {
          root.classList.remove('dark-theme')
        }
      }
    },
    toggleLanguage() {
      const locales: Locale[] = ['TH', 'EN', 'CN'];
      const currentIndex = locales.indexOf(this.locale);
      const nextIndex = (currentIndex + 1) % locales.length;
      this.setLanguage(locales[nextIndex]);
    },
  }
})