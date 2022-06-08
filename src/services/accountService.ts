import axios from './base';

export default class AccountService {
  static async create(name: string, balance: number, deposit: number) {
    return await axios.post('/account/create', {
      name,
      balance,
      deposit
    }, this.getHeader());
  }
  static async getAll() {
    return await axios.get('/account/all', this.getHeader());
  }
  static async addIncome(details: {id: number, amount: number, title: string, description: string, date: string}) {
    const {id, ...data} = details;
    return await axios.post(`/account/add_income/${id}`, data, this.getHeader())
  }
  static async addDeposit(data: {id: number, amount: number}) {
    const {id, amount} = data;
    return await axios.post(`/account/add_deposit/${id}`, {amount}, this.getHeader())
  }
  private static getHeader(){
    return {
      'headers': {
        'x-access-token': localStorage.getItem('access-token')
      }
    }
  }
}