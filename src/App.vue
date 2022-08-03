<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Player from './components/Player.vue'
</script>

<template>
  <div class="wrapper">
    <Player />
    <a
      href="https://github.com/muhammederdem/mini-player"
      target="_blank"
      class="github-btn"
    >
      See on GitHub
    </a>
  </div>
</template>

<style lang="scss" scoped>

.github-btn {
  position: absolute;
  right: 40px;
  bottom: 50px;
  text-decoration: none;
  padding: 15px 25px;
  border-radius: 4px;
  box-shadow: 0px 4px 30px -6px rgba(36, 52, 70, 0.65);
  background: #24292e;
  color: #fff;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 16px;
  transition: all .3s ease-in-out;

  @media screen and (min-width: 500px) {
    &:hover {
      transform: scale(1.1);
      box-shadow: 0px 17px 20px -6px rgba(36, 52, 70, 0.36);
    }
  }

  @media screen and (max-width: 700px) {
    position: relative;
    bottom: auto;
    right: auto;
    margin-top: 20px;

    &:active {
      transform: scale(1.1);
      box-shadow: 0px 17px 20px -6px rgba(36, 52, 70, 0.36);
    }
  }
}
</style>
