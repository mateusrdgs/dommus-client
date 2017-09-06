import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'servo',
  templateUrl: './servo.component.html',
  styleUrls: ['./servo.component.styl']
})
export class ServoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onRangeChange(event) {
    console.log(event.srcElement.valueAsNumber);
  }

}
