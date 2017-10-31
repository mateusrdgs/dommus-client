export default class Task {

  private id: string;
  private target: string;
  private value: any;
  private milliseconds: number;
  private status: boolean;

  constructor(
    target: string, milliseconds: number,
    value: any, id?: string,
    status?: boolean) {
      this.Target = target;
      this.Milliseconds = milliseconds;
      this.Value = value;
      this.Id = id;
      this.Status =  status;
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

  get Value(): any {
    return this.value;
  }

  set Value(value: any) {
    this.value = value;
  }

  get Milliseconds(): number {
    return this.milliseconds;
  }

  set Milliseconds(milliseconds: number) {
    this.milliseconds = milliseconds;
  }

  get Status(): boolean {
    return this.status;
  }

  set Status(status: boolean) {
    this.status = status;
  }

}
