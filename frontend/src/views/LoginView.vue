<template>
  <div class="container">
      <div class="cont">
        <form class="form sign-in" v-on:submit.prevent="login">
          <h2>Se connecter</h2>
          <label><span>Email</span><input v-model="login.email" type="email" id="LogEmail" name="email" placeholder="Ton email" required /></label>
          <p id="errMail"></p>
          <label><span>Mot de passe</span><input v-model="login.password" type="password" id="logPassword" name="password" placeholder="password" required /></label>
          <p id="errPass"></p>
          <button type="submit" class="submit" @click="sendLogin" >Connexion</button>
        </form>
        <div class="sub-cont">
          <div class="img">
              <div class="img__text m--up">
                <h2>Nouveau sur le groupe</h2>
                <p>Créer un compte 😺 </p>
              </div>
              <div class="img__text m--in">
                <h2>Hello</h2>
                <p>Bienvenue sur le reseau de gestion d'activité GTP-CONSEIL</p>
              </div>
              <div class="img__btn" @click="sendMessage">
                <span class="m--up newAccount">Nouveau compte</span>
                <span class="m--in">Se connecter</span>
              </div>
          </div>
          <form class="form sign-up" v-on:submit.prevent="signup">
            <h2 class="title-sign">Nouveau compte</h2>
            <label><span>Prénom</span><input v-model="signup.prenom" type="text" id="prenom" name="prenom" placeholder="Prénom" required /></label>
            <label><span>Email</span><input v-model="signup.email" type="email" id="email" name="email" placeholder="Email@gmail.com" required/></label>
            <label><span>Mot de passe</span><input v-model="signup.password" type="password" id="password" name="password" placeholder="Mot de passe" required /></label>
            <p id="errPassSign"></p>
            <button type="submit" class="submit" @click="sendSignup">Validation</button>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
  import axios from "axios";
  import store from '@/store/index.js';
  import router from '@/router/index.js';
  const CryptoJS = require("crypto-js");

  export default {
    
    name: "LoginView",
    data() {
      return {
        errorMdp: false,
        signup: {
          prenom: "",
          email: "",
          password: "",
        },
        login: {
          email: "",
          password: "",
        },
      };
    },
    methods: {
      sendMessage() {
          document.querySelector('.cont').classList.toggle('s--signup'); 
      },
       //Crée user
      sendSignup() {
        const regexEmail = new RegExp(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        const regexName = new RegExp(/^[a-zA-Z]+[a-zA-Z]+[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*){3,}$/);
        const regexPassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#?$%^&*.]).{8,}$/);
        this.errorMdp = false;
        this.signup.prenom = document.querySelector("#prenom").value;
        this.signup.password = document.querySelector("#password").value;
        this.signup.email = document.querySelector("#email").value;
        
               
        if ((this.signup.prenom !== null || 
              this.signup.email !== null || 
              this.signup.password !== null) && 
          (regexName.test(this.signup.prenom) && 
            regexEmail.test(this.signup.email) && 
            regexPassword.test(this.signup.password))) {
          axios.post("http://localhost:3000/api/user/signup", { prenom: this.signup.prenom, email: this.signup.email, password: this.signup.password
          })
            .then(res => {
              console.log(res);
              axios.post("http://localhost:3000/api/user/login", { email: this.signup.email, password: this.signup.password,
              })
              .then(function (res) {
                const token = res.data.token;
                const id = res.data.userId;
                const userId = CryptoJS.AES.encrypt(id.toString(),store.state.CryptoKey).toString();
                document.cookie = `user-token=${token}; SameSite=Lax; Secure; max-age=60*60;`;
                document.cookie = `userId=${userId}; SameSite=Lax; Secure; max-age=60*60;`;
                router.push("/home");
                router.go();
              })
              .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
        } else if (regexName.test(this.signup.prenom) === false) {
          alert("Erreur prenom");
        } else if (regexEmail.test(this.signup.email) === false) {
          alert("Erreur Email");
        } else if (regexPassword.test(this.signup.password) === false) {
          const errPassSign = document.querySelector("#errPassSign");
          errPassSign.innerText = "Le mot de passe doit contenir 8 caractères au moins 1 chiffre et 1 caractère spécial"
        }
      },
       //Se connecter
      sendLogin() {
        const regexEmail = new RegExp(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        const regexPassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#?$%^&*.]).{8,}$/);

        this.login.email = document.querySelector("#LogEmail").value;
        this.login.password = document.querySelector("#logPassword").value;

        if((this.login.email !== null || 
            this.signup.password !== null) && 
            (regexEmail.test(this.login.email) && 
            regexPassword.test(this.login.password))) {
          axios.post('http://localhost:3000/api/user/login', { email: this.login.email, password: this.login.password
        }) 
        .then(function (res) { 
          const token = res.data.token;
          const id = res.data.userId;
          const userId = CryptoJS.AES.encrypt(id.toString(),store.state.CryptoKey).toString();
          document.cookie = `user-token=${token}; SameSite=Lax; Secure; max-age=60*60;`;
          document.cookie = `userId=${userId}; SameSite=Lax; Secure; max-age=60*60;`;
          router.push("/home");
          router.go();
        })
        .catch(error => console.log(error));
        } else if (this.login.email === null || regexEmail.test(this.login.email) === false) {
            const errMail = document.querySelector("#errMail");
            errMail.innerText = "Veuillez renseigner un mail correct 😊";

        } else if (this.login.password !== null || regexPassword.test(this.login.password) === false ) {
          const errPass = document.querySelector("#errPass");
          errPass.innerText ="Veuillez renseigner votre mot de passe";
        }
      },
    },
    mounted() { 
      if (document.cookie) {
        const userIdCookie = document.cookie.split("; ").find((row) => row.startsWith("userId=")).split("=")[1];
        if (userIdCookie) {  // Si il y a un userId bascule sur le home
          router.push("/home");
        } 
      }
    },
  }
</script>

<style scoped lang="scss">

// Message erreur Form
#errPass,#errMail {
  margin-top: 15px;
  color: red;
  font-weight: bold;
  text-align: center;
}

#errPassSign {
  margin-top: 15px;
  color: red;
  font-size: 0.8em;
  font-weight: bold;
  text-align: center;
}

// Init page
*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  background: #b6b6b6;
}

// Mixin

@mixin signUpActive {
  .cont.s--signup & {
    @content;
  }
}

// Variable

$contW: 900px;
$imgW: 260px;
$formW: $contW - $imgW;
$switchAT: 1.2s;

$inputW: 260px;
$btnH: 60px;

$diffRatio: ($contW - $imgW) / $contW;

// Container formulaire
.container {
  margin: auto;
}
.cont {
  overflow: hidden;
  position: relative;
  width: $contW;
  height: 550px;
  margin: 0 auto 100px;
  background: #fff;
}

.form {
  position: relative;
  width: $formW;
  height: 100%;
  transition: transform $switchAT ease-in-out;
  padding: 50px 30px 0;
}

.sub-cont {
  overflow: hidden;
  position: absolute;
  left: $formW;
  top: 0;
  width: $contW;
  height: 100%;
  padding-left: $imgW;
  background: #fff;
  transition: transform $switchAT ease-in-out;

  @include signUpActive {
    transform: translate3d($formW * -1,0,0);
  }
}

// Boutton 
.newAccount {
  text-align: center;
}

input, button {
  border: none;
  outline: none;
  background: none;
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
}

button {
  display: block;
  margin: 0 auto;
  width: $inputW;
  height: $btnH;
  border-radius: 30px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

// Image de font
.img {
  overflow: hidden;
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: $imgW;
  height: 100%;
  padding-top: 360px;

  &:before {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: $contW;
    height: 100%;
    background-image: url('../assets/groupoLog.png');
    background-size: cover;
    transition: transform $switchAT ease-in-out;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
  }

  @include signUpActive {
    &:before {
      transform: translate3d($formW,0,0);
    }
  }

// Texte Formulaire

  &__text {
    z-index: 2;
    position: absolute;
    left: 0;
    top: 50px;
    width: 100%;
    padding: 0 20px;
    text-align: center;
    color: #fff;
    transition: transform $switchAT ease-in-out;

    h2 {
      margin-bottom: 10px;
      font-weight: bold;
    }

    p {
      font-size: 14px;
      line-height: 1.5;
    }

    &.m--up {
      
      @include signUpActive {
        transform: translateX($imgW*2);
      }
    }

    &.m--in {
      transform: translateX($imgW * -2);

      @include signUpActive {
        transform: translateX(0);
      }
    }
  }

  &__btn {
    overflow: hidden;
    z-index: 2;
    position: relative;
    width: 150px;
    height: $btnH;
    margin: 0 auto;
    background: #2E2E2E;
    border-radius: 50px;
    color: #ffffff;
    text-transform: uppercase;
    font-size: 17px;
    font-weight: bold;
    cursor: pointer;
    
    &:after {
      content: '';
      z-index: 2;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border: 2px solid #fff;
      border-radius: 30px;
    }

    span {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      transition: transform $switchAT;
      
      &.m--in {
        transform: translateY($btnH*-2);
        
        @include signUpActive {
          transform: translateY(0);
        }
      }
      
      &.m--up {
        @include signUpActive {
          transform: translateY($btnH*2);
        }
      }
    }
  }
}

h2 {
  width: 100%;
  font-size: 26px;
  text-align: center;
}

label {
  display: block;
  width: $inputW;
  margin: 25px auto 0;
  text-align: center;

  span {
    font-size: 12px;
    color: #000000;
    text-transform: uppercase;
  }
}

input {
  display: block;
  width: 100%;
  margin-top: 5px;
  padding-bottom: 5px;
  font-size: 16px;
  border-bottom: 1px solid rgba(0,0,0,0.4);
  text-align: center;
}

.submit {
  margin-top: 40px;
  margin-bottom: 20px;
  background: #052ba7;
  text-transform: uppercase;
}

.fb-btn {
  border: 2px solid #d3dae9;
  color: darken(#d3dae9, 20%);

  span {
    font-weight: bold;
    color: darken(#768cb6, 20%);
  }
}

// Formulaire connection
.sign-in {
  transition-timing-function: ease-out;

  @include signUpActive {
    transition-timing-function: ease-in-out;
    transition-duration: $switchAT;
    transform: translate3d($formW,0,0);
  }
}

// Formulaire création de compte
.sign-up {
  transform: translate3d($contW * -1,0,0);

  @include signUpActive {
    transform: translate3d(0,0,0);
  }
}

.icon-link {
  position: absolute;
  left: 5px;
  bottom: 5px;
  width: 32px;

  img {
    width: 100%;
    vertical-align: top;
  }

  &--twitter {
    left: auto;
    right: 5px;
  }
}

@media (max-width: 990px) {
  .cont,.form,.sub-cont  {
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 100%;
    position: relative;
  }

  .sign-in, .sign-up {
    margin: auto;
  }

  .form {
    margin: auto;
  }
  
  .sub-cont{
    overflow: visible;
    transition: none;
    padding-right: 0;
    @include signUpActive {
      transform: none;
    }
  }
  .img {
    display: none;
  }

}

@media (max-width: 500px) {

  .container {
    padding: 0;
  }
  .cont,.form,.sub-cont  {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: relative;
  }
 
  .sub-cont{
    overflow: visible;
    transition: none;
    @include signUpActive {
      transform: none;
    }
  }

  .sign-up {
    width: 370px;
  }
  
  .img {
    display: none;
  }

}
</style>