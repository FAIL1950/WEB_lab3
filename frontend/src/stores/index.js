import { ref} from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const MyStore = defineStore('MyStore', () => {
  const isAuthenticated = ref(false)
  const token = ref(null)

  //user
  const id = ref(null)
  const email = ref(null)
  const name = ref(null)
  const sex = ref(null)
  const birthday = ref(null)
  const password = ref(null)

  const clocks = ref([]);//

  function setAuth(isAuthenticated_, token_) {
    isAuthenticated.value = isAuthenticated_;
    token.value = token_;
  
    if (!isAuthenticated) {
      id.value = null;
      email.value = null;
    }
  }
  
  function setClocks(newArr)
  {
    clocks.value = newArr;
  }

  function setUser(id_, email_, name_, sex_, birthday_, password_) {
    id.value = id_;
    email.value = email_;
    name.value = name_;
    sex.value = sex_;
    birthday.value = birthday_;
    password.value = password_;
  }

  async function register( {name,  email, sex, birthday, password }) {    
    try {
      await axios.post("http://localhost:3000/register", {
        name,
        email,
        sex,
        birthday,
        password,
      });
      return true;
    } catch (err) {
      return false;
    }
  }
  async function addClock( { time, date, text}) {    
    try {
      await axios.post("http://localhost:3000/addclock", {
        user_id: id.value,
        time,
        text,
        date
      });
      return true;
    } catch (err) {
      return false;
    }
  }
  async function updateClocks() {    
    try {
      
      const res = await axios.get("http://localhost:3000/getclocks", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        }
      });

      setClocks(res.data.clocks);
      
      return true;
    } catch (err) {
      return false;
    }
  }
  async function delClock(clock_id)
  {
    setClocks([]);
    try {
      const res = await axios.delete("http://localhost:3000/clock", {
        data: {
          id: clock_id
        }
      });
      updateClocks();
      console.log(clocks.value);
      return true;

    } catch (err) {
      return false;
    }
  }

  async function login( { email, password }) {       
    try {
      const res = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      const token = res.data.token;
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setAuth(true, token);
      setUser(decoded.id, email, res.data.password);
      localStorage.setItem("token", token);
      
      return true;
    } catch (err) {
      return false;
    }
  }

  async function logout() {                             
    setAuth(false, null);
    localStorage.removeItem("token");
  }
  
  async function autoLogin() {
    try {
      const res = await axios.get("http://localhost:3000/profile", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        }
      });
      setAuth(true, token);
      setUser(res.data.id, res.data.email,'', '', '', '');
      return true;
    } catch (err) {
      setAuth(false, null);
      localStorage.removeItem("token");

      return false;
    }
  }

  async function fetchProfile() {
    try {
      const res = await axios.get("http://localhost:3000/profile", {
          headers: {
              "x-access-token": localStorage.getItem("token"),
          },
      });

      setUser(res.data.id, res.data.email, res.data.name, res.data.sex, res.data.birthday, res.data.password);

      return true;
  } catch (err) {
      setAuth(false, null);
      localStorage.removeItem("token");

      return false;
    }
  }
  return { isAuthenticated, token, id, email,name, sex, birthday, password,clocks, setAuth,setUser,setClocks, login ,delClock, register,updateClocks, logout,autoLogin, fetchProfile, addClock}
});

