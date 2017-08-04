export class Residence {

  private _id: string;
  private description: string;
  private url: string;
  private rooms: Array<any>;
  private boards: Array<any>;

  constructor(_id: string, description: string, url: string, rooms: Array<any> = [], boards: Array<any> = []) {
    this.Id = _id;
    this.Description = description;
    this.Url = url;
    this.Rooms = rooms;
    this.Boards = boards;
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

  get Url(): string {
    return this.url;
  }

  set Url(value: string) {
    this.url = value;
  }

  get Rooms(): Array<any> {
    return this.rooms;
  }

  set Rooms(value: Array<any>) {
    this.rooms = value;
  }

  get Boards(): Array<any> {
    return this.boards;
  }

  set Boards(value: Array<any>) {
    this.boards = value;
  }

}
