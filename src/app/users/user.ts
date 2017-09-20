export class User {

  private id: string;
  private name: string;
  private isAdmin: boolean;
  private pin: number;

  constructor(name: string, isAdmin: boolean, id?: string, pin?: number) {
    this.Id = id;
    this.Name = name;
    this.IsAdmin = isAdmin;
    this.Pin = pin;
  }

  get Id(): string {
    return this.id;
  }

  set Id(value: string) {
    this.id = value;
  }

  get Name(): string {
    return this.name;
  }

  set Name(value: string) {
    this.name = value;
  }

  get IsAdmin(): boolean {
    return this.isAdmin;
  }

  set IsAdmin(value: boolean) {
    this.isAdmin = value;
  }

  get Pin(): number {
    return this.pin;
  }

  set Pin(value: number) {
    this.pin = value;
  }

}
