var respostas   = ['CPU',  'ULA',    'REGISTRADORES', 'RAM',   'ROM',   'EPROM', 'FLASH',  'MEMORIADEMASSA', 'DMA',  'CS',     'ADDRESSBUS', 'DATABUS', 'I5',    'I7',    'DUALCORE', 'QUADCORE'];
var resPosition = [[0,5,6],[0,13,14],[0,6,7],         [1,14,5],[0,3,14],[1,8,3], [0,15,13],[1,17,2],         [1,2,2],[0,14,15],[1,12,0],     [0,8,15],  [0,7,16],[1,11,5],[1,21,6],   [0,4,0]]

var questao = 0

function gerarCruzadinha(linha, coluna) {
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
    colocarEspacos()
}

function colocarEspacos() {
    for (let i = 0; i < resPosition.length; i++) {
        const res = resPosition[i];
        const orientacao = res[0];
        const linhaInicial = res[1 + orientacao];
        const colunaInicial = res[2 - orientacao];
        const resposta = respostas[i];
        
        const changeCell = (linha, coluna) => {
            getCell(linha, coluna).classList.add('in');
        };

        console.log(i+1, linhaInicial, colunaInicial, resposta)

        arrowCell(orientacao, i, linhaInicial, colunaInicial)
        for (let block = 1; block <= resposta.length; block++) {
            if (orientacao == 0) {
                changeCell(linhaInicial, colunaInicial + block);
            } else {
                changeCell(linhaInicial + block, colunaInicial);
            }
        }
    }
}

function arrowCell(arrowDirection, numPes, linha, coluna){
    const arrowClass = ['⇒', '⇓']
    const cell = getCell(linha, coluna)
    cell.classList.add('arrow')
    cell.innerHTML = `${numPes+1}${arrowClass[arrowDirection]}`
}


function getCell(linha, coluna){
    return cruzadinha.childNodes[linha].childNodes[coluna]
}

function colocarNaCruzadinha(correto) {
    const pos = respostas.indexOf(correto);
    const res = resPosition[pos];

    const orientacao = res[0];
    const linhaInicial = res[1 + orientacao];
    const colunaInicial = res[2 - orientacao];

    const addCharCell = (linha, coluna, char) => {
        getCell(linha, coluna).innerHTML = char;
    };

    for (let block = 0; block < correto.length; block++) {
        if (orientacao === 0) {
            addCharCell(linhaInicial, colunaInicial + block+1, correto[block]);
        } else {
            addCharCell(linhaInicial + block+1, colunaInicial, correto[block]);
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

function secret(){
    for(let i = 0; i < respostas.length; i++){
        colocarNaCruzadinha(respostas[i])
    }
}


function iniciarJogo(){
    btn_jogar.style.display = 'none'
    div_instrucao.style.display = 'none'
    jogo.style.display = 'flex'
    mostrarCruzadinha(gerarCruzadinha(17,24))
    // remover
    secret()
}