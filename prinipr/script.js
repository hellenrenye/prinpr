// Dados do menu
let participantes = [];
let historicoPartidas = [];

// Elementos do menu
const menuContainer = document.getElementById('menu-container');
const menuOutput = document.getElementById('menu-output');
const btnAdicionar = document.getElementById('btn-adicionar');
const btnRegistrar = document.getElementById('btn-registrar');
const btnRanking = document.getElementById('btn-ranking');
const btnHistorico = document.getElementById('btn-historico');
const btnRemover = document.getElementById('btn-remover');
const btnJogar = document.getElementById('btn-jogar');

// Elementos da tela inicial do jogo
const telaInicial = document.getElementById('tela-inicial');
const palavraInfo = document.getElementById('palavra-info');
const btnIniciarJogo = document.getElementById('btn-iniciar-jogo');
const btnVoltarMenuInicial = document.getElementById('btn-voltar-menu-inicial');

// Elementos do jogo
const jogoContainer = document.getElementById('jogo-container');
const palavraInput = document.getElementById('palavra');
const enviarBtn = document.getElementById('enviar');
const feedbackDiv = document.getElementById('feedback');
const tentativasDiv = document.getElementById('tentativas');
const resultadoDiv = document.getElementById('resultado');
const btnVoltarMenuJogo = document.getElementById('btn-voltar-menu-jogo');
const confetesCanvas = document.getElementById('confetes');

let palavras = [
    "pato", "gato", "cena", "bola", "mesa", "sino", "fogo", "torta", "amigo",
    "real", "lago", "tela", "cubo", "dado", "fino", "gelo", "lado", "luar",
    "trem", "azul", "mato", "rosa", "noia", "papo", "rato", "bexiga", "uva",
    "pelo", "pena", "pino", "roda", "agir", "bruta", "ritmo",  "sino", "sangue",
    "fiel", "sexy", "toda", "vibe", "vida", "arte", "vago", "amor", "jamais", "junto",
    "rubens", "ações", "coração", "paciente", "tóxico", "pão", "pães", "mãe", "irmão"
];  

let palavraSecreta = '';
let tentativasRestantes = 6;
let comprimentoPalavra = 0;

// --- MENU ---

function limparMenuOutput() {
    menuOutput.textContent = '';
}

function adicionarParticipante() {
    let nome = prompt("Digite o nome do jogador ou time:");
    if (!nome) {
        alert("Nome inválido.");
        return;
    }
    nome = nome.trim();
    if (participantes.find(p => p.nome.toLowerCase() === nome.toLowerCase())) {
        alert("Nome já existe.");
        return;
    }
    participantes.push({
        nome,
        pontos: 0,
        vitorias: 0,
        empates: 0,
        derrotas: 0,
        partidas: 0
    });
    alert(`${nome} foi adicionado com sucesso!`);
}

function encontrarParticipante(nome) {
    return participantes.find(p => p.nome.toLowerCase() === nome.toLowerCase());
}

function registrarPartida() {
    let nome1 = prompt("Nome do jogador/time 1:");
    let nome2 = prompt("Nome do jogador/time 2:");

    if (!nome1 || !nome2) {
        alert("Nomes inválidos.");
        return;
    }
    nome1 = nome1.trim();
    nome2 = nome2.trim();

    if (nome1.toLowerCase() === nome2.toLowerCase()) {
        alert("Os participantes devem ser diferentes.");
        return;
    }

    const p1 = encontrarParticipante(nome1);
    const p2 = encontrarParticipante(nome2);

    if (!p1 || !p2) {
        alert("Participantes não encontrados.");
        return;
    }

    let resultado = prompt(`Quem venceu?
Digite:
- "${nome1}" se ${nome1} venceu
- "${nome2}" se ${nome2} venceu
- "empate" se houve empate`).trim();

    p1.partidas++;
    p2.partidas++;

    if (resultado.toLowerCase() === nome1.toLowerCase()) {
        p1.vitorias++;
        p1.pontos += 2;
        p2.derrotas++;
        historicoPartidas.push(`${nome1} venceu de ${nome2}`);
        alert(`${nome1} venceu de ${nome2}`);
    } else if (resultado.toLowerCase() === nome2.toLowerCase()) {
        p2.vitorias++;
        p2.pontos += 2;
        p1.derrotas++;
        historicoPartidas.push(`${nome2} venceu de ${nome1}`);
        alert(`${nome2} venceu de ${nome1}`);
    } else if (resultado.toLowerCase() === "empate") {
        p1.empates++;
        p2.empates++;
        p1.pontos += 1;
        p2.pontos += 1;
        historicoPartidas.push(`${nome1} empatou com ${nome2}`);
        alert(`${nome1} empatou com ${nome2}`);
    } else {
        alert("Resultado inválido.");
        p1.partidas--;
        p2.partidas--;
    }
}

