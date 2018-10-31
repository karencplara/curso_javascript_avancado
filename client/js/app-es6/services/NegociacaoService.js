class NegociacaoService {
    constructor(){
        this._http = new HttpService();
    }
    obterNegociacoesDaSemana(){
        return new Promise((resolve,reject)=>{
         this._http
            .get('negociacoes/semana')
            .then(negociacoes => {
               resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)));
            })
            .catch(error => {
              console.log(error);
              reject('Não foi possível obter as negociações da semana')
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
obterNegociacoesDaSemanaRetrasada(){
    return new Promise((resolve,reject)=>{
        this._http
            .get('negociacoes/retrasada')
            .then(negociacoes => {
            resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)));
            })
            .catch(error => {
                console.log(error);
                reject('Não foi possível obter as negociações da semana')
        });
    });
}
    obterNegociacoesDaSemanaAnterior(){
        return new Promise((resolve,reject)=>{
            this._http
                .get('negociacoes/anterior')
                .then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)));
                })
                .catch(error => {
                    console.log(error);
                    reject('Não foi possível obter as negociações da semana')
            });
        });
    }
    obterNegociacoes() {
        
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), [])
                .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor ));

            return negociacoes;
        }).catch(erro => {
            throw new Error(erro);
        });
    } 
    cadastra(negociacao){
       return ConnectionFactory  // return para permitir quem chamar o cadastra usar o then.
        .getConnection()
        .then(connection => new NegociacaoDao(connection)) 
        .then(dao => dao.adiciona(negociacao))
        .then(() => 'Negociação adicionada com sucesso')
        .catch(erro => {
            console.log(erro);
             throw new Error('Não foi possível adicionar a negociação')
        });
    }
    lista(){
        return ConnectionFactory  // return para permitir quem chamar o cadastra usar o then.
        .getConnection()
        .then(connection => new NegociacaoDao(connection)) 
        .then(dao => dao.listaTodos())
        .catch(erro => {
            console.log(erro);
            throw new Error ('Não foi possível obter as negociações')
        });
    }
    apaga() {

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(() => 'Negociações apagadas com sucesso')
            .catch(erro => {
                  console.log(erro);
                  throw new Error('Não foi possível apagar as negociações')
            });
    }
    importa(listaAtual) {

        return this.obterNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    !listaAtual.some(negociacaoExistente =>
                        JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
            )
            .catch(erro => {
                console.log(erro);
                throw new Error("Não foi possível importar as negociações");
            });
    }
}