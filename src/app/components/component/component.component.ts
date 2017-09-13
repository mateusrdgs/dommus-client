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
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this._activatedRoute.data
        .subscribe(data => {
          const { component } = data;
          this.component = component;
        });
  }

}
