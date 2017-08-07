import Component from './component';

export default class Sensor extends Component {

  private analogPin: number;
  private frequency: number;

  constructor(idBoard: string, description: string, type: number,
              analogPin: number, frequency: number, id?: string) {

    super(idBoard, description, type, id);

    this.AnalogPin = analogPin;
    this.Frequency =  frequency;
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
