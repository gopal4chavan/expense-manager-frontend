<template>
  <v-card :loading='loading' elevation="0" outlined max-width="450" class="mx-auto mt-16">
    <template slot="progress">
      <v-progress-linear indeterminate></v-progress-linear>
    </template>
      <LogoText />
    <div class="d-flex justify-center align-center">
      <span>Sign in</span>
    </div>
    <div class="mx-10 my-5">
      <v-text-field v-model="loginId" label="User ID" append-icon="mdi-account" v-bind="validations.loginId"></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        v-bind="validations.password"
        @click:append="showPassword=!showPassword"
      ></v-text-field>
      <div class="d-flex justify-end">Forgot password?</div>
    </div>
    <div class="mx-10 my-10 d-flex justify-space-between">
      <v-btn @click="redierctToCreateGroup">Create Group</v-btn>
      <v-btn @click="loginUser" :disabled="!isFormValid">Login</v-btn>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Watch} from 'vue-property-decorator';
import {Getter, Action} from 'vuex-class';

import LogoText from '../components/shared/LogoText.vue';
import {ValidatorProps} from './models';


type formProperties =  'loginId' | 'password';
type Validator = {[key in formProperties]: ValidatorProps};

@Component({
  components: {
    LogoText
  }
})
export default class Login extends Vue {
  @Getter loading!: boolean;
  @Getter loginErrorObj!: any;
  @Getter isUserLoggedIn!: boolean;
  @Action login!: (payload: {loginId: string, password: string}) => void;
  @Action redierctToCreateGroup!: () => void;

  showPassword = false;
  loginId = '';
  password = '';
  validations: Validator = {
    loginId: {
      rules: [(v: string) => this.updateValidation(!!v, 'loginId', 'user id is required')],
      isValid: false,
      'error-messages': '',
      error: false,
    },
    password: {
      rules: [(v: string) => this.updateValidation(!!v, 'password', 'password is required')],
      isValid: false,
      'error-messages': '',
      error: false,
    }
  }

  @Watch('loginErrorObj')
  updateValidationMessage(value: any) {
    const field = this.validations[value.field as formProperties];
    field.error = true;
    field['error-messages'] = value.message;
  }

  updateValidation(valid: boolean, property: formProperties, message: string) {
    this.validations[property].isValid = valid;
    this.validations[property]['error-messages'] = '';
    this.validations[property].error = false;
    return valid || message;
  }

  get isFormValid() {
    return this.validations.loginId.isValid &&
    this.validations.password.isValid &&
    !this.validations.loginId.error &&
    !this.validations.password.error;
  }

  loginUser() {
    this.login({loginId: this.loginId, password: this.password});
  }
}
</script>
<style>
</style>