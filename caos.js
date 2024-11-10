var respostas   = ['CPU', 'ULA', 'REGISTRADORES', 'RAM', 'ROM', 'EPROM', 'FLASH', 'MEMORIADEMASSA', 'DMA', 'CS', 'ADDRESSBUS', 'DATABUS', 'I5', 'I7', 'DUALCORE', 'QUADCORE'];
var resPosition = [[0,5,6],[0,12,15],[0,6,7],[1,14,5],[0,2,15],[1,7,4],[0,15,15],[1,17,2],[1,2,2],[0,14,16],[1,11,0],[0,8,16],[0,7,17],[1,10,6],[1,21,7],[0,4,0]]

var questao = 0

function gerarCruzadinha(coluna, linha) {
    var matrix = []
    for (let i = 0; i < linha; i++){
        matrix[i] = []
        for(let c = 0; c < coluna; c++){
            matrix[i][c] = ""
        }
    }
    return matrix
}

function mostrarCruzadinha(matrix = [[]]){
    const linha = matrix.length
    const coluna = matrix[0].length

    var content = ''
    for (let l = 0; l < linha; l++){
        var linhaGerada = ''
        linhaGerada += `<div class='line'>`
        for (let c = 0; c < coluna; c++){
            linhaGerada += `<div class='block'></div>`
        }
        linhaGerada += `</div>`
        content += linhaGerada
    }
    cruzadinha.innerHTML = content
    colocarEspacos(1)
}

function colocarEspacos(gap) {
    for (let i = 0; i < resPosition.length; i++) {
        const res = resPosition[i];
        const orientacao = res[0];
        // o +1 é para centralizar
        const linhaInicial = res[1 + orientacao]+1;
        const colunaInicial = res[2 - orientacao]+1;
        const resposta = respostas[i];
        
        const changeCell = (linha, coluna) => {
            getCell(linha, coluna).classList.add('in');
        };

        for (let block = 0; block < resposta.length; block++) {
            if (orientacao === 0) {
                changeCell(linhaInicial, colunaInicial + block);
            } else {
                changeCell(linhaInicial + block, colunaInicial);
            }
        }
    }
}


function getCell(line, column){
    return cruzadinha.childNodes[line].childNodes[column]
}

function colocarNaCruzadinha(correto) {
    const pos = respostas.indexOf(correto);
    const res = resPosition[pos];

    const orientacao = res[0];
            // o +1 é para centralizar
    const linhaInicial = res[1 + orientacao]+1;
    const colunaInicial = res[2 - orientacao]+1;

    const addCharCell = (linha, coluna, char) => {
        getCell(linha, coluna).innerHTML = char;
    };

    for (let block = 0; block < correto.length; block++) {
        if (orientacao === 0) {
            addCharCell(linhaInicial, colunaInicial + block, correto[block]);
        } else {
            addCharCell(linhaInicial + block, colunaInicial, correto[block]);
        }
    }
}



function verificar(inp){
    var respostaSemEspaco = ''

    for (var i = 0; i < inp.value.length; i++) {
        if (inp.value[i] != ' ') {
            respostaSemEspaco += inp.value[i].toUpperCase()
        }
    }

    if(respostas.indexOf(respostaSemEspaco) >= 0){
        colocarNaCruzadinha(respostaSemEspaco)
        inp.value = ''
    } else {
        // mostrar erro
    }
}


function iniciarJogo(){
    btn_jogar.style.display = 'none'
    div_instrucao.style.display = 'none'
    jogo.style.display = 'flex'
    mostrarCruzadinha(gerarCruzadinha(25,18))
}