# Plants vs Zombies Multiplayer

Este é um projeto de estudo desenvolvido para criar uma versão multiplayer do popular jogo "Plants vs Zombies". Ele foi construído utilizando HTML, CSS, JS e Node.js.

## Como Executar

Para rodar o jogo localmente, siga estas instruções:

1. Certifique-se de ter o Node.js instalado em sua máquina.
2. Abra o terminal e navegue até o diretório raiz do projeto.
3. Execute o seguinte comando para instalar as dependências do projeto:

    ```
    npm install
    ```

4. Após a instalação das dependências, execute o servidor utilizando o seguinte comando:

    ```
    node src/serverLobby.js
    ```

5. Agora, o servidor do jogo estará em execução pelo endereço http://localhost:3000/.

## Como Jogar Multiplayer

Para jogar, siga as instruções abaixo:

1. Abra o jogo em duas abas do navegador ou em dois computadores diferentes dentro da mesma rede local.
2. Para jogar em computadores diferentes na mesma rede, acesse o endereço IP da máquina que está rodando o jogo, seguido pela porta `3000`. Por exemplo: `http://endereco-ip:3000`.
3. Ao iniciar o jogo, os jogadores terão a opção de escolher entre ser Planta ou Zombie e serão direcionados para um lobby onde poderão enviar convites e iniciar o jogo com outro jogador que deseja enfrentar.

## Autores

Este projeto foi desenvolvido por <br>
[Gustavo Canuto](https://github.com/GustavoCanuto).<br>
[Renato Alisson](https://github.com/raacodes).<br>
[Victor Augusto](https://github.com/victorallves).
