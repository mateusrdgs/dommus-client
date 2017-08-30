import Component from './component';

export default class Servo extends Component {

  private digitalPin: number;
  private rotation: number;
  private startAt: number;
  private range: [number];

  constructor(
    idBoard: string,
    description: string,
    type: number,
    digitalPin: number,
    rotation: number,
    startAt: number,
    minRange: number,
    maxRange: number,
    id?: string
  ) {

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
    return this.range[0];
  }

  set MinRange(value: number) {
    this.range[0] = value;
  }

  get MaxRange(): number {
    return this.range[1];
  }

  set MaxRange(value: number) {
    this.range[1] = value;
  }

  get Range(): [number] {
    return this.range;
  }

  set Range(range: [number]) {
    this.MinRange = range[0];
    this.MaxRange = range[1];
  }

}
