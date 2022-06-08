<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Navbar from '@/components/Navbar.vue';

  @Component({
    components: {
      Navbar
    }
  })
  export default class Home extends Vue {}
</script>
