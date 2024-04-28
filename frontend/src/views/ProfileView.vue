<script setup>
  import { MyStore } from '../stores/index.js'

  const store = MyStore();
</script>

<template>
<header>

    <div class="container text-center text-light mt-5">
      <div class="row">
        <div class="col-3">

        </div>
        <div class="col-5 ms-4">
          <h2>Профіль</h2>
        </div>
        <div class="col-4">

        </div>
      </div>
    </div>
  </header>
  <main class="mb-5 mt-5">
    <div class="container-fluid mt-5 table-responsive">
      <table id="profileData" class="table table-bordered table-dark">
        <thead>
          <tr>
            <th scope="col">Ім'я</th>
            <th scope="col">Email</th>
            <th scope="col">Стать</th>
            <th scope="col">День народження</th>
            <th scope="col">Пароль</th>
          </tr>
          <tr>
            <th scope="col">{{ store.name }}</th>
            <th scope="col">{{ store.email }}</th>
            <th scope="col">{{ store.sex }}</th>
            <th scope="col">{{ store.birthday }}</th>
            <th scope="col">{{ store.password }}</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  </main>
  
</template>
