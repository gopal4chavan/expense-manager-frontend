<template>
  <div class="pl-5 pt-5">
    <div>Accounts</div>
    <v-tabs :value="accountsSelectedTab" @change="updateSelectedTab">
      <v-tab v-for="option in tabOptions" :key="option">{{option}}</v-tab>
    </v-tabs>
    <v-tabs-items :value="accountsSelectedTab" @change="updateSelectedTab">
      <v-tab-item key="Accounts List">
        <AccountsList />
      </v-tab-item>
      <v-tab-item>
        <AddAccount />
      </v-tab-item>
    </v-tabs-items>
    
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {Getter, Action} from 'vuex-class';
import AddAccount from './AddAccount.vue';
import AccountsList from './AccountsList.vue';

@Component({
  components: {
    AddAccount,
    AccountsList
  }
})
export default class Accounts extends Vue{
  @Getter accountsSelectedTab!: number;
  @Action updateSelectedTab!: (value: number) => void;
  tabOptions: string[] = ['Accounts List', 'Add Account'];
}
</script>