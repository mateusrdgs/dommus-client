import Component from './component';

export default class Thermometer extends Component {

  private controller: string;
  private analogPin: number;
  private frequency: number;

  constructor(
    idBoard: string,
    description: string,
    type: number,
    controller: string,
    analogPin: number,
    frequency: number,
    id?: string
  ) {
      super(idBoard, description, type, id);
      this.Controller = controller;
      this.AnalogPin = analogPin;
      this.Frequency =  frequency;
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

    set AnalogPin(value: number) {
      this.analogPin = value;
    }

    get Frequency(): number {
      return this.frequency;
    }

    set Frequency(value: number) {
      this.frequency = value;
    }
}
