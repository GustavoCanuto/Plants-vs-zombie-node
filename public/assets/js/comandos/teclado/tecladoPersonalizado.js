import { moveContent, moveCards } from './teclado.js';

export function comandoPersonalizado(key){

   if (key == " ") {
      key = "space";
   }

   if(key == listaTeclas.arrowUpPlanta)                moveContent('arrowup',0);
   else if(key == listaTeclas.arrowDownPlanta)         moveContent('arrowdown',0);
   else if(key == listaTeclas.arrowLeftPlanta)         moveContent('arrowleft',0);
   else if(key == listaTeclas.arrowRightPlanta)        moveContent('arrowright',0);
   else if(key == listaTeclas.cardEsquerdaPlanta)      moveCards('1',0);
   else if(key == listaTeclas.cardDireitaPlanta)       moveCards('2',0);
   else if(key == listaTeclas.colcoarPersonagemPlanta) moveCards(' ',0);
   
   if(key == listaTeclas.arrowUpZombie)                moveContent('arrowup',1);
   else if(key == listaTeclas.arrowDownZombie)         moveContent('arrowdown',1);
   else if(key == listaTeclas.arrowLeftZombie)         moveContent('arrowleft',1);
   else if(key == listaTeclas.arrowRightZombie)        moveContent('arrowright',1);
   else if(key == listaTeclas.cardEsquerdaZombie)      moveCards('1',1);
   else if(key == listaTeclas.cardDireitaZombie)       moveCards('2',1);
   else if(key == listaTeclas.colcoarPersonagemZombie) moveCards(' ',1);
   
}