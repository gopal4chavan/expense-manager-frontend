import {ActionTree, Dispatch, Commit} from 'vuex';
import UserService from '@/services/userService';
import GroupService from '@/services/groupService';
import AccountService from '@/services/accountService';
import {CreateGroupForm} from '@/views/models';
import router from '@/router';

const accountsTabs = {
  'Accounts List': 0,
  'Add Account': 1
}


export const actions: ActionTree<any, any > = {
  login({commit, dispatch, getters}, payload) {
    if(getters.isUserLoggedIn) {
      dispatch('redirectToDashboard');
    }else{
      dispatch('updateLoading', true);
      UserService.login(payload.loginId, payload.password).then(
        value => successCallback(dispatch, commit, value),
        error => failureCallback(dispatch, commit, error, 'updateLoginErrorObj')
      )
    }
  },
  createGroup({commit, dispatch}, payload: CreateGroupForm) {
    dispatch('updateLoading', true);
    GroupService.createGroup(payload).then(
      value => successCallback(dispatch, commit, value),
      error => failureCallback(dispatch, commit, error, 'createGroupErrorObj'),
    )
  },
  logout({commit}) {
    localStorage.removeItem('access-token');
    commit('login', false);
  },
  fetchAccounts({commit, dispatch}) {
    dispatch('updateLoading', true);
    AccountService.getAll().then(
      response => {
        dispatch('updateLoading', false);
        commit('updateAccountsList', response.data)
      },
      error => {
        dispatch('updateLoading', false);
        console.log(error.response);
      }
    )
  },
  addAccount({dispatch}, payload) {
    dispatch('updateLoading', true);
    AccountService.create(payload.name, payload.balance, payload.deposit).then(
      response => {
        if(response.data.success) {
          dispatch('fetchAccounts');
          dispatch('updateSelectedTab', accountsTabs['Accounts List']);
          dispatch('updateLoading', false);
          dispatch('updateResetAddAccountForm', true);
        }
      },
      error => {
        console.log(error);
      }
    )
  },
  addIncome({dispatch}, payload) {
    dispatch('updateLoading', true);
    AccountService.addIncome(payload).then(
      response => addAmountSuccess(dispatch, response.data.success, 'updateAddIncomeDialog'),
      error => {
        console.log(error);
      }
    )
  },
  addDeposit({dispatch}, payload) {
    dispatch('updateLoading', true);
    AccountService.addDeposit(payload).then(
      response => addAmountSuccess(dispatch, response.data.success, 'updateAddDepositDialog'),
      error => {
        console.log(error);
      }
    )
  },
  updateLoading({commit}, value) {
    commit('updateLoading', value);
  },
  redirectToDashboard({getters}) {
    if(getters.isUserLoggedIn && localStorage.getItem('access-token')) {
      router.push({name: 'Dashboard'});
    }
  },
  redirectToLogin() {
    router.push({name: 'Login'})
  },
  redierctToCreateGroup() {
    router.push({name: 'CreateGroup'})
  },
  updateSelectedTab({commit}, value) {
    commit('updateSelectedTab', value)
  },
  updateResetAddAccountForm({commit}, value) {
    commit('updateResetAddAccountForm', value)
  },
  updateAddIncomeDialog({commit}, value: boolean) {
    commit('updateAddIncomeDialog', value);
  },
  updateAddDepositDialog({commit}, value: boolean) {
    commit('updateAddDepositDialog', value);
  },
  updateSelectedAccountId({commit}, value: string) {
    commit('updateSelectedAccountId', value);
  }
}


const successCallback = (dispatch: Dispatch, commit: Commit, value: boolean | undefined) => {
  if(value) {
    dispatch('updateLoading', false);
    commit('login', true);
    dispatch('redirectToDashboard');
  }
}

const failureCallback = (dispatch: Dispatch, commit: Commit, error: any, commitName: string) => {
  dispatch('updateLoading', false);
  commit(commitName, error.response.data);
}

const addAmountSuccess = (dispatch: Dispatch, value: boolean, dispatchName: string) => {
  if(value) {
    dispatch('fetchAccounts');
    dispatch('updateLoading', false);
    dispatch(dispatchName, false);
  }
}