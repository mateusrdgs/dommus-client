import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'button-submit',
  templateUrl: './button-submit.component.html',
  styleUrls: ['./button-submit.component.styl']
})
export class ButtonSubmitComponent implements OnInit {

  @Input() disabled;
  constructor() { }

  ngOnInit() {
  }

}
