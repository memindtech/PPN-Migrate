import { useAppConfigStore } from '../stores/appConfig'
import type { Locale } from '../utils/translations'

export const useAppInit = () => {
  const store = useAppConfigStore()

  const init = () => {
    // ตรวจสอบว่าเป็นฝั่ง Client (Browser) หรือไม่ เพราะ localStorage ไม่มีใน Server
    if (import.meta.client) {
      
      // 1. จัดการเรื่องธีม (Theme)
      const savedTheme = localStorage.getItem('ppn_theme') || 'light'
      store.theme = savedTheme
      store.applyTheme()

      // 2. จัดการเรื่องภาษา (Language)
      const savedLang = localStorage.getItem('ppn_language') as Locale
      const validLocales: Locale[] = ['TH', 'EN', 'CN']

      // ตรวจสอบว่าภาษาที่บันทึกไว้ถูกต้องตามที่ระบบมีหรือไม่
      if (savedLang && validLocales.includes(savedLang)) {
        store.setLanguage(savedLang)
      } else {
        store.setLanguage('TH') // ถ้าไม่มีค่า หรือค่าผิด ให้ใช้ภาษาไทยเป็นค่าเริ่มต้น
      }
      
      console.log(`App Initialized: Language=${store.locale}, Theme=${store.theme}`)
    }
  }

  return { init }
}