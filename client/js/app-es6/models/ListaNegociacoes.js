class ListaNegociacoes {
    constructor(){
        this._negociacoes = [];
    
    }

    adiciona(negociacao){
         this._negociacoes.push(negociacao);
        //this._armadilha(this);
        /* Reflect.apply(this._armadilha,this._contexto, [this]); lembrando que na função de lá, passa o this e no contructor tbm  
        trata para que na negociacao controller, o this seja da própria negociacao controller.  */
    }
    
    get negociacoes(){
        return [].concat(this._negociacoes);  // para não mudar a lista principal
    }

    esvazia(){
        this._negociacoes = [];
        //this._armadilha(this);
       // Reflect.apply(this._armadilha,this._contexto, [this]);
    }
}