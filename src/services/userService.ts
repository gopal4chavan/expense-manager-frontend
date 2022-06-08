import axios from './base';
export default class UserService {
  static async login(loginId: string, password: string) {
    const response = await axios.post('/login', {
      loginId,
      password
    });
    if(response.data.token) {
      localStorage.setItem('access-token', response.data.token);
      return true;
    }
  }
}