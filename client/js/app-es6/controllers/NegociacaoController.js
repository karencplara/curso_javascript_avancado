// a arrow function tem o this léxico, ou seja, não precisa dar bind ou fazer o procedimento de Reflect.apply
class NegociacaoController {
    constructor(){

        let $ = document.querySelector.bind(document);  //bind para manter a associação com o document. O document é o this deste caso.
        this._inputData =  $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), 
            new NegociacoesView($('#negociacoesView')), 
            'adiciona', 'esvazia');
       
        this._mensagem = new Bind(
            new Mensagem(), new MensagemView($('#mensagemView')),
            'texto');       
        
        this._ordemAtual = '';
        this._service = new NegociacaoService();
        this._init();
    
    }
    _init(){
        this._service
            .lista()
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => {
                console.log(erro);
                this._mensagem.texto = error;
            });
            setInterval(() =>{
            this.importaNegociacoes();
            }, 3000);
    }
    adiciona(event){
      
     
    /*  let data = new Date(...  //spreed operator "primeiro elemento array, primeiro parametro do constructor/function"
        this._inputData.value
        .split('-')
        .map((item,indice) => item - indice % 2) //arrow function, não precisa escrever function, pois a seta já indica function 
      );  */
    
      event.preventDefault();
      
      let negociacao = this._criaNegociacao();

      this._service
          .cadastra(negociacao)
          .then((mensagem) => {
            this._listaNegociacoes.adiciona(negociacao);
            this._mensagem.texto = mensagem;
            this._limpaFormulario();
          })
          .catch(erro => this._mensagem.texto = erro);

      

  }
  importaNegociacoes(){
    this._service
    .importa(this._listaNegociacoes.negociacoes)
    .then(negociacoes => negociacoes.forEach(negociacao => {
        this._listaNegociacoes.adiciona(negociacao);
        this._mensagem.texto = 'Negociações do período importadas'
      }))
    .catch(erro => this._mensagem.texto = erro);                 
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
    apaga(){
        this._service
            .apaga()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            })
            .catch(erro => this._mensagem.texto = erro);
       
    }
    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value));
    }
    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
}