function calcularAproveitamento(participante) {
    if (participante.partidas === 0) return "0%";
    const aproveitamento = (participante.vitorias / participante.partidas) * 100;
    return `${aproveitamento.toFixed(1)}%`;
}

function exibirRanking() {
    if (participantes.length === 0) {
        menuOutput.textContent = "Nenhum participante cadastrado.";
        return;
    }
    const ranking = [...participantes].sort((a, b) => b.pontos - a.pontos);
    let texto = "RANKING\n";
    ranking.forEach((p, i) => {
        texto += `${i + 1}. ${p.nome}\n   Pontos: ${p.pontos}\n   Vitórias: ${p.vitorias}, Empates: ${p.empates}, Derrotas: ${p.derrotas}\n   Partidas: ${p.partidas}, Aproveitamento: ${calcularAproveitamento(p)}\n\n`;
    });
    menuOutput.textContent = texto;
}

function exibirHistorico() {
    if (historicoPartidas.length === 0) {
        menuOutput.textContent = "Nenhuma partida registrada.";
        return;
    }
    let texto = "HISTÓRICO DE PARTIDAS\n";
    historicoPartidas.forEach((registro, i) => {
        texto += `${i + 1}. ${registro}\n`;
    });
    menuOutput.textContent = texto;
}

function removerParticipante() {
    let nome = prompt("Digite o nome do jogador/time a ser removido:");
    if (!nome) {
        alert("Nome inválido.");
        return;
    }
    nome = nome.trim();
    const index = participantes.findIndex(p => p.nome.toLowerCase() === nome.toLowerCase());
    if (index !== -1) {
        participantes.splice(index, 1);
        alert(`${nome} foi removido do sistema.`);
    } else {
        alert("Participante não encontrado.");
    }
}

// --- EVENTOS MENU ---

btnAdicionar.addEventListener('click', () => {
    limparMenuOutput();
    adicionarParticipante();
});

btnRegistrar.addEventListener('click', () => {
    limparMenuOutput();
    registrarPartida();
});

btnRanking.addEventListener('click', () => {
    exibirRanking();
});

btnHistorico.addEventListener('click', () => {
    exibirHistorico();
});

btnRemover.addEventListener('click', () => {
    limparMenuOutput();
    removerParticipante();
});

btnJogar.addEventListener('click', () => {
    menuContainer.style.display = 'none';
    telaInicial.style.display = 'block';
    iniciarTelaInicialJogo();
});

// --- TELA INICIAL DO JOGO ---

function iniciarTelaInicialJogo() {
    palavraSecreta = escolherPalavraAleatoria();
    comprimentoPalavra = palavraSecreta.length;
    tentativasRestantes = 6;
    palavraInfo.innerText = `A palavra tem ${comprimentoPalavra} letras.`;
    limparJogo();
}

btnIniciarJogo.addEventListener('click', () => {
    telaInicial.style.display = 'none';
    jogoContainer.style.display = 'block';
    palavraInput.focus();
});

btnVoltarMenuInicial.addEventListener('click', () => {
    telaInicial.style.display = 'none';
    menuContainer.style.display = 'block';
    limparMenuOutput();
});

