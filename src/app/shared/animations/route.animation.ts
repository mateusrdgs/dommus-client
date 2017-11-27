import { trigger, state, animate, transition, style } from '@angular/animations';

export const routeAnimation  = trigger('routeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('.3s', style({ opacity: 1 }))
  ])
]);
