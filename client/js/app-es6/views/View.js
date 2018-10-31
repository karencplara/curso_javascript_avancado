class View {

    constructor(elemento){
      this._elemento = elemento;
    }

    template(){  // foi removido o _ pq as classes filhas precisam sobrescrever.
        throw new Error('O metódo template deve ser implementado');
    }
    update(model){
        this._elemento.innerHTML = this.template(model);
    }
}