// --- JOGO DE ADIVINHAÇÃO ---

function limparJogo() {
    feedbackDiv.innerHTML = '';
    tentativasDiv.innerText = `Tentativas restantes: ${tentativasRestantes}`;
    resultadoDiv.innerText = '';
    palavraInput.value = '';
}

function escolherPalavraAleatoria() {
    return palavras[Math.floor(Math.random() * palavras.length)];
}

function verificarPalavra() {
    let palavraInserida = palavraInput.value.trim().toLowerCase();

    if (palavraInserida.length !== comprimentoPalavra) {
        alert("A palavra deve ter " + comprimentoPalavra + " letras.");
        return;
    }

    let feedbackHTML = '';
    let palavraAcertada = true;

    for (let i = 0; i < comprimentoPalavra; i++) {
        let letra = palavraInserida[i];

        if (letra === palavraSecreta[i]) {
            feedbackHTML += `<span class="letra correta">${letra}</span>`;
        } else if (palavraSecreta.includes(letra)) {
            feedbackHTML += `<span class="letra presente">${letra}</span>`;
            palavraAcertada = false;
        } else {
            feedbackHTML += `<span class="letra ausente">${letra}</span>`;
            palavraAcertada = false;
        }
    }

    feedbackDiv.innerHTML = feedbackHTML;

    if (palavraAcertada) {
        resultadoDiv.innerText = "Parabéns! Você acertou a palavra.";
        animarConfetes();
        setTimeout(() => {
            iniciarTelaInicialJogo();
            jogoContainer.style.display = 'none';
            telaInicial.style.display = 'block';
        }, 2000);
    } else {
        tentativasRestantes--;
        tentativasDiv.innerText = `Tentativas restantes: ${tentativasRestantes}`;
        resultadoDiv.innerText = "Tente novamente!";

        if (tentativasRestantes === 0) {
            resultadoDiv.innerText = `Fim do jogo! A palavra era ${palavraSecreta}.`;
            setTimeout(() => {
                iniciarTelaInicialJogo();
                jogoContainer.style.display = 'none';
                telaInicial.style.display = 'block';
            }, 2000);
        }
    }

    palavraInput.value = '';
    palavraInput.focus();
}

// Voltar ao menu do jogo
btnVoltarMenuJogo.addEventListener('click', () => {
    jogoContainer.style.display = 'none';
    menuContainer.style.display = 'block';
    limparMenuOutput();
});

// Eventos jogo
enviarBtn.addEventListener('click', verificarPalavra);
palavraInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        verificarPalavra();
    }
});
palavraInput.addEventListener('input', function() {
    this.value = this.value.replace(/[^a-zãáàâõóôéíúç]/gi, '').toLowerCase();
});

// --- ANIMAÇÃO CONFETES ---

function animarConfetes() {
    let canvas = confetesCanvas;
    let ctx = canvas.getContext('2d');
    let confetes = [];

    for (let i = 0; i < 100; i++) {
        confetes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: Math.random() * 2 - 1,
            vy: Math.random() * -5,
            cor: getRandomColor()
        });
    }

    function atualizar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < confetes.length; i++) {
            ctx.beginPath();
            ctx.arc(confetes[i].x, confetes[i].y, 2, 0, Math.PI * 2);
            ctx.fillStyle = confetes[i].cor;
            ctx.fill();

            confetes[i].x += confetes[i].vx;
            confetes[i].y += confetes[i].vy;

            if (confetes[i].y > canvas.height) {
                confetes[i].y = 0;
                confetes[i].x = Math.random() * canvas.width;
            }
        }

        requestAnimationFrame(atualizar);
    }

    function getRandomColor() {
        let cores = ['#FF69B4', '#33CC33', '#6666FF', '#FFFF66', '#FF9966'];
        return cores[Math.floor(Math.random() * cores.length)];
    }

    atualizar();
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 2000);
}

// Inicialização
menuContainer.style.display = 'block';
telaInicial.style.display = 'none';
jogoContainer.style.display = 'none';