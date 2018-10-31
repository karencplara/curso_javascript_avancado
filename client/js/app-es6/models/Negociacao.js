class Negociacao {
  constructor(data,quantidade,valor){
      this._data = new Date(data.getTime()); // garantir a imutabilidade.
      this._quantidade = quantidade;
      this._valor = valor;
      Object.freeze(this);  //congela os objetos para que não possam ser alteradas, porém data não entra neste caso pois tem outras props.
  } 

  get data(){
    return new Date(this._data.getTime());
  }
  get quantidade(){
    return this._quantidade;
  }
  get valor(){
    return this._valor;
  }
  get volume(){
     return this._quantidade * this._valor;
  }
}