// Classe que representa o mapa do jogo
class Mapa {
    constructor(base, qtdMoedas = 5) {
        this.base = base;
        this.qtdMoedas = qtdMoedas;
        this.grid = [];
        this.totalMoedas = 0;
        this.posicaoInicial = null;
        this.gerarMapa();
    }

    gerarMapa() {
        this.grid = this.base.map(linha => [...linha]);
        const posicoesLivres = [];

        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[0].length; x++) {
                if (this.grid[y][x] === " ") {
                    posicoesLivres.push({ x, y });
                }
            }
        }

        posicoesLivres.sort(() => Math.random() - 0.5);

        const robo = posicoesLivres.pop();
        this.grid[robo.y][robo.x] = "P";
        this.posicaoInicial = { x: robo.x, y: robo.y, dir: 1 };

        const porta = posicoesLivres.pop();
        this.grid[porta.y][porta.x] = "D";

        for (let i = 0; i < this.qtdMoedas && posicoesLivres.length > 0; i++) {
            const moeda = posicoesLivres.pop();
            this.grid[moeda.y][moeda.x] = "M";
        }

        this.totalMoedas = this.grid.flat().filter(c => c === "M").length;
    }
}