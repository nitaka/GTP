<template>
    <header>
        <div id="navbar">
            <div class="nav-brand">
                <router-link to="/home" >
                    <img src="../assets/logo.png" alt="Logo planet-online" class="logo-nav" >
                </router-link>
                <i v-if="user" class="fa fa-navicon" @click="display"></i>
            </div>
            <nav class="bar-items" :class="{ hide: !show }">
                <ul id="menu" >
                    <router-link v-if="user" to="/" class="resonsive-items">
                        <img @click="deconnexion" src="../assets/icon-logout.png" alt="logout" class="logout" id="logout"/>
                    </router-link>
                </ul>
            </nav>
        </div>                              
    </header>
</template>

<script>

import axios from "axios";
import router from '@/router/index.js';
import store from '@/store/index.js';
const CryptoJS = require("crypto-js");

export default {
    data() {
      return {
        show: false,
        user: null,
        token: document.cookie
          ? document.cookie.split("; ").find((row) => row.startsWith("user-token=")).split("=")[1]
        : null,
        userId: document.cookie
          ? CryptoJS.AES.decrypt(document.cookie.split("; ").find((row) => row.startsWith("userId=")).split("=")[1],
            store.state.CryptoKey).toString(CryptoJS.enc.Utf8)
        : null,
      };
    },
    methods: {
      display() {
        this.show = !this.show
      },
  
      deconnexion() {
        document.cookie = "userId=";
        document.cookie = "user-token=";
        router.go();
      },
      getCurrentUser() {
        
        axios.post("http://localhost:3000/api/user",{ userId: this.userId },
        { 
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => (this.user = res.data[0]))
        .catch(function (error) {
          if (error.res && error.res.status === 400) {
            document.cookie = "userId=";
            document.cookie = "user-token=";
            router.push("/");
          }
        });
      },
    },
    mounted() {
      this.getCurrentUser();
    },
  }
  </script>

  <style scoped lang="scss">
.logo-nav {
    padding: 10px;
    height: 89px;
    width: 362px;
    margin-left: 15px;
}

.logout,.setting {
    height: 30px;
    color: #ffffff;
}

#navbar {
    display: flex;
    align-items: center;
    background-color: #1e2631;
    margin-bottom: 100px;
    width: 100%;
}

#menu {
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: end;
    width: 100%;
    margin: 0;
    padding: 0;
}

.bar-items {
  width: 100%;
}

a {
  padding: 10px;
}

a {
  text-decoration: none;
  font-size: 18px;
  color: #fff;
}

.fa {
  display: none;
}

@media(max-width:675px) {

  .img-profil {
    height: 0;
    padding: 0;
        &__user {
            height: 80px;
            width: 80px;
            margin-left: 20px;
            position: absolute;
            left: 0;
            top: 15px;
        }
    }
  
  
  #navbar {
    flex-direction: column;
  }

  .resonsive-items:hover {
    background-color: #2b3646;
  }

  .fa {
    display: block;
    padding: 0 25px;
    position: absolute;
    right: 0;
    color: #fff;
    font-size: 30px;
    cursor: pointer;

  }

  #menu {
    flex-direction: column;
    padding: 5px 0;
  }

  a {
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
  }

  .hide {
    display: none;
  }

  .nav-brand {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 0px;
    background-color: #1e2631;
  }
}

@media(max-width:465px) {

.img-profil {
  height: 0;
  padding: 0;
      &__user {
          height: 80px;
          width: 80px;
          margin-left: 20px;
          position: absolute;
          left: 0;
          top: 200px;
      }
  }
}

  </style>