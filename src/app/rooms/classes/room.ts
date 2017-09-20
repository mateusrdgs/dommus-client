export default class Room {

  private _id: string;
  private description: string;
  private components: Array<any>;

  constructor(description: string, _id?: string, components?: Array<any>) {
    this.Id = _id;
    this.Description = description;
    this.Components = components;
  }

  get Id(): string {
    return this._id;
  }

  set Id(value: string) {
    this._id = value;
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
