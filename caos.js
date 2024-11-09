var respostas   = ['CPU', 'ULA', 'Registradores', 'RAM', 'ROM', 'EPROM', 'FLASH', 'Memória de Massa', 'DMA', 'CS', 'Address Bus', 'Data Bus', 'I5', 'I7', 'Dual Core', 'Quad Core'];
var resPosition = [[0,0,0]]

var questao = 0

// TO DO

// Criação da Matriz da cruzadinha
// Criação de css para os bloquinhos (.block e .block.in)
// Criação de um array de posição contendo [horizontal ou vertical (0 ou 1), pos, inicio] de cada resposta
// Transformar a Matriz em cruzadinha
// Função para verificar se na posição inicio e fim tem a reposta correta
// ???



function gerarCruzadinha(coluna, linha, ) {
    var matrix = []
    for (let i = 0; i < linha; i++){
        matrix[i] = []
        for(let c = 0; c < coluna; c++){
            matrix[i][c] = ""
        }
    }
    return matrix
}

function mostrarCruzadinha(matrix = [[]], resPos = [[]]){
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

function colocarEspacos(){
    for(let i = 0; i < resPosition.length; i++){
        const res = resPosition[i]
        if(res[0] = 0){
            [linha, coluna] = [res[1],res[2]]
        } else {
            [linha, coluna] = [res[2],res[1]]
        }

        for(let block = coluna; block <= respostas[i].length; block++){
            getCell(linha, block).classList.add('in')
        }
    }
}

function getCell(line, column){
    return cruzadinha.childNodes[line].childNodes[column]
}

function colocarNaCruzadinha ([orientacao, pos, inicio]){
    if(orientacao = 0){

    }
}

// c 23 l 13


function verificar(value){

}


function iniciarJogo(){
    mostrarCruzadinha(gerarCruzadinha(23,13))
}