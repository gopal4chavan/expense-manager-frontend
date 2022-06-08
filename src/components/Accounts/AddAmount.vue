<template>
  <v-dialog 
    max-width="450"
    :value="dialog"
    persistent
  >
    <v-card>
      <v-card-title class="text-capitalize">Add {{addAmountType}}</v-card-title>
      <v-card-text>
        <v-text-field v-if="isTypeIncome"
          v-model="title"
          label="Title"
          required
        ></v-text-field>
        <v-text-field
          v-model="amount"
          type="number"
          label="Amount"
          required
        ></v-text-field>
        <template v-if="isTypeIncome">
          <v-menu
            v-model="datePickerMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="date of transaction"
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @input="datePickerMenu = false"
            ></v-date-picker>
          </v-menu>

          <v-text-field
            v-model="description"
            label="description"
            required
          ></v-text-field>
        </template>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="closeDialog">Close</v-btn>
        <v-btn text @click="updateAmount">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from 'vue';
  import {Component, Prop, Emit} from 'vue-property-decorator';
  import {Getter, Action} from 'vuex-class';
  @Component
  export default class AddIncome extends Vue{
    @Getter selectedAccountId!: string;

    @Action updateAddIncomeDialog!: (value: boolean) => void;
    @Action updateAddDepositDialog!: (value: boolean) => void;
    @Action addIncome!: (value: any) => void;
    @Action addDeposit!: (value: any) => void;

    datePickerMenu = false;
    title = '';
    date = new Date().toISOString().substr(0, 10);
    amount = 0;
    description = '';

    @Prop({default: false}) dialog!: boolean;
    @Prop() addAmountType!: string;    

    get isTypeIncome() {
      return this.addAmountType === 'income';
    }
    updateAmount() {
      if(this.isTypeIncome) {
        this.addIncome({
          id: this.selectedAccountId,
          title: this.title,
          date: this.date,
          amount: this.amount,
          description: this.description
        })
      }else{
        // TODO: invoke action
        this.addDeposit({
          id: this.selectedAccountId,
          amount: this.amount
        })
      }
    }
    closeDialog() {
      if(this.isTypeIncome) {
        this.updateAddIncomeDialog(false);
      }else {
        this.updateAddDepositDialog(false);
      }
    }
  }
</script>