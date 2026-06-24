const display = document.getElementById('display');
const historico = document.getElementById('historico');

let expressaoAtual = "";
let operacaoCompleta = false;

const frasesMagicas = [
    "Prisma Lunar! 🌙",
    "Pelo Poder do Cristal! ✨",
    "Amor e Justiça! 💖",
    "Cristal de Prata! 💎",
    "Cetro Espiral do Coração! 🌟",
    "Poder Estelar! ⭐",
    "Doce Coração Rosa! 💕",
    "A fada do amor e da justiça! 🎀"
];

function limparVisor() {
    expressaoAtual = "";
    display.innerText = "0";
    historico.innerText = "";
    operacaoCompleta = false;
}
function apagarUltimo() {
    if (operacaoCompleta) {
        limparVisor();
        return;
    }
    expressaoAtual = expressaoAtual.slice(0, -1);
    display.innerText = formatarParaExibicao(expressaoAtual) || "0";
}
function inserirNumero(numero) {
    if (operacaoCompleta) {
        expressaoAtual = "";
        operacaoCompleta = false;
    }
    if (numero === '.' && expressaoAtual.endsWith('.')) return;
    if (expressaoAtual.length >= 14) return;

    expressaoAtual += numero;
    display.innerText = formatarParaExibicao(expressaoAtual);
}
function inserirOperador(operador) {
    if (expressaoAtual === "" && operador !== '-') return;

    if (operacaoCompleta) {
        operacaoCompleta = false;
    }

    const ultimoChar = expressaoAtual.slice(-1);
    if (['+', '-', '*', '/', '%'].includes(ultimoChar)) {
        expressaoAtual = expressaoAtual.slice(0, -1) + operador;
    } else {
        expressaoAtual += operador;
    }

    display.innerText = formatarParaExibicao(expressaoAtual);
}
function calcularResultado() {
    if (expressaoAtual === "") return;

    try {
        historico.innerText = formatarParaExibicao(expressaoAtual) + " =";

        let expressaoLimpa = expressaoAtual.replace(/×/g, '*').replace(/÷/g, '/');

        if (expressaoLimpa.includes('%')) {
            expressaoLimpa = expressaoLimpa.replace(/(\d+)%/g, "($1/100)");
        }

        let resultado = eval(expressaoLimpa);

        if (resultado === Infinity || isNaN(resultado)) {
            display.innerText = "Erro Mágico";
            expressaoAtual = "";
        } else {
            if (resultado.toString().includes('.') && resultado.toString().split('.')[1].length > 4) {
                resultado = Number(resultado.toFixed(4));
            }
            display.innerText = resultado.toString().replace('.', ',');
            expressaoAtual = resultado.toString();
        }

        operacaoCompleta = true;

    } catch (erro) {
        display.innerText = "Erro Mágico";
        expressaoAtual = "";
        operacaoCompleta = true;
    }
}
function formatarParaExibicao(valor) {
    return valor
        .replace(/\*/g, ' × ')
        .replace(/\//g, ' ÷ ')
        .replace(/\+/g, ' + ')
        .replace(/\-/g, ' − ')
        .replace(/\./g, ',');
}
function magiaDasFaiscas(evento, quantidade = 12) {
    const iconesMagicos = ['⭐', '💖', '✨', '🌙', '✦', '✧'];
    const container = document.body;

    const baseLeft = evento ? evento.clientX : window.innerWidth / 2;
    const baseTop = evento ? evento.clientY : window.innerHeight / 2;

    for (let i = 0; i < quantidade; i++) {
        const faisca = document.createElement('span');
        faisca.classList.add('faisca');
        faisca.innerText = iconesMagicos[Math.floor(Math.random() * iconesMagicos.length)];
        
        faisca.style.left = `${baseLeft}px`;
        faisca.style.top = `${baseTop}px`;

        const direcaoX = (Math.random() - 0.5) * 150;
        const direcaoY = (Math.random() - 0.5) * 150;

        faisca.style.setProperty('--x', `${direcaoX}px`);
        faisca.style.setProperty('--y', `${direcaoY}px`);

        container.appendChild(faisca);

        setTimeout(() => {
            faisca.remove();
        }, 800);
    }
}
function ativarBrilhoEspecial(evento) {
    const fraseAleatoria = frasesMagicas[Math.floor(Math.random() * frasesMagicas.length)];
    historico.innerText = fraseAleatoria;
    magiaDasFaiscas(evento, 12);
}

document.querySelectorAll('.btn-magico, .btn-operador, .btn-igual').forEach(botao => {
    if (botao.id === 'btn-magia') return;

    botao.addEventListener('click', (evento) => {
        magiaDasFaiscas(evento);
    });
});
const btnMagia = document.getElementById('btn-magia');
if (btnMagia) {
    btnMagia.addEventListener('click', (evento) => {
        ativarBrilhoEspecial(evento);
    });
}