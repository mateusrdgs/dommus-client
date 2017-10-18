export default class Room {

  private id: string;
  private description: string;
  private components: any[];

  constructor(description: string, id?: string, components?: any[]) {
    this.Id = id;
    this.Description = description;
    this.Components = components;
  }

  get Id(): string {
    return this.id;
  }

  set Id(value: string) {
    this.id = value;
  }

  get Description(): string {
    return this.description;
  }

  set Description(value: string) {
    this.description = value;
  }

  get Components(): Array<any> {
    return this.components;
  }

  set Components(value: Array<any>) {
    this.components = value;
  }

}
