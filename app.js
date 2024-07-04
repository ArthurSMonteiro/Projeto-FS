/****************************************************************************************
 * Objetivo: Criar uma API para manipular o Banco de Dados
 * Data: 21/05/2023
 * Autor: Arthur Monteiro
 * Versão: 1.0
 * 
 * Para criar a API devemos instalar os seguintes pacotes
    * npm install express --save 
    * npm install cors --save 
    * npm install body-parser --save 
    
 * Para criar a conexão com o Banco de Dados devemos instalar os seguintes pacotes
    *npm install prisma --save  (Realiza a instalação do prisma ORM)
    *npx prisma      (Permite verificar se o prisma ORM foi instalado)
    *npx prisma init (Permite inicializar a utilização do prisma na API
                Ele cria uma pasta chamada prisma, um arquivo chamado
                env, um arquivo chamdo gitignore)
    *npm install @prisma/client --save (Instala o cliente para manipular os scriptsSQL)
 */



//Cria as dependencias da API
const express = require("express");
//Dependencia para criar as permissoes de manupulação da API
const cors = require("cors");
//Dependencia para receber os dados no body da requisisao
const bodyParser = require("body-parser");

//Instancia as funções da controller Aluno/Mentor
var controllerAluno = require('./controller/controllerAluno.js');
var controllerMentor = require('./controller/controllerMentor.js');
const bodyParserJson = bodyParser.json();

//Cria o Obj app de acordo com a classe express
const app = express();
app.use((request, response, next) => {
    response.header("Acess-Control-Allow-Origin", "*");

    response.header("Acess-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

    app.use(cors());

    next();
});


/**************[DADOS ALUNO]****************/

//POST (INSERIR NOVO ITEM)
app.post('/unifecaf/aluno/',bodyParserJson ,cors(), async function(request, response){
    //Recebe os dados encaminhados no corpo da requisição
    let dadosBody = request.body;

    let result = await controllerAluno.inserirAluno(dadosBody);

    response.status(result.statusCode);
    response.json(result.message);
});

//PUT (ATUALIZAR ITEM EXISTENTE)
app.put('/unifecaf/aluno/:id',bodyParserJson , cors(), async function(request, response){
    //Recebe os dados encaminhados no corpo da requisição
    let dadosBody = request.body;

    //Recebe o ID do aluno
    let idAluno = request.params.id;
    
    let result = await controllerAluno.atualizarAluno(dadosBody, idAluno);

    response.status(result.statusCode);
    response.json(result.message);
});

//DELETE (APAGAR UM ITEM EXISTENTE)
app.delete('/unifecaf/aluno/:id',bodyParserJson , cors(), async function(request, response){
     //Recebe o ID enviado via parametro na URL
     let idAluno = request.params.id;
    
     //Chama a controller para listar todos os alunos
     let result = await controllerAluno.excluirAluno(idAluno);
 
     //Retorna o statusCode
     response.status(result.statusCode);
     //Retorna o JSON completo com todos os itens
     response.json(result.message);
});

//GET (LISTAR TODOS OS ITENS)
app.get('/unifecaf/aluno', bodyParserJson ,cors(), async function(request, response){
    //Chama a controller para listar todos os alunos
    let result = await controllerAluno.listarTodosAlunos();

    //Retorna o statusCode
    response.status(result.statusCode);
    //Retorna o JSON completo com todos os itens
    response.json(result);
});

//GET (BUSCAR ITENS PELO ID)
app.get('/unifecaf/aluno/:id',bodyParserJson , cors(), async function(request, response){
    //Recebe o ID enviado via parametro na URL
    let idAluno = request.params.id;
    
    //Chama a controller para listar todos os alunos
    let result = await controllerAluno.buscarAluno(idAluno);

    //Retorna o statusCode
    response.status(result.statusCode);
    //Retorna o JSON completo com todos os itens
    response.json(result);
});


/**************[DADOS MENTOR]****************/

//POST (INSERIR NOVO ITEM)
app.post('/unifecaf/mentor',bodyParserJson , cors(), async function(request, response){
    let dadosBody = request.body;
    let result = await controllerMentor.inserirMentor(dadosBody);
    
    response.status(result.statusCode);
    response.json(result.message);
});

//PUT (ATUALIZAR ITEM EXISTENTE)
app.put('/unifecaf/mentor/:id',bodyParserJson , cors(), async function(request, response){
    //Recebe os dados encaminhados no corpo da requisição
    let dadosBody = request.body;

    //Recebe o ID do mentor
    let idMentor= request.params.id;
    
    let result = await controllerMentor.atualizarMentor(dadosBody, idMentor);

    response.status(result.statusCode);
    response.json(result.message);
});

//DELETE (APAGAR UM ITEM EXISTENTE)
app.delete('/unifecaf/mentor/:id',bodyParserJson , cors(), async function(request, response){
    let idMentor = request.params.id;
    
    //Chama a controller para listar todos os alunos
    let result = await controllerMentor.excluirMentor(idMentor);

    //Retorna o statusCode
    response.status(result.statusCode);
    //Retorna o JSON completo com todos os itens
    response.json(result.message);
});

//GET (LISTAR TODOS OS ITENS)
app.get('/unifecaf/mentor', bodyParserJson ,cors(), async function(request, response){
    //Chama a controller para listar todos os mentores
    let result = await controllerMentor.listarTodosMentors();

    //Retorna o statusCode
    response.status(result.statusCode);
    //Retorna o JSON completo com todos os itens
    response.json(result);
});

//GET (BUSCAR ITENS PELO ID)
app.get('/unifecaf/mentor/:id',bodyParserJson , cors(), async function(request, response){
    //Recebe o ID enviado via parametro na URL
    let idMentor = request.params.id;
    
    //Chama a controller para listar todos os alunos
    let result = await controllerMentor.buscarMentor(idMentor);

    //Retorna o statusCode
    response.status(result.statusCode);
    //Retorna o JSON completo com todos os itens
    response.json(result);
});



//Faz com que a API rode
app.listen(8080, function(){
    console.log('Servidor aguardando requisições na porta 8080.');
});
