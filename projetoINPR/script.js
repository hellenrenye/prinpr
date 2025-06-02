function main() {
    let palavras = [
        "casa", "carro", "pato", "gato", "cena", "bola", "mesa", "porto", "sino", "fogo",
        "real", "lago", "sala", "tela", "bala", "cubo", "dado", "fino", "gelo", "lado",
        "trem", "azul", "mala", "mato", "nada", "rosa", "noia", "impala", "papo", "rato",
        "pelo", "pena", "pino", "roda", "agir", "pombo", "bruta", "ritmo", "sala", "sino",
        "fiel", "sexy", "nojo", "toda", "vibe", "vida", "arte", "alma", "vago", "amor",
        "rubens", "ações", "coração", "paciente", "tóxico", "pão", "pães", "mãe", "irmão"
    ];
    //let palavras = ["jimin"] //teste de funcionamento
    let palavraSecreta = escolherPalavraAleatoria();
    let tentativasRestantes = 6;
    let comprimentoPalavra = palavraSecreta.length;

    document.getElementById('iniciar-jogo').addEventListener('click', iniciarJogo);
    document.getElementById('palavra-info').innerText = `A palavra tem ${comprimentoPalavra} letras.`;
    document.getElementById('enviar').addEventListener('click', verificarPalavra);
    document.getElementById('palavra').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            verificarPalavra();
        }
    });

    document.getElementById('palavra').addEventListener('input', function() {
        this.value = this.value.replace(/[^a-zãáàâõóôéíúç]/gi, '').toLowerCase();
    });

    document.getElementById('enviar').addEventListener('click', verificarPalavra);
    function iniciarJogo() {
        palavraSecreta = escolherPalavraAleatoria();
        comprimentoPalavra = palavraSecreta.length;
        tentativasRestantes = 6;

        document.getElementById('palavra-info').innerText = `A palavra tem ${comprimentoPalavra} letras.`;
        document.getElementById('tentativas').innerText = `Tentativas restantes: ${tentativasRestantes}`;

        document.getElementById('tela-inicial').style.display = 'none';
        document.getElementById('jogo-container').style.display = 'block';

    }

    function escolherPalavraAleatoria() {
        return palavras[Math.floor(Math.random() * palavras.length)];
    }

    function verificarPalavra() {
        let palavraInserida = document.getElementById('palavra').value;
        
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

        document.getElementById('feedback').innerHTML = feedbackHTML;

        if (palavraAcertada) {
            document.getElementById('resultado').innerText = "Parabéns! Você acertou a palavra.";
            animarConfetes();
            setTimeout(reiniciarJogo, 2000);
        } else {
            tentativasRestantes--;
            document.getElementById('tentativas').innerText = `Tentativas restantes: ${tentativasRestantes}`;
            document.getElementById('resultado').innerText = "Tente novamente!";

            if (tentativasRestantes === 0) {
                document.getElementById('resultado').innerText = `Fim do jogo! A palavra era ${palavraSecreta}.`;
                setTimeout(reiniciarJogo, 2000);
            }
        }

        document.getElementById('palavra').value = ''; 
    }

    function reiniciarJogo() {
        palavraSecreta = escolherPalavraAleatoria();
        comprimentoPalavra = palavraSecreta.length;
        document.getElementById('palavra-info').innerText = `A palavra tem ${comprimentoPalavra} letras.`;
        tentativasRestantes = 6;
        document.getElementById('feedback').innerHTML = '';
        document.getElementById('tentativas').innerText = `Tentativas restantes: ${tentativasRestantes}`;
        document.getElementById('resultado').innerText = '';
    }

    function animarConfetes() {
        let canvas = document.getElementById('confetes');
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
}
window.onload = main; 