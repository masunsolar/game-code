function calcularPontuacao() {
    tempoFim = Date.now();
    const tempoDecorrido = Math.floor((tempoFim - tempoInicio) / 1000); 
    pontuacao = Math.max(0, Math.floor(1000 * Math.exp(-tempoDecorrido / 50)));
    const mensagem = `Tempo: ${tempoDecorrido}s<br>Pontuação: ${pontuacao}`;
    abrirPopup(mensagem);
    
    novaFase();
}