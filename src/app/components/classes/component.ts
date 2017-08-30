export default class Component {

  private id: string;
  private idBoard: string;
  private description: string;
  private type: number;

  constructor(
    idBoard: string,
    description: string,
    type: number,
    id?: string
  ) {
    this.IdBoard = idBoard;
    this.Description = description;
    this.Type = type;
    this.Id = id;
  }

  get Id(): string {
    return this.id;
  }

  set Id(value: string) {
    this.id = value;
  }

  get IdBoard(): string {
    return this.idBoard;
  }

  set IdBoard(value: string) {
    this.idBoard = value;
  }

  get Description(): string {
    return this.description;
  }

  set Description(value: string) {
    this.description = value;
  }

  get Type(): number {
    return this.type;
  }

  set Type(type: number) {
    this.type = type;
  }

}

