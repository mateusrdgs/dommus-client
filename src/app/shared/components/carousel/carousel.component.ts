// tslint:disable-next-line:max-line-length
import { Component, AfterViewInit, ContentChildren, QueryList, ViewChildren, Input, ViewChild, ElementRef, Directive } from '@angular/core';
import { AnimationFactory, AnimationPlayer, animate, style, AnimationBuilder } from '@angular/animations';

import { CarouselItemElementDirective } from './../../directives/carousel-item-element.directive';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.styl']
})
export class CarouselComponent implements AfterViewInit {

  @ViewChildren(CarouselItemElementDirective, { read: ElementRef }) private itemsElements: QueryList<ElementRef>;
  @ViewChild('carousel') private carousel: ElementRef;
  @Input() timing = '250ms ease-in';
  @Input() showControls = true;
  @Input() items: any[];
  private player: AnimationPlayer;
  private itemWidth: number;
  private currentSlide = 0;
  carouselWrapperStyle = {};

  constructor(
    private builder: AnimationBuilder
  ) { }

  ngAfterViewInit() {
    this.itemWidth = this.itemsElements.first.nativeElement.getBoundingClientRect().width;
    this.carouselWrapperStyle = {
      width: `${this.itemWidth}px`
    };
  }

  private buildAnimation( offset ) {
    return this.builder.build([
      animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
    ]);
  }

  next() {
    if (this.currentSlide + 1 === this.items.length) {
      this.currentSlide = 0;
      const offset = this.currentSlide * this.itemWidth;
      const myAnimation: AnimationFactory = this.buildAnimation(offset);
      this.player = myAnimation.create(this.carousel.nativeElement);
      this.player.play();
      return;
    }
    this.currentSlide = (this.currentSlide + 1) % this.items.length;
    const offset = this.currentSlide * this.itemWidth;
    const myAnimation: AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

  prev() {
    if (this.currentSlide === 0) {
      this.currentSlide = this.itemsElements.length - 1;
      const offset = this.currentSlide * this.itemWidth;
      const myAnimation: AnimationFactory = this.buildAnimation(offset);
      this.player = myAnimation.create(this.carousel.nativeElement);
      this.player.play();
      return;
    }
    this.currentSlide = ((this.currentSlide - 1) + this.items.length) % this.items.length;
    const offset = this.currentSlide * this.itemWidth;
    const myAnimation: AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

}
