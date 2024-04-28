<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { MyStore } from '../stores/index.js'
const store = MyStore();
const props = defineProps({
  idx: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    required: false
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  clock_id: {
    type: Number,
    required: true
  }
})

const timeout = ref(null)

function createTimeout(date_, time_, text_) {
  
  const [year, month, day] = date_.split('-')
  const [hour, minute] = time_.split(':')
  const targetDate = new Date(year, month - 1, day, hour, minute)
  if(targetDate.getTime() >= Date.now())
  {
    const timeoutDuration = targetDate.getTime() - Date.now()

    timeout.value = setTimeout(() => {
      alert(`Спрацював будильник \n\n ${text_}`);
      store.delClock(props.clock_id);
    }, timeoutDuration)
    return timeout.value;
  }
  else {
    alert(`Поки Вас не було спрацював будильник \n\n ${text_}`);
    store.delClock(props.clock_id);
    return null;
  }
}


function removeTimeout(id, mode) {
  const timeoutId = timeout.value
  if (timeoutId) {
    console.log("removeTimeout");
    clearTimeout(timeoutId)
    timeout.value = null
  }
  if(mode === true)
  {
    store.delClock(id);
  }
  
}


onMounted(() => {
  const c_id = createTimeout(props.date, props.time, props.text);
})
onBeforeUnmount(() => {
  removeTimeout(props.clock_id, false);
});
</script>



<template>
  <td scope="col">{{ props.idx }}</td>
  <td scope="col">{{ props.text }}</td>
  <td scope="col">{{ props.date }}</td>
  <td scope="col">{{ props.time }}</td>
  <td scope="col"><button @click="removeTimeout(props.clock_id, true)">Видалити</button></td>
</template>

