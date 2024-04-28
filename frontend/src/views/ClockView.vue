<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { MyStore } from '../stores/index.js'
import MyClock from '../components/clock.vue'

const store = MyStore();
const router = useRouter();

const userTime = ref('')
const userDate = ref('')
const userText = ref('')

const error = ref(null)
const sucsMsg = ref(null)
const NOW = ref(new Date());

const updateTime = () => {
  NOW.value = new Date();
};

const currentTime = computed(() => {
  const date = NOW.value;
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
});

const currentDate = computed(() => {
  const date = NOW.value;
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
});

const minDate = computed(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
})

async function updateClocks() {
  const success = await store.updateClocks();

  if (!success) {
    error.value = "Не вдалось отримати будильники.";
  }
}
async function createClock() {
  const [year, month, day] = userDate.value.split('-')
  const [hour, minute] = userTime.value.split(':')
  const targetDate = new Date(year, month - 1, day, hour, minute)
  if (targetDate.getTime() < Date.now()) {
    error.value = "Не можливо створити будильник на час, який минув."
    sucsMsg.value = null;
  }
  else {
    const success = await store.addClock({ time: userTime.value, date: userDate.value, text: userText.value })

    if (!success) {
      error.value = "Не вдалось створити будильник.";
      sucsMsg.value = null;
    } else {

      await updateClocks();
      error.value = null;
      sucsMsg.value = "Будильник успішно створено.";
    }
  }


}

onMounted(async () => {
  const timerId = setInterval(updateTime, 1000);
  await updateClocks();
  return () => clearInterval(timerId);
});
</script>

<template>
  <div class="row w-100 mt-5">
    <div class="col-2 col-sm-2 col-md-4 d-flex justify-content-start align-items-center">
    </div>
    <div class="col-8 col-sm-6 col-md-4 d-flex justify-content-center align-items-center">
      <div class="text-light w-100">
        <h4>Поточний час та дата:</h4>
        <div id="clock" style="font-size: 3rem;">{{ currentTime }}</div>
        <p class="h4 p-2" id="date">{{ currentDate }}</p>
        <form @submit.prevent="createClock">
          <div class="w-100">
            <label for="alarmTime" class="mb-2">Встановіть час будильника:</label>
            <input type="time" id="alarmTime" class="form-control mb-2" v-model="userTime" required>

            <label for="alarmDate" class="mb-2">Встановіть дату будильника:</label>
            <input type="date" id="alarmDate" class="form-control mb-2" v-model="userDate" :min="minDate" required>

            <label for="alarmName" class="mb-2">Встановіть назву будильника:</label>
            <input type="text" id="alarmName" class="form-control mb-2" v-model="userText">

            <button type="submit" class="btn btn-primary" id="submitReg">Створити будильник</button>
            <div v-if="error">
              <div class="alert alert-danger d-flex mt-3" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Error">
                  <use xlink:href="#error-circle-fill" />
                </svg>
                <div>{{ error }}</div>
              </div>
            </div>

            <div v-if="sucsMsg">
              <div class="alert alert-success d-flex mt-3" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="ok">
                  <use xlink:href="#check-circle-fill" />
                </svg>
                <div>{{ sucsMsg }}</div>
              </div>
            </div>

          </div>
        </form>


      </div>
    </div>
    <div class="col-2 col-sm-4 col-md-4 d-flex justify-content-end align-items-center">
    </div>
  </div>
  <div class="container text-light text-center mt-5 table-responsive">
    <h2>Список будильників</h2>
    <table id="alarmTable" class="table table-dark table-striped mt-5">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Назва</th>
          <th scope="col">Дата</th>
          <th scope="col">Час</th>
          <th scope="col">Управління</th>
        </tr>
        <tr v-for="(clock, index) in store.clocks" :key="index">
          <MyClock :idx="index" :text="clock.user_text" :date="clock.user_date" :time="clock.user_time"
            :clock_id="clock.clock_id" />
        </tr>
      </thead>
      <tbody>

      </tbody>
    </table>

  </div>
</template>

<style></style>
