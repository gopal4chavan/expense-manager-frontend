import axios from './base';
import {CreateGroupForm} from '@/views/models';

export default class GroupService {
  static async createGroup(data: CreateGroupForm) {
    const response = await axios.post('/group/create', {
      ...data
    });
    if(response.data.token) {
      localStorage.setItem('access-token', response.data.token);
      return true;
    }
  }
}