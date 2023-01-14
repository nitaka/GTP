<template>
  <div class="home">
    <h1>Fiche d'activité</h1>
    <form v-on:submit.prevent>
      <label for="name">Nom: </label>
      <select v-model="hidData" @change="oneTask()" name="name" id="name" required>
          <option v-for="users in allUsers" :key="users.id">{{ users.name }}</option>
      </select>
      <label for="libelle">
        Libellé activité: 
      </label>
      <input type="text" placeholder="Libellé" id="libelle" name="libelle" required />
      <label for="hoursBegin">
        Heures début: 
      </label>
      <input type="time" id="hoursBegin" name="hoursBegin" pattern="[0-24]{2}.[0-00]{2}" required />
      
      <label for="hoursEnd">
        Heures fin: 
      </label>
      <input type="time" id="hoursEnd" name="hoursEnd" @change="timeLimit()" />
      <button @click="addPost()" class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Valider</button>
    </form>

    <table id="task">
      <thead>
        <tr>
          <th>Nom <i class="fa-solid fa-caret-up" @click="getByName()"></i><i class="fa-solid fa-caret-up verso" @click="getByNameVerso()"></i></th>
          <th>Libellé <i class="fa-solid fa-caret-up" @click="getByLibelle()"></i><i class="fa-solid fa-caret-up verso" @click="getByLibelleVerso()"></i></th>
          <th>Heurs de début <i class="fa-solid fa-caret-up" @click="getPost()"></i><i class="fa-solid fa-caret-up verso" @click="getPostVerso()"></i></th>
          <th>Heurs de Fin <i class="fa-solid fa-caret-up" @click="getByHoursEnd()"></i><i class="fa-solid fa-caret-up verso" @click="getByHoursEndVerso()"></i></th>
          <th>Suppression</th>
        </tr>
      </thead>
      <tbody >
        <tr v-for="post in posts" :key="post.idLibelle">
          <td >{{ post.name }}</td>
          <td>{{ post.libelle }}</td>
          <td>{{ post.hoursBegin }}</td>
          <td>{{ post.hoursEnd }}</td>
          <td><i class="fa-solid fa-trash" @click="deletePost(post.idLibelle)"></i></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import router from '@/router/index.js';
import axios from "axios";
const CryptoJS = require("crypto-js");
import store from '@/store/index.js';

