'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// a arrow function tem o this léxico, ou seja, não precisa dar bind ou fazer o procedimento de Reflect.apply
var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        var $ = document.querySelector.bind(document); //bind para manter a associação com o document. O document é o this deste caso.
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

        this._ordemAtual = '';
        this._service = new NegociacaoService();
        this._init();
    }

    _createClass(NegociacaoController, [{
        key: '_init',
        value: function _init() {
            var _this = this;

            this._service.lista().then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    return _this._listaNegociacoes.adiciona(negociacao);
                });
            }).catch(function (erro) {
                console.log(erro);
                _this._mensagem.texto = error;
            });
            setInterval(function () {
                _this.importaNegociacoes();
            }, 3000);
        }
    }, {
        key: 'adiciona',
        value: function adiciona(event) {
            var _this2 = this;

            /*  let data = new Date(...  //spreed operator "primeiro elemento array, primeiro parametro do constructor/function"
                this._inputData.value
                .split('-')
                .map((item,indice) => item - indice % 2) //arrow function, não precisa escrever function, pois a seta já indica function 
              );  */

            event.preventDefault();

            var negociacao = this._criaNegociacao();

            this._service.cadastra(negociacao).then(function (mensagem) {
                _this2._listaNegociacoes.adiciona(negociacao);
                _this2._mensagem.texto = mensagem;
                _this2._limpaFormulario();
            }).catch(function (erro) {
                return _this2._mensagem.texto = erro;
            });
        }
    }, {
        key: 'importaNegociacoes',
        value: function importaNegociacoes() {
            var _this3 = this;

            this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    _this3._listaNegociacoes.adiciona(negociacao);
                    _this3._mensagem.texto = 'Negociações do período importadas';
                });
            }).catch(function (erro) {
                return _this3._mensagem.texto = erro;
            });
            /* service.obterNegociacoesDaSemana()
               .then(negociacoes => {
                    negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                    this._mensagem.texto = 'Negociaçlão da semana obtida com sucesso';
                })
                .catch(error => this._mensagem.texto = error);
            service.obterNegociacoesDaSemanaAnterior()
               .then(negociacoes => {
                    negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                    this._mensagem.texto = 'Negociaçlão da semana obtida com sucesso';
                })
                .catch(error => this._mensagem.texto = error);
            service.obterNegociacoesDaSemanaRetrasada()
                .then(negociacoes => {
                     negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                     this._mensagem.texto = 'Negociaçlão da semana obtida com sucesso';
                 })
                 .catch(error => this._mensagem.texto = error);
                   
             
            /* service.obterNegociacoesDaSemana((err,negociacoes) =>{
               if(err) {
                   this._mensagem.texto = err;
                   return;
               }
               negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
               service.obterNegociacoesDaSemanaAnterior((err, negociacoes) => {
                  if(err) {
                      this._mensagem.texto = err;
                      return;
                  }
            
                  negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                  service.obterNegociacoesDaSemanaRetrasada((err, negociacoes) => {
                      if(err) {
                          this._mensagem.texto = err;
                          return;
                      }
              
                      negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                      this._mensagem.texto = 'Negociações importadas com sucesso';
                 });       
              });       
            }); */
        }
    }, {
        key: 'apaga',
        value: function apaga() {
            var _this4 = this;

            this._service.apaga().then(function (mensagem) {
                _this4._mensagem.texto = mensagem;
                _this4._listaNegociacoes.esvazia();
            }).catch(function (erro) {
                return _this4._mensagem.texto = erro;
            });
        }
    }, {
        key: '_criaNegociacao',
        value: function _criaNegociacao() {
            return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        }
    }, {
        key: '_limpaFormulario',
        value: function _limpaFormulario() {
            this._inputData.value = '';
            this._inputQuantidade.value = 1;
            this._inputValor.value = 0.0;
            this._inputData.focus();
        }
    }]);

    return NegociacaoController;
}();