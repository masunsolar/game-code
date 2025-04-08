// Classe que representa o robô
class Robo {
    constructor(posInicial) {
        this.resetar(posInicial);
    }

    resetar(posInicial) {
        this.x = posInicial.x;
        this.y = posInicial.y;
        this.dir = posInicial.dir;
        this.coletadas = [];
    }

    mover(mapa) {
        const dx = [0, 1, 0, -1];
        const dy = [-1, 0, 1, 0];
        const nx = this.x + dx[this.dir];
        const ny = this.y + dy[this.dir];

        if (mapa.grid[ny][nx] !== "#") {
            if (mapa.grid[ny][nx] === "D") {
                if (this.coletadas.length === mapa.totalMoedas) {
                    this.x = nx;
                    this.y = ny;
                    return "fim";
                } else {
                    abrirPopup("Você precisa coletar todas as moedas antes de entrar na porta! 💰");
                }
            } else {
                this.x = nx;
                this.y = ny;
                if (mapa.grid[ny][nx] === "M" && !this.coletadas.includes(`${nx},${ny}`)) {
                    this.coletadas.push(`${nx},${ny}`);
                }
            }
        }
        return null;
    }

    girar(direcao, vezes = 1) {
        if (direcao === "direita") {
            this.dir = (this.dir + vezes) % 4;
        } else {
            this.dir = (this.dir + 3 * vezes) % 4;
        }
    }
}