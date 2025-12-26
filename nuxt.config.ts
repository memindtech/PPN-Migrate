// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // เพิ่มส่วนนี้เข้าไปครับ
  modules: [
    '@pinia/nuxt'
  ],

  // (ตัวเลือกเพิ่มเติม) ถ้าใช้ Nuxt 4 และวางโฟลเดอร์ไว้ใน app/ 
  // ปกติ Nuxt จะหาเจอเอง แต่ถ้าไม่เจอสามารถระบุโฟลเดอร์ให้ชัดเจนได้
  imports: {
    dirs: ['stores'] 
  }
})