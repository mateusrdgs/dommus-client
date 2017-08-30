import Component from './component';

export default class Switch extends Component {

  private digitalPin: number;

  constructor(
    idBoard: string,
    description: string,
    digitalPin: number,
    id?: string
  ) {
    super(idBoard, description, id);
    this.DigitalPin = digitalPin;
  }

  get DigitalPin(): number {
    return this.digitalPin;
  }

  set DigitalPin(value: number) {
    this.digitalPin = value;
  }

}