export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      user: null,
      allUsers: null,
      posts: null,
      postsRecive: null,
      hidData: null,
      task: null,
      token: document.cookie
        ? document.cookie.split("; ").find((row) => row.startsWith("user-token=")).split("=")[1]
        : null,
      userId: document.cookie
        ? CryptoJS.AES.decrypt(
            document.cookie.split("; ").find((row) => row.startsWith("userId=")).split("=")[1],store.state.CryptoKey
        ).toString(CryptoJS.enc.Utf8)
        : null,
    };
  },
  methods: {
    addPost() {
      const self = this;
      self.token = document.cookie.split("; ").find((row) => row.startsWith("user-token=")).split("=")[1];
      self.name = document.querySelector("#name").value;
      self.libelle = document.querySelector("#libelle").value;
      self.hoursBegin = document.querySelector("#hoursBegin").value;
      self.hoursEnd = document.querySelector("#hoursEnd").value;

      const fd = new FormData();
      if (self.name != "") {
        fd.append("name", self.name);
      }
      if (self.libelle != "") {
        fd.append("libelle", self.libelle);
      }
      if (self.hoursBegin != "") {
        fd.append("hoursBegin", self.hoursBegin);
      }
      if (self.hoursEnd != "") {
        fd.append("hoursEnd", self.hoursEnd);
      }
      
      if (self.name && self.libelle && self.hoursBegin && self.hoursEnd ) {
        axios.post("http://localhost:3000/api/post", fd, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${self.token}`,
          },
        })
        .then(function (res) {
          console.log(res);
          document.querySelector("#name").value = null;
          document.querySelector("#libelle").value = null;
          document.querySelector("#hoursBegin").value = null;
          document.querySelector("#hoursEnd").value = null;
          self.getPost();
        })
        .catch(error => console.log(error));
      }
    },

    getPost() {
      if (document.cookie) {
        this.token = document.cookie.split("; ").find((row) => row.startsWith("user-token=")).split("=")[1];
      }
      axios.get("http://localhost:3000/api/post", {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .then((res) => {
        this.postsRecive = res.data;
        if (this.posts != this.postsRecive) {
          this.posts = this.postsRecive;
        }
      })
      .catch(function (error) {
        if (error.res && error.res.status === 401) {
          router.push("/");
        }
      });

      axios.get("http://localhost:3000/api/user", {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then((res) => (this.allUsers = res.data))
        .catch(function (error) {
          if (error.res && error.res.status === 401) {
            router.push("/");
          }
        });
    },

    getPostVerso() {
      if (document.cookie) {
        this.token = document.cookie.split("; ").find((row) => row.startsWith("user-token=")).split("=")[1];
      }
      axios.get("http://localhost:3000/api/post/verso", {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .then((res) => {
        this.postsRecive = res.data;
        if (this.posts != this.postsRecive) {
          this.posts = this.postsRecive;
        }
      })
      .catch(function (error) {
        if (error.res && error.res.status === 401) {
          router.push("/");
        }
      });
    },

    getByHoursEnd() {
      if (document.cookie) {
        this.token = document.cookie.split("; ").find((row) => row.startsWith("user-token=")).split("=")[1];
      }
      axios.get("http://localhost:3000/api/post/hoursEnd", {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .then((res) => {
        this.postsRecive = res.data;
        if (this.posts != this.postsRecive) {
          this.posts = this.postsRecive;
        }
      })
      .catch(function (error) {
        if (error.res && error.res.status === 401) {
          router.push("/");
        }
      });
    },

    getByHoursEndVerso() {
      if (document.cookie) {
        this.token = document.cookie.split("; ").find((row) => row.startsWith("user-token=")).split("=")[1];
      }
      axios.get("http://localhost:3000/api/post/hoursEndVerso", {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .then((res) => {
        this.postsRecive = res.data;
        if (this.posts != this.postsRecive) {
          this.posts = this.postsRecive;
        }
      })
      .catch(function (error) {
        if (error.res && error.res.status === 401) {
          router.push("/");
        }
      });
    },

    getByName() {
      if (document.cookie) {
        this.token = document.cookie.split("; ").find((row) => row.startsWith("user-token=")).split("=")[1];
      }
      axios.get("http://localhost:3000/api/post/byName", {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .then((res) => {
        this.postsRecive = res.data;
        if (this.posts != this.postsRecive) {
          this.posts = this.postsRecive;
        }
      })
      .catch(function (error) {
        if (error.res && error.res.status === 401) {
          router.push("/");
        }
      });
    },

    getByNameVerso() {
      if (document.cookie) {
        this.token = document.cookie.split("; ").find((row) => row.startsWith("user-token=")).split("=")[1];
      }
      axios.get("http://localhost:3000/api/post/byNameVerso", {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .then((res) => {
        this.postsRecive = res.data;
        if (this.posts != this.postsRecive) {
          this.posts = this.postsRecive;
        }
      })
      .catch(function (error) {
        if (error.res && error.res.status === 401) {
          router.push("/");
        }
      });
    },

    getByLibelle() {
      if (document.cookie) {
        this.token = document.cookie.split("; ").find((row) => row.startsWith("user-token=")).split("=")[1];
      }
      axios.get("http://localhost:3000/api/post/libelle", {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .then((res) => {
        this.postsRecive = res.data;
        if (this.posts != this.postsRecive) {
          this.posts = this.postsRecive;
        }
      })
      .catch(function (error) {
        if (error.res && error.res.status === 401) {
          router.push("/");
        }
      });
    },

    getByLibelleVerso() {
      if (document.cookie) {
        this.token = document.cookie.split("; ").find((row) => row.startsWith("user-token=")).split("=")[1];
      }
      axios.get("http://localhost:3000/api/post/libelleVerso", {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .then((res) => {
        this.postsRecive = res.data;
        if (this.posts != this.postsRecive) {
          this.posts = this.postsRecive;
        }
      })
      .catch(function (error) {
        if (error.res && error.res.status === 401) {
          router.push("/");
        }
      });
    },

    deletePost(postId) {
      if (this.userId) {
        axios.delete(`http://localhost:3000/api/post/${postId}`, {
          headers: { Authorization: `Bearer ${this.token}` },
          data: { userId: this.userId },
        })
        .then((res) => {
          console.log(res);
          this.getPost();
        })
        .catch(error => console.log(error));
      }
    },

    oneTask() {
      this.hidData = document.querySelector("#name").value;
      this.task = document.getElementById("task");

      const indexTab = 0;
      const lignes = this.task.getElementsByTagName("tr");

      for (let i = 0 ; i < lignes.length; i++){

        const colonnes = lignes[i].getElementsByTagName("td");
        if(colonnes.length > 0) {  //pour éviter erreur avec "th"
          if(colonnes[indexTab].innerHTML === this.hidData ) {
            this.hidData = null;
            alert("Une tâche à la fois !")
          }
        }
      }
    },

    timeLimit() {
      
      this.hoursBegin = document.querySelector("#hoursBegin").value;
      this.hoursEnd = document.querySelector("#hoursEnd").value;

      const hoursBeg = parseFloat(this.hoursBegin);
      const hoursEn = parseFloat(this.hoursEnd);

      const blindSpot = [16,17,18,19,20,21,22,23];
      
      for(const index of blindSpot ) {
        if((hoursBeg == index && hoursEn == hoursBeg - 15) ||
          (hoursBeg == index && hoursEn == hoursBeg - 14) ||
          (hoursBeg == index && hoursEn == hoursBeg - 13) ||
          (hoursBeg == index && hoursEn == hoursBeg - 12) ||
          (hoursBeg == index && hoursEn == hoursBeg - 11) ||
          (hoursBeg == index && hoursEn == hoursBeg - 10) ||
          (hoursBeg == index && hoursEn == hoursBeg - 9) ||
          (hoursBeg == index && hoursEn == hoursBeg - 8) ||
          (hoursBeg == index && hoursEn == hoursBeg - 7) ||
          (hoursBeg == index && hoursEn == hoursBeg - 6) ||
          (hoursBeg == index && hoursEn == hoursBeg - 5) ||
          (hoursBeg == index && hoursEn == hoursBeg - 4) ||
          (hoursBeg == index && hoursEn == hoursBeg - 3) ||
          (hoursBeg == index && hoursEn == hoursBeg - 2) || 
          (hoursBeg == index && hoursEn == hoursBeg - 1)){ 

          document.querySelector("#hoursEnd").value = null;
          alert("L'heure réglementaire de 8h est dépassé")

        } else if(hoursEn >= hoursBeg + 9) {
          document.querySelector("#hoursEnd").value = null;
          alert("L'heure réglementaire de 8h est dépassé")
          break;
        }
      }
    },
  },
  mounted() {
    (this.userId = document.cookie
      ? CryptoJS.AES.decrypt(
          document.cookie.split("; ").find((row) => row.startsWith("userId=")).split("=")[1],store.state.CryptoKey
        ).toString(CryptoJS.enc.Utf8)
    : null),
    (this.token = document.cookie
        ? document.cookie.split("; ").find((row) => row.startsWith("user-token=")).split("=")[1]
    : null);

    axios.post("http://localhost:3000/api/user",{ 
      userId: this.userId
    },
    {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
    .then((res) => {
      this.user = res.data[0];
    })
    .catch(function (error) {
      if (error.res && error.res.status === 400) {
        document.cookie = "userId=";
        document.cookie = "user-token=";
        router.push("/");
      }
    });

    this.getPost();

    if (!this.userId) {
      router.push("/");
    }
  }
}
</script>

<style lang="scss">

// Titre
h1 {
  font-size: 25px;
  font-weight: bold;
  padding: 30px;
}

// Formulaire

input, select {
  border: 1px solid black;
  margin-right: 20px;
  padding: 5px;
} 

label {
  font-weight: bold;
}

// Tableau activité

.fa-caret-up {
  font-size: 1.2em;
  transition: 500ms linear ;
  position: relative;
  bottom: 3px;
  right: -5px;
  transition: 500ms linear;
  &:hover {
    cursor: pointer;
  }
}

.verso {
  transform: rotate(180deg);
  position: relative;
  top: 7px;
  right: 7px;
}

.fa-trash {
  font-size: 1.2em;

  &:hover {
    cursor: pointer;
    color: red;
  }
}

table {
  width: 80%;
  margin: 30px auto 0px auto;
}

table,td {
  padding: 5px;
    border: 1px solid #333;
    background-color: #c0a7d5;
}

th {
  padding: 10px;
  border: 1px solid #333;
}

thead {
  background: linear-gradient(0deg, rgba(105,72,207,1) 0%, rgba(182,77,195,1) 50%, rgba(230,78,209,1) 100%);
    color: #fff;
}

</style>