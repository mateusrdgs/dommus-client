import Component from './component';

export default class Motion extends Component {

  private controller: string;
  private analogPin: number;

  constructor(
    idBoard: string,
    description: string,
    type: number,
    controller: string,
    analogPin: number,
    id?: string
  ) {
    super(idBoard, description, type, id);
    this.Controller = controller;
    this.AnalogPin = analogPin;
  }

  get Controller(): string {
    return this.controller;
  }

  set Controller(controller: string) {
    this.controller = controller;
  }

  get AnalogPin(): number {
    return this.analogPin;
  }

  set AnalogPin(analogPin: number) {
    this.analogPin = analogPin;
  }

}
