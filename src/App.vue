<script>

import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: { Navbar },
    methods: {
      showNabvar() {
        return this.$route.path == '/iniciar-sesion' || this.$route.path == '/registro' ? false : true;
      },
    },
}

</script>

<template>

  <Navbar v-if="showNabvar()" />

  <div class="md:mx-36 pt-20">
    <router-view></router-view>
  </div>

</template>