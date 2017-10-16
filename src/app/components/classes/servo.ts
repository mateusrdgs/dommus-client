import Component from './component';

export default class Servo extends Component {

  private digitalPin: number;
  private startAt: number;
  private range: [number] = [0, 0];

  constructor(
    idBoard: string,
    description: string,
    type: number,
    digitalPin: number,
    startAt: number,
    minRange: number,
    maxRange: number,
    id?: string
  ) {

    super(idBoard, description, type, id);
    this.DigitalPin = digitalPin;
    this.StartAt = startAt;
    this.MinRange = minRange;
    this.MaxRange = maxRange;
  }

  get DigitalPin(): number {
    return this.digitalPin;
  }

  set DigitalPin(value: number) {
    this.digitalPin = value;
  }

  get StartAt(): number {
    return this.startAt;
  }

  set StartAt(value: number) {
    this.startAt = value;
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
