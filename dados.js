/**************************************************************************************************
 * Objetivo: Enviar e recebet os dados da api, como tambem criar uma tabela para add os dados
 * Data: 30/05/23
 * Autor: Octavio Goncalves
 * Versão: 1.0
 ***************************************************************************************************/ 
//Variaveis globais

//recebe o id do botao enviar
const enviar = document.getElementById("enviar");
//recebe o id do botao enviar
const pesquisa = document.getElementById("pesquisa");

//funções

//Função que vai enviar os dados para a api/banco
const receberDados = function () {
    //variavel para o link
    let link = "";
    
    //Variaveis que recebem os dados do HTML
    let nome = document.getElementById("idnome").value.toUpperCase();
    let email = document.getElementById("idemail").value;
    let telefone = document.getElementById("idtelefone").value;
    let materia = document.getElementById("idmateria").value.toUpperCase();
    let aluno = document.getElementById("idaluno");
    let mentor = document.getElementById("idmentor");

    //Verifica se o aluno foi marcado
    if (aluno.checked) {
        link = "http://localhost:8080/unifecaf/aluno";
    }
    //se não vai pro do mentor
    else if (mentor.checked) {
        link = "http://localhost:8080/unifecaf/mentor";
    } else{
        //ainda se nenhum dos dois é marcado, solta um alert na tela
        alert("escolha uma opção!!")
    }


    //cria um JSON para ser enviado pelo body na URL
    let dados =
    {
        nome: nome,
        email: email,
        telefone: telefone,
        materia: materia
    };

    //configura os metodos de envio 
    let requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify(dados)
    };

    //Realiza o fetch
    fetch(link, requestOptions)
        .then(response => response.json())
        .then(data => {
            // recebe uma resposta do banco
            alert(data);
            
        });

    //Elimina os dados das variaveis
    document.getElementById("idnome").value = "";
    document.getElementById("idemail").value = "";
    document.getElementById("idtelefone").value = "";
    materia = document.getElementById("idmateria").value = "";
    aluno.prop('checked', false);
    mentor.prop('checked', false);
};

//função que carrega os dados da pesquisa na tela
const carregarDados = function () {
    //Link da api
    let link = "http://localhost:8080/unifecaf/mentor";

    //recebe o criterio para a pesquisa
    let materia = document.getElementById("materiapesquisa").value.toUpperCase();
    //Recebe o id do html
    let tabelaDados = document.getElementById('tabela');
    tabelaDados.innerText = ''
    //cria uma tabela
    let tabela = document.createElement('table');


    fetch(link)
    .then(response => response.json())
    .then(dados => {
        // recebe uma resposta do banco
        dados.Mentors.forEach(function(item){
            //verifica se o criterio de pesquisa existe no json de retorno
            if (item.materia.toUpperCase() == materia){
                //Cria um linha para a tabele
                let linha = document.createElement('tr');
                //Add uma classe para essa linha
                linha.setAttribute("class", "linha");
                
                //Cria as colunas para a linha
                let colunaNome = document.createElement('td');
                let colunaTelefone = document.createElement('td');
                
                //add as informações nas colunas
                let txtnome = document.createTextNode(item.nome);
                let txttel = document.createTextNode(item.telefone);
                
                //add as informações nas colunas
                colunaNome.appendChild(txtnome);
                colunaTelefone.appendChild(txttel);
                //add as colunas na linha
                linha.appendChild(colunaNome);
                linha.appendChild(colunaTelefone);
                //e por fim add a linha na tabela
                tabela.appendChild(linha);
            }
        })
    });

    //add a tabela na div 
    tabelaDados.appendChild(tabela);
    
};


const validacaoMascara = function(teclaDigitada){
    //Recebe a tecla digitada e converte para ascii  
    let ascii = teclaDigitada.charCode;

    //recebe o id da caixa telefone
    let tel = document.getElementById('idtelefone');
    
    //deixa o fundo da caixa tel branco
    tel.style.backgroundColor = 'white';
 
    //permite somente numeros (utiliza a tabela ascii)
    if((ascii < 48 || ascii > 57) && ascii != 13){
         //Coloca a cor vermelha no fundo da caixa para destacar o erro de digitação
         tel.style.backgroundColor = 'red';

         //Cancela a ação da tecla digitada
         teclaDigitada.preventDefault();
    
    }else{
         tel.style.backgroundColor = 'white';
    }
 }




//Cria eventos para os botões 
enviar.addEventListener('click', function () { receberDados(); });
pesquisa.addEventListener('click', function () { carregarDados(); });

telefone.addEventListener('keypress', function(tecla){ validacaoMascara(tecla); });