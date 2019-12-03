var restify = require('restify-clients');

var cliente = restify.createJsonClient({
    url: 'http://localhost:3001',
    version: '~1.0'
});

cliente.post('/cartoes/autoriza', function (erro, req, res, retorno) {
    console.log('Consumindo servico de cartoes');
    console.log(retorno);
})