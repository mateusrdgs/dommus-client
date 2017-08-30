import Component from './component';

export default class Sensor extends Component {

  private analogPin: number;
  private frequency: number;
  private controller: string;
  private threshold: number;

  constructor(
    idBoard: string,
    description: string,
    analogPin: number,
    frequency: number,
    controller: string,
    threshold: number,
    id?: string
  ) {

    super(idBoard, description, id);

    this.AnalogPin = analogPin;
    this.Frequency =  frequency;
    this.Controller = controller;
    this.Threshold = threshold;
  }

  get AnalogPin(): number {
    return this.analogPin;
  }

  set AnalogPin(value: number) {
    this.analogPin = value;
  }

  get Frequency(): number {
    return this.frequency;
  }

  set Frequency(value: number) {
    this.frequency = value;
  }

  get Controller(): string {
    return this.controller;
  }

  set Controller(controller: string) {
    this.controller = controller;
  }

  get Threshold(): number {
    return this.threshold;
  }

  set Threshold(threshold: number) {
    this.threshold = threshold;
  }

}
