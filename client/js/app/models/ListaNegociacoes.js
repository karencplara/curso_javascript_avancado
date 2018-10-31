"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ListaNegociacoes = function () {
    function ListaNegociacoes() {
        _classCallCheck(this, ListaNegociacoes);

        this._negociacoes = [];
    }

    _createClass(ListaNegociacoes, [{
        key: "adiciona",
        value: function adiciona(negociacao) {
            this._negociacoes.push(negociacao);
            //this._armadilha(this);
            /* Reflect.apply(this._armadilha,this._contexto, [this]); lembrando que na função de lá, passa o this e no contructor tbm  
            trata para que na negociacao controller, o this seja da própria negociacao controller.  */
        }
    }, {
        key: "esvazia",
        value: function esvazia() {
            this._negociacoes = [];
            //this._armadilha(this);
            // Reflect.apply(this._armadilha,this._contexto, [this]);
        }
    }, {
        key: "negociacoes",
        get: function get() {
            return [].concat(this._negociacoes); // para não mudar a lista principal
        }
    }]);

    return ListaNegociacoes;
}();