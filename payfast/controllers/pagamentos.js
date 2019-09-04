module.exports = function (app) {
    app.get('/pagamentos', function (req, res) {
        console.log('Recebido requisição de teste na porta 3000.');
        res.send('OK.');
    });

    app.post('/pagamentos/pagamento', function (req, res) {
        var pagamento = req.body; 
        console.log("Processando uma requisição de pagamento!");
        pagamento.status = 'CRIADO';
        pagamento.data = new Date;
        
        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.salva(pagamento, function (erro, resultado) {
            console.log('Pagamento criado!');
            res.json(pagamento);
       });
    
    });
}