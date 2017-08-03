export class Account {

  name: string;
  email: string;
  password: string;
  pin: number;

  constructor(name: string, email: string, password: string, pin: number) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.pin = pin;
  }
};
