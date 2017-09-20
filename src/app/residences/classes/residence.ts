import { Room } from './../../rooms/room';

export default class Residence {

  private _id: string;
  private description: string;
  private url: string;
  private rooms: Array<Room>;
  private boards: Array<any>;

  constructor(description: string, url: string, _id?: string, rooms?: Array<Room>, boards?: Array<any>) {
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

  get Rooms(): Array<Room> {
    return this.rooms;
  }

  set Rooms(value: Array<Room>) {
    this.rooms = value;
  }

  get Boards(): Array<any> {
    return this.boards;
  }

  set Boards(value: Array<any>) {
    this.boards = value;
  }

}
