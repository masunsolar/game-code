function abrirPopup(mensagem, callback = null, titulo = null) {
    const popup = document.getElementById("popup");
    const msg = document.getElementById("popup-mensagem");
    const tituloEl = document.getElementById("popup-titulo");

    msg.innerHTML = mensagem;
    popup.classList.remove("hidden");
    popup.dataset.callback = callback || "";

    // Se tiver título, mostra. Se não tiver, esconde.
    if (titulo) {
        tituloEl.innerText = titulo;
        tituloEl.classList.remove("hidden");
    } else {
        tituloEl.innerText = "";
        tituloEl.classList.add("hidden");
    }
} 

function fecharPopup() {
    console.log("Fechando popup..."); // ✅ testando
    const popup = document.getElementById("popup");
    popup.classList.add("hidden");

    if (popup.dataset.callback === "novaFase") {
        novaFase();
    }

    popup.dataset.callback = "";
}
