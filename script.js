const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const displaytempo = document.querySelector('#timer')//id;
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const botao = document.querySelector('.app__card-primary-butto-icon');


const musica = new Audio('./sons/luna-rise-part-one.mp3');
const musicaPause = new Audio('./sons/pause.mp3');
const musicaPlay = new Audio('./sons/play.wav');
const musicaEnd = new Audio('./sons/beep.mp3');
musica.loop = true;


let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

/*focoBt.addEventListener('click', () =>{
    html.setAttribute('data-contexto', 'foco');
    banner.setAttribute('src','/imagens/foco.png')
});

curtoBt.addEventListener('click', () =>{
    html.setAttribute('data-contexto', 'descanso-curto');
    banner.setAttribute('src', '/imagens/descanso-curto.png')
});

longoBt.addEventListener('click', () =>{
    html.setAttribute('data-contexto', 'descanso-longo');
    banner.setAttribute('src','/imagens/descanso-longo.png' )
});*/

musicaFocoInput.addEventListener('change'/*checkbox - vdd ou false*/, () => {
    if(musica.paused){
        musica.play();
    } else{
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
});

function alterarContexto (contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove( 'active')
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML =
            `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML =
            `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML =
            `
            Hora de voltar à superfície.,<br>
            <strong class="app__title-strong">Faça uma pausa longa..</strong>
            `
            break;    
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0){
        musicaEnd.play()
        alert('Tempo finalizado!')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo){
            const evento = new CustomEvent('FocoFinalizado')//brodcast e criando um evento customizado
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if(intervaloId){
        musicaPause.play()
        zerar()
        return
    }
    musicaPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)/*em milesegundos, quero q diminua em 1 segundo, por isso 1000milesegundos*/
    iniciarOuPausarBt.textContent = "Pausar"
    botao.setAttribute('src', `./imagens/pause.png`)
}

function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    botao.setAttribute('src', `./imagens/play_arrow.png`)
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    displaytempo.innerHTML = `${tempoFormatado}`
}

mostrarTempo()