var cellNavBarZombie = document.querySelectorAll('.navbar-zombie .card');
var cellNavBarZombieAtual = document.querySelector('.cardtombstone');
var cursorNavBarZombie = document.getElementById('cursor-navBar-zombie');

cellNavBarZombie.forEach(function (cell) {

    cell.addEventListener('mouseenter', function () {
        // Mova a div seletorTabuleiro para a célula atual
        cellNavBarZombieAtual.classList.remove('seletorNavBar');
        cellNavBarZombieAtual = cell;

        if (!cellNavBarZombieAtual.classList.contains('pontuacao-zombie')) {
            cell.classList.add('seletorNavBar');
           
            cell.appendChild(cursorNavBarZombie);

        }

    });
});