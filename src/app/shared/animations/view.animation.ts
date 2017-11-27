import { trigger, state, animate, transition, style } from '@angular/animations';

export const viewAnimation  = trigger('viewAnimation', [
  state('*', style({
    position: 'relative',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  })),
  transition(':enter', [
    style({
      opacity: 0,
      top: '1%',
    }),
    animate('.4s linear', style({
      opacity: 1,
      top: 0
    }))
  ])
]);
