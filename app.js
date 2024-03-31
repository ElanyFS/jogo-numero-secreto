let numerosSorteados = [];
let numeroMaximo = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

let botaoReiniciar = document.getElementById("reiniciar");

function manipularTextosHTML(texto, tag) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1});
}

manipularTextosHTML("Jogo Secreto", "h1");

manipularTextosHTML("Escolha um número entre 1 e 10.", "p");

function verificarChute() {
  let numeroChute = Number(document.querySelector("input").value);

  if (numeroSecreto == numeroChute) {

    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagem = `Você acertou o número secreto ${numeroSecreto}, com ${tentativas} ${palavraTentativa}.`;
    manipularTextosHTML("Acertou!", "h1");
    manipularTextosHTML(
      mensagem,
      "p"
    );
    botaoReiniciar.removeAttribute("disabled");
  } else {
    if (numeroChute > numeroSecreto) {
      manipularTextosHTML("O número secreto é menor", "p");
    } else {
      manipularTextosHTML("O número secreto é maior", "p");
    }

    tentativas++;
    limparCampo();
  }
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);

  if(numerosSorteados.length === numeroMaximo){
    numerosSorteados = [];
  }

  if(numerosSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatorio();
  }else{
    numerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  }
}

function limparCampo() {
  let numeroChute = document.querySelector("input");
  numeroChute.value = "";
}

function novoJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  tentativas = 1;
  botaoReiniciar.setAttribute("disabled", true);
  limparCampo();

  manipularTextosHTML("Jogo Secreto", "h1");

  manipularTextosHTML("Escolha um número entre 1 e 10.", "p");
}
