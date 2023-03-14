const opAnteriorText = document.querySelector("#op-anterior");
const opAtualText = document.querySelector("#op-atual");
const buttons = document.querySelectorAll("#btn-container button");

class Calculadora {

    constructor (opAnteriorText,opAtualText) {
        this.opAnteriorText = opAnteriorText;
        this.opAtualText = opAtualText;
        this.opAtual = "";
    }

    adicionarDigito(digito){
        if(digito==="." && this.opAtualText.innerText.includes(".")){
            return;
        }

        this.opAtual = digito;
        this.atualizar();
    }


    executarOperacao(operacao){
        if(this.opAtualText.innerText === "" && operacao !== "C"){
            if(this.opAnteriorText.innerText !==""){
                this.mudarOperacao(operacao);
            }
            return;
        }

        let valorOperacao;
        let anterior = +this.opAnteriorText.innerText.split(" ")[0];
        let atual = +this.opAtualText.innerText;


        switch(operacao){

            case "+":
                valorOperacao = anterior + atual;
                this.atualizar(valorOperacao,operacao,atual,anterior)
                break;
            case "-":
                valorOperacao = anterior - atual;
                this.atualizar(valorOperacao,operacao,atual,anterior)
                break;
            case "*":
                valorOperacao = anterior * atual;
                this.atualizar(valorOperacao,operacao,atual,anterior)
                break;
            case "/":
                valorOperacao = anterior / atual;
                this.atualizar(valorOperacao,operacao,atual,anterior)
                break;
            case "DEL":
                this.executarOperacaoDeletar()
                break;
            case "CE":
                this.executarLimparOperadorAtual()
                break;                
            case "C":
                this.executarOperadorLimpar()
                break;
            case "=":
                this.executarOperadorIgual()
                break;
            default:
                return;
        }
    }

    atualizar(
        valorOperacao = null,
        operacao = null,
        atual = null,
        anterior = null
    ){
        if(valorOperacao === null) {
            this.opAtualText.innerText += this.opAtual
        } else {
            if(anterior === 0){
                valorOperacao = atual;
            }
            this.opAnteriorText.innerText = `${valorOperacao} ${operacao}`
            this.opAtualText.innerText = "";
        }
    }
    
    mudarOperacao(operacao) {
        const opMath = ["*","-","+","/"];

        if(!opMath.includes(operacao)){
            return;
        }

        this.opAnteriorText.innerText = this.opAnteriorText.innerText.slice(0,-1) + operacao;

    }
  
    executarOperacaoDeletar() {
        this.opAtualText.innerText = this.opAtualText.innerText.slice(0,-1);
    }

    executarLimparOperadorAtual() {
        this.opAtualText.innerText = "";
    }

    executarOperadorLimpar() {
        this.opAtualText.innerText = "";
        this.opAnteriorText.innerText = "";
    }

    executarOperadorIgual() {
        let operacao = this.opAnteriorText.innerText.split(" ")[1];

        this.executarOperacao(operacao);
    }
}


const calc = new Calculadora(opAnteriorText, opAtualText);

buttons.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        const valor = e.target.innerText;

        if (+valor >=0 || valor === "."){
            calc.adicionarDigito(valor);
        }else {
            calc.executarOperacao(valor);
        }
    });
});