import { Account } from './../login/new-account/account';

export class MockValidAccount extends Account {

  constructor(name: string= 'Random string', email: string= 'random@string.com',
    password: string= 'Random string', pin: number= 420) {
    super(name, email, password, pin);
  }
}
