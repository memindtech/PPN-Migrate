export const useAppInit = () => {
  const store = useAppConfigStore()

  const init = () => {
    if (import.meta.client) {
      // 1. จัดการเรื่องธีม
      const savedTheme = localStorage.getItem('ppn_theme') || 'light'
      store.theme = savedTheme
      store.applyTheme()

      // 2. จัดการเรื่องภาษา
      const savedLang = localStorage.getItem('ppn_language') || 'TH'
      store.setLanguage(savedLang)
    }
  }

  return { init }
}