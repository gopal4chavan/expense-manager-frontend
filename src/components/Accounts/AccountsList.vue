<template>
  <div>
    <v-data-table
      :headers="tableHeader"
      :items="accountsList">
      <template v-slot:[`item.addIncome`]="props">
        <v-icon @click="updateAddIncomeDialog(true);updateSelectedAccountId(props.item.id)">mdi-cash-multiple</v-icon>
      </template>
      <template v-slot:[`item.addDeposit`]="props">
        <v-icon @click="updateAddDepositDialog(true);updateSelectedAccountId(props.item.id)">mdi-bank-plus</v-icon>
      </template>
    </v-data-table>
    <AddAmount :dialog="addIncomeDialog" add-amount-type="income"/>
    <AddAmount :dialog="addDepositDialog" add-amount-type="deposit"/>
  </div>
</template>
<script lang="ts">

  interface AccountItem {
    id: string;
    name: string;
    balance: number;
    deposit: number;
  }

  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import AddAmount from './AddAmount.vue';
  import { Action, Getter } from 'vuex-class';
  @Component({
    components: {
      AddAmount
    }
  })
  export default class AccountsList extends Vue{
    @Getter accountsList!: AccountItem[];
    @Getter addIncomeDialog!: boolean;
    @Getter addDepositDialog!: boolean;

    @Action fetchAccounts!: () => void;
    @Action updateAddIncomeDialog!: () => void;
    @Action updateAddDepositDialog!: () => void;
    @Action updateSelectedAccountId!: (accountId: string) => void;

    
    tableHeader = [
      {text: 'Name', value: 'name', sortable: false, align: 'center'},
      {text: 'Current Balance', value: 'balance', sortable: false, align: 'center'},
      {text: 'Deposit', value: 'deposit', sortable: false, align: 'center'},
      {text: 'Add Income', value: 'addIncome', sortable: false, align: 'center'},
      {text: 'Add Despsits', value: 'addDeposit', sortable: false, align: 'center'}
    ];

    created() {
      this.fetchAccounts();
    }
    mounted() {
      console.log('mounted');
    }
    test(item: any){
      console.log(item);
    }
  }
</script>




