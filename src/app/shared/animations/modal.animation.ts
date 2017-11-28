import { trigger, state, animate, transition, style } from '@angular/animations';

export const modalAnimation  = trigger('modalState', [
  state('*', style({
    opacity: 0,
    transform: 'translateY(-10%)',
  })),
  state('active', style({
    opacity: 1,
    transform: 'translateY(0)',
  })),
  transition('* <=> active', animate('.4s linear'))
]);
