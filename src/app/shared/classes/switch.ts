import Component from './component';

export default class Switch extends Component {

  private digitalPin: number;
  private isOn: boolean;

  constructor(
    idBoard: string,
    description: string,
    digitalPin: number,
    type: number,
    id?: string,
    isOn?: boolean
  ) {
    super(idBoard, description, type, id);
    this.DigitalPin = digitalPin;
    this.IsOn = isOn;
  }

  get DigitalPin(): number {
    return this.digitalPin;
  }

  set DigitalPin(value: number) {
    this.digitalPin = value;
  }

  get IsOn(): boolean {
    return this.isOn;
  }

  set IsOn(isOn: boolean) {
    this.isOn = isOn;
  }

}
