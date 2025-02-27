module.exports = function(app){
  app.get('/pagamentos', function(req, res){
    console.log('Recebida requisicao de teste na porta 3000.')
    res.send('OK.');
  });

  app.delete('/pagamentos/pagamento/:id', function (req, res) {
    var pagamento = {}
    var id = req.params.id;

    pagamento.id = id;
    pagamento.status = 'CANCELADO';

    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamentoDao.atualiza(pagamento, function (erro) {
      if (erro) {
        res.status(500).send(erro);
        return;
      }
      res.status(204).send(pagamento);
    });
  });

  app.put('/pagamentos/pagamento/:id', function (req, res) {
    var pagamento = {};
    var id = req.params.id;

    pagamento.id = id;
    pagamento.status = 'CONFIRMADO';

    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamentoDao.atualiza(pagamento, function (erro) {
      if (erro) {
        res.status(500).send(erro);
        return;
      }  
      res.send(pagamento);
    });
  });

  app.post('/pagamentos/pagamento', function(req, res){

    req.assert("pagamento.forma_de_pagamento",
        "Forma de pagamento eh obrigatorio").notEmpty();
    req.assert("pagamento.valor",
      "Valor eh obrigatorio e deve ser um decimal")
        .notEmpty().isFloat();

    var erros = req.validationErrors();

    if (erros){
      console.log('Erros de validacao encontrados');
      res.status(400).send(erros);
      return;
    }

    var pagamento = req.body["pagamento"];
    console.log('processando uma requisicao de um novo pagamento');
    console.log(pagamento);
    pagamento.status = 'CRIADO';
    pagamento.data = new Date;

    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamentoDao.salva(pagamento, function(erro, resultado){
      if(erro){
        console.log('Erro ao inserir no banco:' + erro);
        res.status(500).send(erro);
      } else {
        pagamento.id = resultado.insertId;
        console.log('pagamento criado');
        res.location('/pagamentos/pagamento/' +
            pagamento.id);

      var response = {
        dados_do_pagamento: pagamento,
        links: [
          {
            href: "http://localhost:3000/pagamentos/pagamento/" + pagamento.id, 
            rel: "Confimar",
            method: "PUT"
          },
          {
            href: "http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
            rel: "Cancelar",
            method: "DELETE"
          }
        ]
      }

      res.status(201).json(response);
    }
    });

  });
}
