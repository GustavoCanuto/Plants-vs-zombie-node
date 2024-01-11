import { moveContent, moveCards } from './teclado.js';


class jogadorComandosTeclado{

      jogadorPlanta(key){

         if(key == listaTeclasPlantas.arrowUpPlanta)                moveContent('arrowup',0);
         else if(key == listaTeclasPlantas.arrowDownPlanta)         moveContent('arrowdown',0);
         else if(key == listaTeclasPlantas.arrowLeftPlanta)         moveContent('arrowleft',0);
         else if(key == listaTeclasPlantas.arrowRightPlanta)        moveContent('arrowright',0);
         else if(key == listaTeclasPlantas.cardEsquerdaPlanta)      moveCards('1',0);
         else if(key == listaTeclasPlantas.cardDireitaPlanta)       moveCards('2',0);
         else if(key == listaTeclasPlantas.colcoarPersonagemPlanta) moveCards(' ',0);
      }

      jogadorZombie(key){


         if(key == listaTeclasZombies.arrowUpZombie)                moveContent('arrowup',1);
         else if(key == listaTeclasZombies.arrowDownZombie)         moveContent('arrowdown',1);
         else if(key == listaTeclasZombies.arrowLeftZombie)         moveContent('arrowleft',1);
         else if(key == listaTeclasZombies.arrowRightZombie)        moveContent('arrowright',1);
         else if(key == listaTeclasZombies.cardEsquerdaZombie)      moveCards('1',1);
         else if(key == listaTeclasZombies.cardDireitaZombie)       moveCards('2',1);
         else if(key == listaTeclasZombies.colcoarPersonagemZombie) moveCards(' ',1);

      }

}

export var jogadorComandosTecladoPlanta = new jogadorComandosTeclado();
export var jogadorComandosTecladoZombie = new jogadorComandosTeclado();
