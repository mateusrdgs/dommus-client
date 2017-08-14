export class User {

  private id: string;
  private name: string;
  private type: boolean;
  private pin: number

  constructor(name: string, type: boolean, id?: string, pin?: number) {
    this.Id = id;
    this.Name = name;
    this.Type = type;
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

  get Type(): boolean {
    return this.type;
  }

  set Type(value: boolean) {
    this.type = value;
  }

  get Pin(): number {
    return this.pin;
  }

  set Pin(value: number) {
    this.pin = value;
  }

}
