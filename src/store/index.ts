import Vue from 'vue';
import Vuex from 'vuex';
import {actions} from './actions';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accountsList: [],
    accountsSelectedTab: 0,
    loading: false,
    isUserLoggedIn: false,
    loginErrorObj: {},
    createGroupErrorObj: {},
    resetAddAccountForm: false,
    addIncomeDialog: false,
    addDepositDialog: false,
    selectedAccountId: ''
  },
  mutations: {
    updateLoading(state, payload: boolean) {
      state.loading = payload;
    },
    login(state, payload: boolean) {
      state.isUserLoggedIn = payload;
    },
    updateLoginErrorObj(state, payload) {
      state.loginErrorObj = payload;
    },
    updateAccountsList(state, payload) {
      state.accountsList = payload;
    },
    createGroupErrorObj(state, payload) {
      state.createGroupErrorObj = payload;
    },
    updateSelectedTab(state, payload) {
      state.accountsSelectedTab = payload;
    },
    updateResetAddAccountForm(state, payload) {
      state.resetAddAccountForm = payload;
    },
    updateAddIncomeDialog(state, payload: boolean) {
      state.addIncomeDialog = payload;
    },
    updateAddDepositDialog(state, payload: boolean) {
      state.addDepositDialog = payload;
    },
    updateSelectedAccountId(state, payload: string) {
      state.selectedAccountId = payload;
    }
  },
  actions, 
  getters: {
    accountsList: state => state.accountsList,
    accountsSelectedTab: state => state.accountsSelectedTab,
    loading: state => state.loading,
    isUserLoggedIn: state => state.isUserLoggedIn,
    loginErrorObj: state => state.loginErrorObj,
    createGroupErrorObj: state => state.createGroupErrorObj,
    resetAddAccountForm: state => state.resetAddAccountForm,
    addIncomeDialog: state => state.addIncomeDialog,
    addDepositDialog: state => state.addDepositDialog,
    selectedAccountId: state => state.selectedAccountId,
  },
  modules: {
  }
})
