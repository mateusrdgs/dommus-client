export default class Profile {

  private _id: string;
  private _email: string;
  private _password: string;

  constructor(id: string, email: string, password?: string) {
    this.Id = id;
    this.Email = email;
    this.Password = password;
  }

  get Id(): string {
    return this._id;
  }

  set Id(id: string) {
    this._id = id;
  }

  get Email(): string {
    return this._email;
  }

  set Email(email: string) {
    this._email = email;
  }

  get Password(): string {
    return this._password;
  }

  set Password(password: string) {
    this._password = password;
  }

}
