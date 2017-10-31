export default class Task {

  private id: string;
  private target: string;
  private state: boolean;
  private position: number;
  private milliseconds: number;

  constructor(
    target: string, milliseconds: number,
    state?: boolean, position?: number,
    id?: string) {

  }

  get Id(): string {
    return this.id;
  }

  set Id(id: string) {
    this.id =  id;
  }

  get Target(): string {
    return this.target;
  }

  set Target(target: string) {
    this.target =  target;
  }

  get State(): boolean {
    return this.state;
  }

  set State(state: boolean) {
    this.state = state;
  }

  get Position(): number {
    return this.position;
  }

  set Position(position: number) {
    this.position = position;
  }

  get Milliseconds(): number {
    return this.milliseconds;
  }

  set Milliseconds(milliseconds: number) {
    this.milliseconds = milliseconds;
  }

}
