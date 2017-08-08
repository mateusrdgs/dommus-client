import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.styl']
})
export class ComponentComponent implements OnInit {

  component: any;

  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.component = this._route.snapshot.data.component;
  }

}
