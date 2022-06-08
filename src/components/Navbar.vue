<template>
  <div>
    <v-navigation-drawer app v-model="drawer">
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item v-for="item in sidebarOptions" :key="item.name" @click="navigateToPath(item.name)">{{item.name}}</v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar elevation="0">
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title><LogoText /></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="logoutUser" elevation="0">
        <v-icon>mdi-export</v-icon>
        <span>Logout</span>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';

import LogoText from './shared/LogoText.vue';

@Component({
  components: {
    LogoText
  }
})
export default class Navbar extends Vue {
  drawer = true;
  sidebarOptions = [
    {
      name: 'Dashboard',
      icon: ''
    },
    {
      name: 'Expenses',
      icon: ''
    },
    {
      name: 'GroupInfo',
      icon: ''
    },
    {
      name: 'Accounts',
      icon: ''
    },
  ];

  navigateToPath(name: string) {
    this.$router.push({name});
  }

  logoutUser() {
    localStorage.removeItem('access-token');
    this.$router.push({name: 'Login'})
  }
}
</script>