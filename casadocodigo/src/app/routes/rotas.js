const LivroController = require('../controller/livro-controller');
const livroController = new LivroController();

const BaseController = require('../controller/base-controlador');
const baseController = new BaseController();

const { check } = require('express-validator/check');

module.exports = (app) => {
    const rotasBase = BaseController.rotas();
    const rotasLivro = LivroController.rotas();

    app.get(rotasBase.home, baseController.home());
    app.get(rotasLivro.lista, livroController.lista());
    app.get(rotasLivro.cadastro, livroController.formularioCadastro());
    app.get(rotasLivro.edicao, livroController.formularioEdicao())
    app.post(rotasLivro.lista, [
        check('titulo').isLength({ min: 5 }).withMessage('O título precisa de no mínimo 5 caracteres!'),
        check('preco').isCurrency().withMessage('O preço precisa ter um valor monetário válido!')
    ], livroController.cadastra());
    app.put(rotasLivro.lista, livroController.edita());
    app.delete(rotasLivro.delecao, livroController.remove());
}
