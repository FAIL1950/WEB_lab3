<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { MyStore } from '../stores/index.js'

  const store = MyStore();
  const router = useRouter();
  const email = ref(null)
  const password = ref(null)
  const error = ref(null)

  async function login() 
  {
    
    const success = await store.login({email: email.value, password: password.value})

      if (!success) {
        error.value = "Невірний логін або пароль.";
      } else {
        router.push('/profile')
      }
  }
</script>

<template>
<header>
    <div class="container text-center text-light mt-5">
      <h2>Вхід до облікового запису</h2>
    </div>
  </header>
  <main class="mb-5">
    <div class="container">
      <div class="row w-100 mt-5">
        <div class="col-12 col-md-4">

        </div>
        <div class="ms-2 ms-md-0 col-12 col-md-4">
          <div class=" text-light border border-1 rounded-3 p-4 border-info">
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="loginEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="loginEmail" aria-describedby="emailHelp"  v-model="email" required>
                <div id="emailHelp" class="form-text text-light">Ми ніколи нікому не передамо вашу електронну адресу.
                </div>
              </div>
              <div class="mb-3">
                <label for="loginPassword" class="form-label">Пароль</label>
                <input type="password" class="form-control" id="loginPassword" v-model="password" required>
              </div>
              <button type="submit" class="btn btn-primary" id="submitLogin">Підтвердити</button>
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
        <div class="col-12 col-md-4">

        </div>
      </div>
    </div>
  </main>
</template>
