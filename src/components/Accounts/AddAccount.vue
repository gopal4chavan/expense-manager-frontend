<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="name"
            label="Account name"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="balance"
            label="Current Balance"
            type="number"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="deposit"
            type="number"
            label="Current Deposits"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="d-flex justify-end">
          <v-btn @click="createAccount">
            <v-icon>mdi-plus</v-icon>
            Add Account
          </v-btn>
      </div>
    </v-container>
  </v-form>
</template>
<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Emit, Watch} from 'vue-property-decorator';
  import {Getter, Action} from 'vuex-class';

  @Component
  export default class AddAccount extends Vue{
    @Getter resetAddAccountForm!: boolean;
    @Action updateResetAddAccountForm!: (value: boolean) => void;
    @Action addAccount!: (form: {name: string, balance: number, deposit: number}) => void;

    name = '';
    balance = 0;
    deposit = 0;

    @Watch('resetAddAccountForm')
    resetForm(value: boolean) {
      if(value) {
        this.name = '';
        this.balance = 0;
        this.deposit = 0;
        this.updateResetAddAccountForm(false);
      }
    }

    createAccount() {
      this.addAccount({name: this.name, balance: this.balance, deposit: this.deposit});
    }
  }
</script>
