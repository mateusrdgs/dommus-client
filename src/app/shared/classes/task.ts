export default class Task {

  private id: string;
  private component: any;
  private value: any;
  private date: Date;
  private milliseconds: number;
  private status: boolean;

  constructor(
    component: any, date: Date,
    milliseconds: number, value: any,
    id?: string, status?: boolean) {
      this.Component = component;
      this.Date = date;
      this.Milliseconds = milliseconds;
      this.Value = value;
      this.Id = id;
      this.Status =  status;
  }

  get Component(): any {
    return this.component;
  }

  set Component(component: any) {
    this.component =  component;
  }

  set Date(date: Date) {
    this.date = date;
  }

  get Date(): Date {
    return this.date;
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

  get ValueDescription(): any {
    return typeof this.value === 'boolean' ? (this.value ? 'Ligado' : 'Desligado') : `${this.value}º`;
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

  get StatusDescription(): string {
    return this.status ? 'Executada' : 'Não executada';
  }

}
