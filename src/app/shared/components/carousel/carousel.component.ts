// tslint:disable-next-line:max-line-length
import { AfterViewInit, AnimationPlayer, Component, ContentChildren, Directive, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AnimationBuilder, AnimationFactory, animate, style } from '@angular/animations';

import { CarouselItemDirective } from './../../directives/carousel-item.directive';

@Directive({
  selector: '.carousel-item'
})

// tslint:disable-next-line:directive-class-suffix
export class CarouselItemElement {

}

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.styl']
})
export class CarouselComponent implements AfterViewInit {

  @ContentChildren(CarouselItemDirective) items: QueryList<CarouselItemDirective>;
  @ViewChildren(CarouselItemElement, { read: ElementRef }) private itemsElements: QueryList<ElementRef>;
  @ViewChild('carousel') private carousel: ElementRef;
  @Input() timing = '250ms ease-in';
  @Input() showControls = true;
  private player: AnimationPlayer;
  private itemWidth: number;
  private currentSlide = 0;
  carouselWrapperStyle = {};

  constructor(
    private _animationBuilder: AnimationBuilder
  ) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.itemWidth = 300; this.itemsElements.first.nativeElement.getBoundingClientRect().width;
      this.carouselWrapperStyle = {
        width: `300px`
      };
    });
  }

  prev() {
    if (this.currentSlide === 0) {
      return;
    }

    this.currentSlide = ((this.currentSlide - 1) + this.items.length) % this.items.length;
    const offset = this.currentSlide * this.itemWidth;

    /*const animation: AnimationFactory = this._animationBuilder.build([
      animate(this.timing, style({ transform: `translateX(-${ offset })px` }))
    ]);

    this.player = animation.create(this.carousel.nativeElement);
    this.player.play();*/
  }

  next() {
    if (this.currentSlide + 1 === this.items.length) {
      return;
    }
    this.currentSlide = (this.currentSlide + 1) % this.items.length;
    const offset = this.currentSlide * this.itemWidth;
    /*      animation: AnimationFactory = this._animationBuilder.build([
            animate(this.timing, style({ transform: `translateX(-${ offset })px`}))
          ]);
    this.player = animation.create(this.carousel.nativeElement);
    this.player.play();*/
  }

}
