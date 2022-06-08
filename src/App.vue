<template>
  <v-app>
    <v-main class="grey lighten-3">
      <router-view/>
      <!-- <HelloWorld /> -->
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'
@Component({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {

}
</script>
