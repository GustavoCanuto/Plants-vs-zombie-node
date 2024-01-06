import { moveContent, moveCards } from './teclado.js';

export function comandoPersonalizado(key){

   if(key==arrowUp){
      moveContent('arrowup')
   }else if(key==arrowDown){
    moveContent('arrowdown')
   }else if(key==arrowLeft){
    moveContent('arrowleft')
   }else if(key==arrowRight){
    moveContent('arrowright')
   }
       

}