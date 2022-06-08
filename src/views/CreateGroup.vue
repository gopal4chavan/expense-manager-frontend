<template>
  <v-card :loading='loading' elevation="0" outlined max-width="450" class="mx-auto mt-16">
    <template slot="progress">
      <v-progress-linear indeterminate></v-progress-linear>
    </template>
      <LogoText />
    <div class="d-flex justify-center align-center">
      <span>Sign up</span>
    </div>
    <div class="mx-10 my-5">
      <v-text-field 
        label="Group Name" 
        append-icon="mdi-account-group" 
        v-model="createGroupFormDate.groupName" 
        v-bind="validations.groupName"
      />
      <v-text-field 
        label="User ID" 
        append-icon="mdi-card-account-details" 
        v-model="createGroupFormDate.loginId" 
        v-bind="validations.loginId"
      />
      <v-text-field 
        label="Name" 
        append-icon="mdi-account" 
        v-model="createGroupFormDate.name" 
        v-bind="validations.name"
      />
      <v-text-field 
        label="Mail ID" 
        append-icon="mdi-email" 
        v-model="createGroupFormDate.mailId" 
        v-bind="validations.mailId"
      />
      <v-text-field
        label="Password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        v-model="createGroupFormDate.password"
        v-bind="validations.password"
        @click:append="showPassword=!showPassword"
      />
      <v-text-field 
        label="Confirm Password"
        type="password"
        v-model="createGroupFormDate.confirmPassword" 
        v-bind="validations.confirmPassword"
      />
    </div>
    <div class="mx-10 my-10 d-flex justify-space-between">
      <v-btn @click="redirectToLogin">Login</v-btn>
      <v-btn @click="createUserGroup" :disabled="!isFormValid">Create Group</v-btn>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Watch} from 'vue-property-decorator';
import {Getter, Action} from 'vuex-class';

import LogoText from '@/components/shared/LogoText.vue';
import {ValidatorProps, CreateGroupForm} from './models';

type formProperties =  'groupName' | 'loginId' | 'name' | 'mailId' | 'password' | 'confirmPassword';
type Validator = {[key in formProperties]: ValidatorProps};

@Component({
  components: {
    LogoText
  }
})
export default class CreateGroup extends Vue {
  @Getter loading!: boolean;
  @Getter createGroupErrorObj!: any;

  @Action createGroup!: (data: CreateGroupForm) => void;
  @Action redirectToLogin!: () => void;

  showPassword = false;
  createGroupFormDate: CreateGroupForm = {
    groupName: '',
    loginId: '',
    name: '',
    mailId: '',
    password: '',
    confirmPassword: ''
  }
  validations: Validator = {
    groupName: {
      rules: [(v: string) => this.updateValidation(!!v, 'groupName', 'Group Name is required')],
      isValid: false,
      'error-messages': '',
      error: false,
    },
    loginId: {
      rules: [(v: string) => this.updateValidation(!!v, 'loginId', 'User Id is required')],
      isValid: false,
      'error-messages': '',
      error: false,
    },
    name: {
      rules: [(v: string) => this.updateValidation(!!v, 'name', 'name is required')],
      isValid: false,
      'error-messages': '',
      error: false,
    },
    mailId: {
      rules: [(v: string) => this.updateValidation(!!v, 'mailId', 'Mail Id is required')],
      isValid: false,
      'error-messages': '',
      error: false,
    },
    password: {
      rules: [(v: string) => this.updateValidation(!!v, 'password', 'Password is required')],
      isValid: false,
      'error-messages': '',
      error: false,
    },
    confirmPassword: {
      rules: [(v: string) => this.updateValidation(!!v && v===this.createGroupFormDate.password, 'confirmPassword',  'Password mismatch')],
      isValid: false,
      'error-messages': '',
      error: false,
    }
  }

  @Watch('createGroupErrorObj')
  updateValidationMessage(value: any) {
    (value as Array<{field: string, message: string}>).forEach(item => {
      const field = this.validations[item.field as formProperties];
      field.error = true;
      field['error-messages'] = item.message;
    });
  }

  updateValidation(valid: boolean, property: formProperties, message: string) {
    this.validations[property].isValid = valid;
    this.validations[property]['error-messages'] = '';
    this.validations[property].error = false;
    return valid || message;
  }

  get isFormValid() {
    return this.validations.groupName.isValid &&
      this.validations.loginId.isValid &&
      this.validations.name.isValid &&
      this.validations.mailId.isValid &&
      this.validations.password.isValid &&
      this.validations.confirmPassword.isValid &&
      !this.validations.groupName.error &&
      !this.validations.loginId.error &&
      !this.validations.name.error &&
      !this.validations.mailId.error &&
      !this.validations.password.error &&
      !this.validations.confirmPassword.error;
  }

  createUserGroup() {
    this.createGroup(this.createGroupFormDate);
  }
}
</script>
<style>
</style>