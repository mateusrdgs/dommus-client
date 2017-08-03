import { Account } from './../login/new-account/account';

export class MockInvalidAccount extends Account {

  constructor(name: string = '', email: string= '', password: string= '', pin: number= 0)  {
    super(name, email, password, pin);
  }

}
