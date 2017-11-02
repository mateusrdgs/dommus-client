export default class Task {

  private id: string;
  private target: string;
  private value: any;
  private date: Date;
  private milliseconds: number;
  private status: boolean;

  constructor(
    target: string, date: Date,
    milliseconds: number, value: any,
    id?: string, status?: boolean) {
      this.Target = target;
      this.Date = date;
      this.Milliseconds = milliseconds;
      this.Value = value;
      this.Id = id;
      this.Status =  status;
  }

  get Target(): string {
    return this.target;
  }

  set Target(target: string) {
    this.target =  target;
  }

  set Date(date: Date) {
    this.date = date;
  }

  get Date(): Date {
    return this.Date;
  }

  set Milliseconds(milliseconds: number) {
    this.milliseconds = milliseconds;
  }

  get Value(): any {
    return this.value;
  }

  set Value(value: any) {
    this.value = value;
  }

  get Id(): string {
    return this.id;
  }

  set Id(id: string) {
    this.id =  id;
  }

  get Milliseconds(): number {
    return this.milliseconds;
  }

  get Status(): boolean {
    return this.status;
  }

  set Status(status: boolean) {
    this.status = status;
  }

}
