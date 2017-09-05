import Component from './component';

export default class Light extends Component {

  private _controller: string;
  private _analogPin: number;
  private _frequency: number;
  private _threshold: number;

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
    return this._controller;
  }

  set Controller(controller: string) {
    this._controller = controller;
  }

  get AnalogPin(): number {
    return this._analogPin;
  }

  set AnalogPin(analogPin: number) {
    this._analogPin = analogPin;
  }

  get Frequency(): number {
    return this._frequency;
  }

  set Frequency(frequency: number) {
    this._frequency = frequency;
  }

  get Threshold(): number {
    return this._threshold;
  }

  set Threshold(threshold: number) {
    this._threshold = threshold;
  }

}
