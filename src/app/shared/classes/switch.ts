import Component from './component';

export default class Switch extends Component {

  private digitalPin: number;
  private command: string[];
  private isOn: boolean;

  constructor(
    idBoard: string,
    description: string,
    digitalPin: number,
    command: string[],
    type: number,
    id?: string,
    isOn?: boolean
  ) {
    super(idBoard, description, type, id);
    this.DigitalPin = digitalPin;
    this.Command = command;
    this.IsOn = isOn;
  }

  get DigitalPin(): number {
    return this.digitalPin;
  }

  set DigitalPin(value: number) {
    this.digitalPin = value;
  }

  get Command(): string[] {
    return this.command;
  }

  set Command(command: string[]) {
    this.command = command;
  }

  get IsOn(): boolean {
    return this.isOn;
  }

  set IsOn(isOn: boolean) {
    this.isOn = isOn;
  }

}
