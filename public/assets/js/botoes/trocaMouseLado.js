import {navBarEnter} from '../comandos/mouse/mouseNavBar.js';

var btnGravarOpcaoMouse = document.getElementById('gravarOpcaoMouse');

btnGravarOpcaoMouse.addEventListener('click', gravarOpcaoMouse);

function gravarOpcaoMouse() {
    
    var opcoesMouse = document.getElementsByName('opcaoMouse');

    for (var i = 0; i < opcoesMouse.length; i++) {
        if (opcoesMouse[i].checked) {
           
           if(opcoesMouse[i].value == "plantas") LadoQueUsaMouse = 0;
           else if(opcoesMouse[i].value == "zombies") LadoQueUsaMouse = 1;
           else LadoQueUsaMouse = 2;

           break; 
        }
    }
    console.log("Lado que usa o mouse: " + LadoQueUsaMouse);
    alert("alterado com sucesso")
    chaveMouse = Object.keys(celulaAtual[LadoQueUsaMouse]);
    cursorTabuleiroMouse = LadoQueUsaMouse == 0 ? cursorTabuleiroAmarelo: cursorTabuleiroAzul;
    mouseEnterCelula();
    navBarEnter();

}