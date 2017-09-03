import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.styl']
})
export class ThermometerComponent implements OnInit {

  @Input() component;
  constructor() { }

  ngOnInit() {
  }

}
