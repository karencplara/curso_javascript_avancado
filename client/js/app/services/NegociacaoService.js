'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
    function NegociacaoService() {
        _classCallCheck(this, NegociacaoService);

        this._http = new HttpService();
    }

    _createClass(NegociacaoService, [{
        key: 'obterNegociacoesDaSemana',
        value: function obterNegociacoesDaSemana() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this._http.get('negociacoes/semana').then(function (negociacoes) {
                    resolve(negociacoes.map(function (objeto) {
                        return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                    }));
                }).catch(function (error) {
                    console.log(error);
                    reject('Não foi possível obter as negociações da semana');
                });

                /* let xhr = new XMLHttpRequest();
                 xhr.open('GET','negociacoes/semana');
                 xhr.send();
                       /*config*/
                /*xhr.onreadystatechange = () => {
                   if(xhr.readyState == 4){  //requisição concluída e a resposta está pronta.
                       if(xhr.status == 200){
                            resolve(JSON.parse(xhr.responseText)
                              .map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)));
                             
                       }else{
                            console.log(xhr.responseText);
                            reject('não foi possível obter as negociações');  // callback se passar null.
                           
                       }
                   }
                };
                xhr.send(); */
            });
        }
    }, {
        key: 'obterNegociacoesDaSemanaRetrasada',
        value: function obterNegociacoesDaSemanaRetrasada() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2._http.get('negociacoes/retrasada').then(function (negociacoes) {
                    resolve(negociacoes.map(function (objeto) {
                        return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                    }));
                }).catch(function (error) {
                    console.log(error);
                    reject('Não foi possível obter as negociações da semana');
                });
            });
        }
    }, {
        key: 'obterNegociacoesDaSemanaAnterior',
        value: function obterNegociacoesDaSemanaAnterior() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                _this3._http.get('negociacoes/anterior').then(function (negociacoes) {
                    resolve(negociacoes.map(function (objeto) {
                        return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                    }));
                }).catch(function (error) {
                    console.log(error);
                    reject('Não foi possível obter as negociações da semana');
                });
            });
        }
    }, {
        key: 'obterNegociacoes',
        value: function obterNegociacoes() {

            return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(function (periodos) {

                var negociacoes = periodos.reduce(function (dados, periodo) {
                    return dados.concat(periodo);
                }, []).map(function (dado) {
                    return new Negociacao(new Date(dado.data), dado.quantidade, dado.valor);
                });

                return negociacoes;
            }).catch(function (erro) {
                throw new Error(erro);
            });
        }
    }, {
        key: 'cadastra',
        value: function cadastra(negociacao) {
            return ConnectionFactory // return para permitir quem chamar o cadastra usar o then.
            .getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.adiciona(negociacao);
            }).then(function () {
                return 'Negociação adicionada com sucesso';
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível adicionar a negociação');
            });
        }
    }, {
        key: 'lista',
        value: function lista() {
            return ConnectionFactory // return para permitir quem chamar o cadastra usar o then.
            .getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.listaTodos();
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações');
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {

            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.apagaTodos();
            }).then(function () {
                return 'Negociações apagadas com sucesso';
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível apagar as negociações');
            });
        }
    }, {
        key: 'importa',
        value: function importa(listaAtual) {

            return this.obterNegociacoes().then(function (negociacoes) {
                return negociacoes.filter(function (negociacao) {
                    return !listaAtual.some(function (negociacaoExistente) {
                        return JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente);
                    });
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error("Não foi possível importar as negociações");
            });
        }
    }]);

    return NegociacaoService;
}();