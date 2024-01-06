import { moveContent, moveCards } from './teclado.js';

export function comandoPersonalizado(key){

   if (key == " ") {
      key = "space";
   }

   if(key == listaTeclas.arrowUpPlanta){
      moveContent('arrowup');
   } else if(key == listaTeclas.arrowDownPlanta){
      moveContent('arrowdown');
   } else if(key == listaTeclas.arrowLeftPlanta){
      moveContent('arrowleft');
   } else if(key == listaTeclas.arrowRightPlanta){
      moveContent('arrowright');
   } else if(key == listaTeclas.cardEsquerdaPlanta){
      moveCards('1');
   } else if(key == listaTeclas.cardDireitaPlanta){
      moveCards('2');
   } else if(key == listaTeclas.colcoarPersonagemPlanta){
      moveCards(' ');
   }
}