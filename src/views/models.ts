export interface CreateGroupForm {
  groupName: string;
  loginId: string;
  name: string;
  mailId: string;
  password: string;
  confirmPassword: string;
}

export interface ValidatorProps {
  rules: any[];
  isValid: boolean;
  'error-messages': string;
  error: boolean;
}