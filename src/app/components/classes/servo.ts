import Component from './component';

export default class Servo extends Component {

  private digitalPin: number;
  private rotation: number;
  private minRange: number;
  private maxRange: number;

  constructor(idBoard: string, description: string, type: number, digitalPin: number,
              rotation: number, minRange: number, maxRange: number, id?: string) {

    super(idBoard, description, type, id);

    this.DigitalPin = digitalPin;
    this.Rotation = rotation;
    this.MinRange = minRange;
    this.MaxRange = maxRange;
  }

  get DigitalPin(): number {
    return this.digitalPin;
  }

  set DigitalPin(value: number) {
    this.digitalPin = value;
  }

  get Rotation(): number {
    return this.rotation;
  }

  set Rotation(value: number) {
    this.rotation = value;
  }

  get MinRange(): number {
    return this.minRange;
  }

  set MinRange(value: number) {
    this.minRange = value;
  }

  get MaxRange(): number {
    return this.maxRange;
  }

  set MaxRange(value: number) {
    this.maxRange = value;
  }

}
