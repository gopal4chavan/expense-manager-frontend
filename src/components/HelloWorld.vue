<template>
  <div>
    <v-btn @click="increment">Increment</v-btn>
    <div>______objOne val: {{objOne.val}}</div>
    <div>______objTwo val: {{objTwo.val}}</div>
    <div>randomNum objOne: {{obj_one}}</div>
    <div>randomNum ObjTwo: {{obj_two}}</div>
    <!-- <button @click="updateCollapsed(true)">Collapse all</button>
    <button @click="updateCollapsed(false)">Expand all</button> -->

    <!-- <v-btn @click="itemCollapsed=true">Collapse</v-btn>
    <v-btn @click="itemCollapsed=false">Expand</v-btn>

    <div>{{itemCollapsed}}</div> -->
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component, Prop, Watch, Emit} from 'vue-property-decorator';

@Component({})
export default class HelloWorld extends Vue {
  // @Prop() collapsed!: boolean;
  // itemCollapsed: boolean = false;

  // @Watch('collapsed', {immediate: true})
  // updateItemCollapsed(newVal: boolean) {
  //   this.itemCollapsed = newVal;
  // }

  @Emit("update-collapsed")
  updateCollapsed(value: boolean){}
  objOne: any = {};
  objTwo: any;
  created() {
    this.objOne={val: 1};
    this.objTwo={val: 1};
    console.log(this.objOne);
    console.log(this.objTwo);
  }
  increment() {
    this.objOne.val += 1;
    this.objTwo.val += 1;
  }
  get obj_one() {
    if(this.objOne.val > 2) {
      return Math.random()*10;
    }
    return 0;
  }
  get obj_two() {
    if(this.objTwo.val > 2) {
      return Math.random()*10;
    }
    return 0;
  }
}
</script>