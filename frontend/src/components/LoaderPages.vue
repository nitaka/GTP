<template>
    <div class="loader">
        <div class="mot">
            <div class="lettre">L</div>
            <div class="lettre">O</div>
            <div class="lettre">A</div>
            <div class="lettre">D</div>
            <div class="lettre">I</div>
            <div class="lettre">N</div>
            <div class="lettre">G</div>
            <div class="lettre logo"><img src="../assets/logotin.png" alt="logo"></div>
            <div class="lettre"> </div>
            <div class="lettre"> </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoaderPages',
    data () {
        return {
        
        }
    },
}
</script>

<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&family=Shrikhand&display=swap');

@import "../styles/keyframes.scss";

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  background-color: rgba( grey,0.9);
  position: fixed;
  animation: loader 2.4s both; 
}

.mot {
  display: flex;
}

div.mot > *  {
  font-family: 'Shrikhand', cursive;
  font-size: 70px;
  font-weight: bold;
  text-shadow: 4px 1px 2px rgb(255, 247, 253);
  opacity: 0.8;
}

.lettre {
  animation: 1s anim alternate 6;
  
    &:nth-child(1) {
        animation-delay: 100ms;
    }
    &:nth-child(2) {
        animation-delay: 300ms;
    }
    &:nth-child(3) {
        animation-delay: 500ms;
    }
    &:nth-child(4) {
        animation-delay: 700ms;
    }
    &:nth-child(5) {
        animation-delay: 900ms;
    }
    &:nth-child(6) {
        animation-delay: 1100ms;
    }
    &:nth-child(7) {
        animation-delay: 1300ms;
    }
    &:nth-child(8) {
        animation-delay: 1500ms;
    }
    &:nth-child(9) {
        animation-delay: 1700ms;
    }
    &:nth-child(10) {
        animation-delay: 1900ms;
    }
}

.logo {
    position: relative;
    left: 30px;
    top: 25px
}

@media(max-width:450px) {
  div.mot > *  {
    font-size: 50px;
  }
}
</style>