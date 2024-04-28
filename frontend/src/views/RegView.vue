<script setup>
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { MyStore } from '../stores/index.js'

  const store = MyStore();
  const router = useRouter();

  const name = ref('')
  const email = ref('')
  const sex = ref('')
  const birthday = ref('')
  const password = ref('')
  

  const error = ref(null)
  
  const maxDate = computed(() => {
        const today = new Date();
        return today.toISOString().split('T')[0]; 
    })

  async function register() 
  {
    const success = await store.register({name: name.value,email: email.value,sex: sex.value,birthday: birthday.value,password: password.value,})

      if (!success) {
        error.value = "Unable to register with provided credentials";
      } else {
        router.push('/')
      }
  }
</script>

<template>
<header>
    <div class="container text-center text-light mt-5">
      <h2>Зареєструватись</h2>
    </div>
  </header>
  <main class="mb-5">
    <div class="container">
      <div class="row w-100 mt-5">
        <div class="col-12 col-md-4">

        </div>
        <div class="ms-2 ms-md-0 col-12 col-md-4">
          <div class=" text-light border border-1 rounded-3 p-4 border-info">
            <form @submit.prevent="register">
              <div class="mb-3">
                <label for="Name" class="form-label">Ім'я</label>
                <input type="text" class="form-control" id="regName" name="name" v-model="name" required>
              </div>

              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input type="email" class="form-control" id="regEmail" name="email" v-model="email" required>
              </div>

              <div class="mb-3">
                <label class="form-label">Стать</label>
                <div>
                  <input type="radio" id="male" name="gender" value="male" v-model="sex" required>
                  <label for="male">Чоловік</label>
                </div>
                <div>
                  <input type="radio" id="female" name="gender" value="female" v-model="sex" required>
                  <label for="female">Жінка</label>
                </div>
              </div>

              <div class="mb-3">
                <label for="birthdate" class="form-label">Дата народження</label>
                <input type="date" class="form-control" id="regBirthdate" name="birthdate" :max="maxDate" v-model="birthday" required>
              </div>

              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Пароль</label>
                <input type="password" class="form-control" id="regPassword" name="password" v-model="password" required>
              </div>

              <button type="submit" class="btn btn-primary" id="submitReg">Підтвердити</button>
            </form>

          </div>
          <div v-if="error">
            <div class="alert alert-danger d-flex mt-3" role="alert">
              <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Error">
              <use xlink:href="#error-circle-fill"/>
              </svg>
              <div>{{error}}</div>
            </div>
          </div>

        </div>
      </div>
      <div class="col-12 col-md-4">

      </div>
    </div>
  </main>
</template>
