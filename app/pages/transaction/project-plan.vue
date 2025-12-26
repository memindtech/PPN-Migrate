<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { AgGridVue } from "ag-grid-vue3"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import moment from 'moment'

// --- 1. State & Variables ---
const { $xt } = useNuxtApp() // สมมติว่าทำ plugin $xt ไว้แล้ว
const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl

const lang = ref(window.lang[localStorage.getItem("ppn_language") || 'TH'])
const auth = window.auth
const active_pro = ref("Y")
const showspinner1 = ref(true)
const showspinner2 = ref(false)

const dataitem = reactive({
  pre_event: "",
  pre_des: "",
  plan_code: "",
  planname: "",
  close_site: false
})

const dataplan = reactive({
  contract_amt: 0,
  plan_type: "P0001",
  jobcode: "",
  start_date: new Date(),
  end_date: new Date(),
  pre_event_vo: ""
})

// --- 2. Grid Definitions ---
const gridright = reactive({
  api: null,
  columnDefs: [],
  rowData: []
})

const gridleft = reactive({
  api: null,
  columnDefs: [],
  rowData: []
})

// --- 3. Methods (แปลงจาก methods เดิม) ---
const onloadProjectData = async () => {
  showspinner1.value = true
  try {
    let act = `Planning/Planning/Planning_project_web2?active=${active_pro.value}`
    let rsp = await $xt.getServer(act)
    gridright.rowData = rsp.data.map(v => ({
      ...v,
      id: Math.floor(Math.random() * 1000000),
      j_start: $xt.formatDate(v.j_start),
      j_end: $xt.formatDate(v.j_end)
    }))
  } finally {
    showspinner1.value = false
  }
}

const onGridrightCellClicked = async (event) => {
  dataitem.pre_event = event.data.pre_event
  dataitem.pre_des = event.data.pre_des
  dataitem.close_site = event.data.close_site === "Y"
  
  // เรียกโหลดแผนงาน
  await onloadPlan(event.data.pre_event)
}

const onloadPlan = async (pre_event) => {
  if (!pre_event) return
  showspinner2.value = true
  try {
    let url = `Planning/Plan/app_plan_list?pre_event=${pre_event}&device=WEB`
    let rsp = await $xt.getServer(url)
    gridleft.rowData = rsp.plan_auth.map(v => ({
      ...v,
      start_date: moment(v.start_date).format("DD/MM/YYYY"),
      end_date: moment(v.end_date).format("DD/MM/YYYY"),
      isLoading: true
    }))
    // โหลดข้อมูลคำนวณของ Plan ต่อ
    const planCodes = gridleft.rowData.map(p => p.plan_code)
    await loadPlanData(planCodes)
  } finally {
    showspinner2.value = false
  }
}

// --- 4. Lifecycle Hooks ---
onMounted(() => {
  document.title = 'Project Planning'
  onloadProjectData()
  
  // jQuery สำหรับ slimScroll (ถ้ายังจำเป็นต้องใช้)
  if (process.client) {
    $("#ownerSlimScroll").slimScroll({
      height: '200px',
      alwaysVisible: true
    })
  }
})
</script>

<template>
  <div class="container-xl">
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">{{ lang.project }}</h4>
            <div class="ms-auto">
              <input type="radio" v-model="active_pro" value="Y" @change="onloadProjectData"> {{ lang.projectopen }}
              <input type="radio" v-model="active_pro" value="N" @change="onloadProjectData"> {{ lang.projectall }}
            </div>
          </div>
          <div class="card-body p-0">
            <ag-grid-vue
              style="width: 100%; height: calc(100vh - 150px);"
              class="ag-theme-alpine"
              :columnDefs="gridright.columnDefs"
              :rowData="gridright.rowData"
              @grid-ready="(params) => gridright.api = params.api"
              @cell-clicked="onGridrightCellClicked"
              :rowHeight="35"
            />
            <div v-if="showspinner1" class="loader">โหลดข้อมูลโครงการ...</div>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">{{ dataitem.pre_des || lang.select_project }}</h4>
            <div class="ms-auto">
               <button class="btn btn-cyan" @click="openCreatenewPlan" :disabled="!dataitem.pre_event">
                 {{ lang.create_new_plan }}
               </button>
            </div>
          </div>
          <div class="card-body p-0">
            <ag-grid-vue
              style="width: 100%; height: calc(100vh - 150px);"
              class="ag-theme-alpine"
              :columnDefs="gridleft.columnDefs"
              :rowData="gridleft.rowData"
              @grid-ready="(params) => gridleft.api = params.api"
              :rowHeight="35"
            />
             <div v-if="showspinner2" class="loader">โหลดแผนงาน...</div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
       <div v-if="isModalOpen" class="modal-backdrop fade show"></div>
       </Teleport>
  </div>
</template>