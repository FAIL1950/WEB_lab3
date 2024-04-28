<script setup>
import { RouterLink, RouterView , useRouter } from 'vue-router'
import { MyStore } from './stores/index.js'
import { computed } from 'vue';
const router = useRouter();
const store = MyStore();
const authenticated = computed(() =>{
  return store.isAuthenticated;
})

const logout = computed(() => {
  store.logout();
  router.push('/');
})

router.afterEach(() => {
  const navbar = document.getElementById('navbarSupportedContent');
  if (navbar) {
    navbar.classList.remove('show');
  }
});


</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <div class="d-flex flex-column min-vh-100" style="background-color: #06080f;">
    <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <div class="row w-100">
        <div class="col-2 col-sm-2 col-md-4 d-flex justify-content-start align-items-center "><button
            class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Переключатель навигации">
            <span class="navbar-toggler-icon"></span>
          </button></div>
        <div class="col-4 col-sm-6 col-md-4 d-flex justify-content-center align-items-center">
          <div class="">
            <RouterLink to="/clocks"><button id="myButton" type="button" class="btn btn-dark active btn-sm">БУДИЛЬНИК ОНЛАЙН</button></RouterLink>
          </div>
        </div>
        <div id="log_reg" class="col-6 col-sm-4 col-md-4 d-flex justify-content-end align-items-center">
          <div class="btn-group" role="group" style="font-size: 0;" v-if="!authenticated">
            <RouterLink to="/" id="myButton" class="btn btn-outline-primary btn-sm">Увійти</RouterLink>
            <RouterLink to="/registration" id="myButton" class="btn btn-outline-primary btn-sm">Зареєструватись</RouterLink>
          </div>
          <div v-if="authenticated">
            <button id="myButton" type="button" class="btn btn-outline-danger btn-sm" @click ="logout">Вийти</button>
          </div>
        </div>
      </div>
    </div>

    </nav>
    <div class="w-25">
      <div class="w-25 p-1 collapse  navbar-collapse bg-transparent position-absolute" id="navbarSupportedContent">
    <div class="rounded-2" style="background-color: #0e1729;">
      <ul class="nav flex-column">
        <li class="w-100">
          <div class="d-flex justify-content-center w-100">
            <RouterLink to="/about" class="btn btn-outline-light w-100">Про додаток</RouterLink>
          </div>
        </li>

        <li class="w-100">
          <div class="d-flex justify-content-center w-100">
            <RouterLink to="/profile" class="btn btn-outline-light w-100">Профіль</RouterLink>
          </div>
        </li>
      </ul>
    </div>

    </div>
    </div>
    

    <RouterView />
    <div class="wrapper flex-grow-1"></div>
    <footer class="bg-dark text-white text-center mt-5">
    <!-- Grid container -->
    <div class="container p-4 pb-0">
      <!-- Section: Social media -->
      <section class="mb-4">
        <!-- Facebook -->
        <a data-mdb-ripple-init class="btn btn-floating m-1" style="background-color: #3b5998;" href="#!"
          role="button"><i class="fab fa-facebook-f"></i></a>

        <!-- Twitter -->
        <a data-mdb-ripple-init class="btn btn-floating m-1" style="background-color: #55acee;" href="#!"
          role="button"><i class="fab fa-twitter"></i></a>

        <!-- Google -->
        <a data-mdb-ripple-init class="btn btn-floating m-1" style="background-color: #dd4b39;" href="#!"
          role="button"><i class="fab fa-google"></i></a>

        <!-- Instagram -->
        <a data-mdb-ripple-init class="btn btn-floating m-1" style="background-color: #ac2bac;" href="#!"
          role="button"><i class="fab fa-instagram"></i></a>

        <!-- Linkedin -->
        <a data-mdb-ripple-init class="btn btn-floating m-1" style="background-color: #0082ca;" href="#!"
          role="button"><i class="fab fa-linkedin-in"></i></a>

        <!-- Github -->
        <a data-mdb-ripple-init class="btn btn-floating m-1" style="background-color: #333333;" href="#!"
          role="button"><i class="fab fa-github"></i></a>
      </section>
      <!-- Section: Social media -->
    </div>
    <!-- Grid container -->

    <!-- Copyright -->
    <div class="text-center p-3" style="background-color: rgba(255, 255, 255, 0.1);">
      КВ-12 Гусельніков А.О.
    </div>
    <!-- Copyright -->
  </footer>
  </div>

  
</template>

<style scoped>
@media (min-width: 576px) {
  #myButton {
   
    width: auto;
    height: auto;
    font-size: 1rem; 
    padding: 0.375rem 0.75rem; 
  }
}
</style>
