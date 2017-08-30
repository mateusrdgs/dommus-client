export default class Component {

  private id: string;
  private idBoard: string;
  private description: string;

  constructor(
    idBoard: string,
    description: string,
    id?: string
  ) {
    this.IdBoard = idBoard;
    this.Description = description;
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

}

