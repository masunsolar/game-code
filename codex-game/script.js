let tempoInicio;
let tempoFim;
let pontuacao = 0;

class Jogo {
  constructor(mapaBase, qtdMoedas = 5) {
    this.mapa = new Mapa(mapaBase, qtdMoedas);
    this.robo = new Robo(this.mapa.posicaoInicial);
  }

  reiniciar() {
    this.robo.resetar(this.mapa.posicaoInicial);
    this.render();
  }

  render() {
    const grid = document.getElementById("mapa");
    grid.innerHTML = "";

    const setas = ["↑", "→", "↓", "←"];

    for (let y = 0; y < this.mapa.grid.length; y++) {
      for (let x = 0; x < this.mapa.grid[0].length; x++) {
        let celula = this.mapa.grid[y][x];
        let emoji = "";

        if (this.robo.coletadas.includes(`${x},${y}`)) {
          emoji = "";
        } else if (celula === "#") {
          emoji = "🧱";
        } else if (celula === "M") {
          emoji = "💰";
        } else if (celula === "D") {
          emoji = "🚪";
        }

        if (this.robo.x === x && this.robo.y === y) {
          emoji = `🤖${setas[this.robo.dir]}`;
        }

        const div = document.createElement("div");
        div.className = "cell";
        div.textContent = emoji;
        grid.appendChild(div);
      }
    }
  }

  executarCodigo(codigo) {
    this.reiniciar();
    const linhas = codigo.split("\n");
    let i = 0;

    const passo = () => {
      if (i >= linhas.length) return;
      let linha = linhas[i++].trim();

      if (linha.startsWith("Avance")) {
        let match = linha.match(/Avance\((\d*)\)/);
        let passos = match && match[1] !== "" ? parseInt(match[1]) : 1;
        let j = 0;
        const moverInterval = setInterval(() => {
          const fim = this.robo.mover(this.mapa);
          this.render();
          j++;
          if (j >= passos || fim === "fim") {
            clearInterval(moverInterval);
            if (fim === "fim") {
              calcularPontuacao();
            }
          }
        }, 300);
        setTimeout(passo, passos * 300 + 100);
      } else if (linha.startsWith("Direita")) {
        let match = linha.match(/Direita\((\d*)\)/);
        let vezes = match && match[1] !== "" ? parseInt(match[1]) : 1;
        this.robo.girar("direita", vezes);
        this.render();
        setTimeout(passo, 400);
      } else if (linha.startsWith("Esquerda")) {
        let match = linha.match(/Esquerda\((\d*)\)/);
        let vezes = match && match[1] !== "" ? parseInt(match[1]) : 1;
        this.robo.girar("esquerda", vezes);
        this.render();
        setTimeout(passo, 400);
      } else {
        setTimeout(passo, 400);
      }
    };

    passo();
  }
}

const mapaBase = [
  ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", " ", " ", " ", " ", " ", " ", " ", " ", "#"],
  ["#", " ", " ", " ", " ", " ", " ", " ", " ", "#"],
  ["#", " ", " ", " ", " ", " ", " ", " ", " ", "#"],
  ["#", " ", " ", " ", " ", " ", " ", " ", " ", "#"],
  ["#", " ", " ", " ", " ", " ", " ", " ", " ", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
];

const jogo = new Jogo(mapaBase, 5);

window.onload = () => {
  jogo.render();
  tempoInicio = Date.now();
};

function novaFase() {
  jogo.mapa = new Mapa(mapaBase, 5); 
  jogo.robo = new Robo(jogo.mapa.posicaoInicial);
  tempoInicio = Date.now();
  jogo.render();
}