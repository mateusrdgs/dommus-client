export class User {

  private id: string;
  private name: string;
  private type: boolean;

  constructor(name: string, type: boolean, id?: string) {
    this.Id = id;
    this.Name = name;
    this.Type = type;
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

}
