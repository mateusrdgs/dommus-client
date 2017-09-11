import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { CardEmitter } from './../../emitters/card.emitter';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.styl']
})
export class CardComponent implements OnInit {

  @Input() component;
  private componentFlipSubscription: Subscription;
  flippedTo: string;

  constructor(
    private _cardEmitter: CardEmitter
  ) { }

  ngOnInit() {
    this.startFlipSubscription();
  }

  startFlipSubscription() {
    this.componentFlipSubscription =
      this._cardEmitter.cardEventEmitter
          .subscribe(flippedTo => this.flippedTo = flippedTo);
  }

}
