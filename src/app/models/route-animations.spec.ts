
import {trigger,style,animate,group,animateChild,query,stagger,transition} from '@angular/animations'; 
export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* <=> *', [
      // Set a default  style for enter and leave
      query(':enter, :leave', [
        style({
          position: 'absolute',
          width: '100%'   ,
          opacity:'0'
        }),
      ]),
      // Animate the new page in
      query(':leave', [
        animate('400ms ease-out', style({ 
          opacity: 0.5,transform: 'scale(1) translateX(100%)'
        }))
      ]),
      query(':enter', [
        animate('200ms ease-in', style({ 
          opacity: 1,transform: 'scale(1) translateX(0%)' 
        }))
      ])
     
     
    ]),
]);