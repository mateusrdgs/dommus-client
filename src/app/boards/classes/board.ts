export default class Board {

  private id: string;
  private description: string;
  private model: number;
  private port: number;
  private analogPins: Array<number>;
  private digitalPins: Array<number>;

  constructor(description: string, model: number,
    port: number, analogPins?: Array<number>,
    digitalPins?: Array<number>, id?: string) {

      this.Description = description;
      this.Model = model;
      this.Port = port;
      this.AnalogPins = analogPins;
      this.DigitalPins = digitalPins;
      this.Id = id;
  }

  get Id(): string {
    return this.id;
  }

  set Id(value: string) {
    this.id = value;
  }

  get Description(): string {
    return this.description;
  }

  set Description(value: string) {
    this.description = value;
  }

  get Model(): number {
    return this.model;
  }

  set Model(value: number) {
    this.model = value;
  }

  get Port(): number {
    return this.port;
  }

  set Port(value: number) {
    this.port = value;
  }

  get AnalogPins(): Array<number> {
    return this.analogPins;
  }

  set AnalogPins(value: Array<number>) {
    this.analogPins  = value;
  }

  get DigitalPins(): Array<number> {
    return this.digitalPins;
  }

  set DigitalPins(value: Array<number>) {
    this.digitalPins = value;
  }

}
