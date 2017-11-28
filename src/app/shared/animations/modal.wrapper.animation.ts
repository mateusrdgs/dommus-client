import { trigger, state, animate, transition, style } from '@angular/animations';

export const modalWrapperAnimation  = trigger('modalWrapperState', [
  state('inactive', style({
    opacity: 0,
    top: '1%',
  })),
  state('active', style({
    opacity: 1,
    top: 0,
  })),
  transition('inactive <=> active', animate('.4s linear'))
]);
