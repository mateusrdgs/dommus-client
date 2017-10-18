import Component from './component';

export default class Motion extends Component {

  private digitalPin: number;

  constructor(
    idBoard: string,
    description: string,
    type: number,
    digitalPin: number,
    id?: string
  ) {
    super(idBoard, description, type, id);
    this.digitalPin = digitalPin;
  }

  get DigitalPin(): number {
    return this.digitalPin;
  }

  set DigitalPin(digitalPin: number) {
    this.digitalPin = digitalPin;
  }

}
