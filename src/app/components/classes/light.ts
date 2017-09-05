import Component from './component';

export default class Light extends Component {

  private controller: string;
  private analogPin: number;
  private frequency: number;
  private threshold: number;

  constructor(
    idBoard: string,
    description: string,
    type: number,
    controller: string,
    analogPin: number,
    frequency: number,
    threshold: number,
    id?: string
  ) {
    super(idBoard, description, type, id);
    this.Controller = controller;
    this.AnalogPin = analogPin;
    this.Frequency = frequency;
    this.Threshold = threshold;
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

  get Frequency(): number {
    return this.frequency;
  }

  set Frequency(frequency: number) {
    this.frequency = frequency;
  }

  get Threshold(): number {
    return this.threshold;
  }

  set Threshold(threshold: number) {
    this.threshold = threshold;
  }

}
