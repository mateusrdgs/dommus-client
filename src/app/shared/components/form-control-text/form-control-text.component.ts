import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'form-control-text',
  templateUrl: './form-control-text.component.html',
  styleUrls: ['./form-control-text.component.styl']
})
export class FormControlTextComponent implements OnInit {

  @Input() formControlName: string;
  @Input() value: string;
  @Input() isValid: boolean;

  constructor() { }

  ngOnInit() {
  }

}
