<template>
  <div>
    <v-btn @click="collapsed=true">Collapse all</v-btn>
    <v-btn @click="collapsed=false">Expand all</v-btn>
    <v-spacer></v-spacer>
    <div>1</div>
    <HelloWorld :collapsed="collapsed"/>
    <div>2</div>
    <HelloWorld :collapsed="collapsed"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
import HelloWorld from './HelloWorld.vue';
@Component({
  components: {
    HelloWorld
  }
})
export default class Parent extends Vue{
  collapsed: boolean = false;
}
</script>