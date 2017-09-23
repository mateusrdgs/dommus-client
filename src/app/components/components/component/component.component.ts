import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.styl']
})
export class ComponentComponent implements OnInit {

  component;

  constructor(
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this._activatedRoute
        .data
        .map(response => response['component'])
        .subscribe(response => {
          if (response.status === 200) {
            this.component = response.json()['Component'];
          }
        });
  }

}
